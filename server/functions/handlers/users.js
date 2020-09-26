const { db, admin } = require("../util/admin");

const config = require("../util/config");

const firebase = require("firebase");
firebase.initializeApp(config);

const {
    validateSignupData,
    validateLoginData,
    reduceUserDetails,
} = require("../util/validation");

const Busboy = require("busboy");
const path = require("path");
const os = require("os");
const fs = require("fs");

// Sign users up
exports.signup = (req, res) => {
    const newUser = {
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        name: req.body.name,
    };

    const { valid, errors } = validateSignupData(newUser);

    if (!valid) return res.status(400).json(errors);

    const noImg = "no-img.png";

    let token, userId;
    db.doc(`/users/${newUser.name}`)
        .get()
        .then((doc) => {
            if (doc.exists) {
                return res.status(400).json({
                    name: "this name is already taken",
                });
            } else {
                return firebase
                    .auth()
                    .createUserWithEmailAndPassword(
                        newUser.email,
                        newUser.password
                    );
            }
        })
        .then((data) => {
            userId = data.user.uid;
            return data.user.getIdToken();
        })
        .then((idToken) => {
            token = idToken;
            const userCredentials = {
                name: newUser.name,
                email: newUser.email,
                createdAt: new Date().toISOString(),
                imageUrl: `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${noImg}?alt=media`,
                userId,
            };
            return db.doc(`/users/${newUser.name}`).set(userCredentials);
        })
        .then(() => {
            return res.status(201).json({
                token,
            });
        })
        .catch((err) => {
            console.error(err);
            if (err.code === "auth/email-already-in-use") {
                return res.status(400).json({
                    email: "email is already in use",
                });
            } else {
                return res.status(500).json({
                    general: "something went wrong, please try again",
                });
            }
        });
};

// Log user in
exports.login = (req, res) => {
    const user = {
        email: req.body.email,
        password: req.body.password,
    };

    const { valid, errors } = validateLoginData(user);

    if (!valid) return res.status(400).json(errors);

    firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then((data) => {
            return data.user.getIdToken();
        })
        .then((token) => {
            return res.json({ token });
        })
        .catch((err) => {
            console.error(err);
            return res
                .status(403)
                .json({ general: "wrong credentials, please try again" });
        });
};
// Add user details
exports.addUserDetails = (req, res) => {
    let userDetails = reduceUserDetails(req.body);

    db.doc(`/users/${req.user.name}`)
        .update(userDetails)
        .then(() => {
            return res.json({
                message: "details added successfully",
            });
        })
        .catch((err) => {
            console.error(err);
            return res.status(500).json({
                error: err.code,
            });
        });
};

// Get any user's details
exports.getUserDetails = (req, res) => {
    let userData = {};
    db.doc(`/users/${req.params.name}`)
        .get()
        .then((doc) => {
            if (doc.exists) {
                userData.user = doc.data();
                return db
                    .collection("screams")
                    .where("userName", "==", req.params.name)
                    .orderBy("createdAt", "desc")
                    .get();
            } else {
                return res.status(404).json({ errror: "user not found" });
            }
        })
        .then((data) => {
            userData.screams = [];
            data.forEach((doc) => {
                userData.screams.push({
                    body: doc.data().body,
                    createdAt: doc.data().createdAt,
                    userName: doc.data().userName,
                    userImage: doc.data().userImage,
                    likeCount: doc.data().likeCount,
                    commentCount: doc.data().commentCount,
                    screamId: doc.id,
                });
            });
            return res.json(userData);
        })
        .catch((err) => {
            console.error(err);
            return res.status(500).json({ error: err.code });
        });
};

// Get own user details
exports.getAuthenticatedUser = (req, res) => {
    let userData = {};
    db.doc(`/users/${req.user.name}`)
        .get()
        .then((doc) => {
            if (doc.exists) {
                userData.credentials = doc.data();
                return db
                    .collection("likes")
                    .where("userName", "==", req.user.name)
                    .get();
            }
        })
        .then((data) => {
            userData.likes = [];
            data.forEach((doc) => {
                userData.likes.push(doc.data());
            });
            return db
                .collection("notifications")
                .where("recipient", "==", req.user.name)
                .orderBy("createdAt", "desc")
                .limit(10)
                .get();
        })
        .then((data) => {
            userData.notifications = [];
            data.forEach((doc) => {
                userData.notifications.push({
                    recipient: doc.data().recipient,
                    sender: doc.data().sender,
                    createdAt: doc.data().createdAt,
                    screamId: doc.data().screamId,
                    type: doc.data().type,
                    read: doc.data().read,
                    notificationId: doc.id,
                });
            });
            return res.json(userData);
        })
        .catch((err) => {
            console.error(err);
            return res.status(500).json({
                error: err.code,
            });
        });
};

// Upload a profile image for user
exports.uploadImage = (req, res) => {
    const busboy = new Busboy({ headers: req.headers });

    let imageFileName;
    let imageToBeUploaded = {};

    busboy.on("file", (fieldname, file, filename, encoding, mimtype) => {
        if (mimtype !== "image/jpeg" && mimtype !== "image/png") {
            return res.status(400).json({
                error: "wrong file type submitted",
            });
        }
        const imageExtension = filename.split(".")[
            filename.split(".").length - 1
        ];
        imageFileName = `${Math.round(
            Math.random() * 100000000000
        )}.${imageExtension}`;
        const filepath = path.join(os.tmpdir(), imageFileName);
        imageToBeUploaded = { filepath, mimtype };
        file.pipe(fs.createWriteStream(filepath));
    });

    busboy.on("finish", () => {
        admin
            .storage()
            .bucket()
            .upload(imageToBeUploaded.filepath, {
                resumable: false,
                metadata: {
                    metadata: {
                        contentType: imageToBeUploaded.mimtype,
                    },
                },
            })
            .then(() => {
                const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media`;
                return db.doc(`/users/${req.user.name}`).update({
                    imageUrl,
                });
            })
            .then(() => {
                return res.json({
                    message: "image uploaded successfully",
                });
            })
            .catch((err) => {
                console.error(err);
                return res.status(500).json({
                    error: err.code,
                });
            });
    });

    busboy.end(req.rawBody);
};

exports.markNotificationsRead = (req, res) => {
    let batch = db.batch();
    req.body.forEach((notificationId) => {
        const notification = db.doc(`/notifications/${notificationId}`);
        batch.update(notification, { read: true });
    });
    batch
        .commit()
        .then(() => {
            return res.json({ message: "notifications marked read" });
        })
        .catch((err) => {
            console.error(err);
            return res.status(500).json({ error: err.code });
        });
};
