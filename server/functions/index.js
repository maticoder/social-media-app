const functions = require("firebase-functions");
const app = require("express")();
const auth = require("./util/auth");
const { db } = require("./util/admin");

const cors = require("cors");
// app.use(cors());

var allowedOrigins = [
    "http://localhost:3000",
    "https://social-media-maticoder.netlify.app",
];

app.use(
    cors({
        origin: function (origin, callback) {
            // allow requests with no origin
            // (like mobile apps or curl requests)
            if (!origin) return callback(null, true);
            if (allowedOrigins.indexOf(origin) === -1) {
                var msg =
                    "The CORS policy for this site does not " +
                    "allow access from the specified Origin.";
                return callback(new Error(msg), false);
            }
            return callback(null, true);
        },
    })
);

const {
    getAllScreams,
    postOneScream,
    getScream,
    commentOnScream,
    likeScream,
    unlikeScream,
    deleteScream,
} = require("./handlers/screams");
const {
    signup,
    login,
    uploadImage,
    addUserDetails,
    getAuthenticatedUser,
    getUserDetails,
    markNotificationsRead,
} = require("./handlers/users");

// Scream routes
app.get("/screams", getAllScreams);
app.post("/scream", auth, postOneScream);
app.get("/scream/:screamId", getScream);
app.delete("/screams/:screamId", auth, deleteScream);
app.get("/scream/:screamId/like", auth, likeScream);
app.get("/scream/:screamId/unlike", auth, unlikeScream);
app.post("/scream/:screamId/comment", auth, commentOnScream);

// Users routes
app.post("/signup", signup);
app.post("/login", login);
app.post("/image", auth, uploadImage);
app.post("/user", auth, addUserDetails);
app.get("/user", auth, getAuthenticatedUser);
app.get("/user/:name", getUserDetails);
app.post("/notifications", auth, markNotificationsRead);

exports.api = functions.region("europe-west2").https.onRequest(app);

exports.createNotificationOnLike = functions
    .region("europe-west2")
    .firestore.document("likes/{id}")
    .onCreate((snapshot) => {
        return db
            .doc(`/screams/${snapshot.data().screamId}`)
            .get()
            .then((doc) => {
                if (
                    doc.exists &&
                    doc.data().userName !== snapshot.data().userName
                ) {
                    return db.doc(`/notifications/${snapshot.id}`).set({
                        createdAt: new Date().toISOString(),
                        recipient: doc.data().userName,
                        sender: snapshot.data().userName,
                        type: "like",
                        read: false,
                        screamId: doc.id,
                    });
                }
            })
            .catch((err) => console.error(err));
    });

exports.deleteNotificationOnUnLike = functions
    .region("europe-west2")
    .firestore.document("likes/{id}")
    .onDelete((snapshot) => {
        return db
            .doc(`/notifications/${snapshot.id}`)
            .delete()
            .catch((err) => {
                console.error(err);
                return;
            });
    });

exports.createNotificationOnComment = functions
    .region("europe-west2")
    .firestore.document("comments/{id}")
    .onCreate((snapshot) => {
        return db
            .doc(`/screams/${snapshot.data().screamId}`)
            .get()
            .then((doc) => {
                if (
                    doc.exists &&
                    doc.data().userName !== snapshot.data().userName
                ) {
                    return db.doc(`/notifications/${snapshot.id}`).set({
                        createdAt: new Date().toISOString(),
                        recipient: doc.data().userName,
                        sender: snapshot.data().userName,
                        type: "comment",
                        read: false,
                        screamId: doc.id,
                    });
                }
            })

            .catch((err) => {
                console.error(err);
                return;
            });
    });

exports.onUserImageChange = functions
    .region("europe-west2")
    .firestore.document("/users/{userId}")
    .onUpdate((change) => {
        if (change.before.data().imageUrl !== change.after.data().imageUrl) {
            const batch = db.batch();
            return db
                .collection("screams")
                .where("userName", "==", change.before.data().name)
                .get()
                .then((data) => {
                    data.forEach((doc) => {
                        const scream = db.doc(`/screams/${doc.id}`);
                        batch.update(scream, {
                            userImage: change.after.data().imageUrl,
                        });
                    });
                    return batch.commit();
                });
        } else {
            return true;
        }
    });

exports.onScreamDelete = functions
    .region("europe-west2")
    .firestore.document("/screams/{screamId}")
    .onDelete((snapshot, context) => {
        const screamId = context.params.screamId;
        const batch = db.batch();
        return db
            .collection("comments")
            .where("screamId", "==", screamId)
            .get()
            .then((data) => {
                data.forEach((doc) => {
                    batch.delete(db.doc(`/comments/${doc.id}`));
                });
                return db
                    .collection("likes")
                    .where("screamId", "==", screamId)
                    .get();
            })
            .then((data) => {
                data.forEach((doc) => {
                    batch.delete(db.doc(`/likes/${doc.id}`));
                });
                return db
                    .collection("notifications")
                    .where("screamId", "==", screamId)
                    .get();
            })
            .then((data) => {
                data.forEach((doc) => {
                    batch.delete(db.doc(`/notifications/${doc.id}`));
                });
                return batch.commit();
            })
            .catch((err) => {
                console.error(err);
            });
    });
