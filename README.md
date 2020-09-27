# Social Media App

This is a Social Media Application, I would even say that this is a Twitter clone. So you can create your own account providing your display name, email and password. Then after you log in using your email and password, you are able to add new posts, which are here called `screams`. You can see other people's screams, like them or comment.

You may also update your own profile, provide you own favourite image and some deatails about yourself. There is also a notifications system, so whenever somebody comment or like post you've created before, you will immediately see the notification, by clicking this notification you are able to see more details, about post.

You can also discover other user's profiles, so just simply click the user you are interested in, and it'll show you all the posts, that were posted by this user. You might also expand particular posts and see comments.

## Live Demo

You may also check the live demo of this application, simply click this link
[link to application!](https://social-media-maticoder.netlify.app/)

You can create your own account using your email and password, but if you want, you can also use the user, made specially for this purpose, so you can easier see how the application looks like, just go to login section and fill in the form using this data

```
email: user@email.com
password: 123456
```

Try to create your own posts and update your profile, feel free to check other functionalities of this application.

## Stack

```
React
Firebase
Express
Redux
Firestore
React Router
Firebase functions
Firebase triggers
Material UI
Firebase storage
Busboy
JWT
Moment.js
```

The front end of this application was made using `React`, the user data on the client side is stored using `Redux`. The user may be authenticated using json web tokens stored as Redux state. The Redux state contains also user's data, scream's data, ui's data as well as informations about errors and loadings, so it's much easier to maintain. The application ui was made using `Material UI`. Dates are displayed using `Moment.js`.

The back end of this application was made using ExpressJS with the `Firebase functions`. The whole application's data is stored in the firebase `Cloud Firestore`, the user may be authenticated using `JWT` tokens sent with the `Authentication` header. There is only email and password authentication available, but in the future I'm going to add more authentication methods. The user's images are stored in `Firebase storage` and proceeded by the server using `Busboy`. The notifications are provided using `Firebase triggers` so whenever the otehr user comment or like your post, you will be immediately informed.

## Implemented functionalities

This application is a clone of Twitter, so you can add your own posts, here called as `screams`

![](https://github.com/maticoder/social-media-app/blob/master/images/post.gif)

You may also comment and like other's people `screams`

![](https://github.com/maticoder/social-media-app/blob/master/images/likeandcomment.gif)

Whenever somebody comment or like your post, you will be immediately informed about that, clicking the notification bell and next particular notification, you will be redirected to the page with the liked or commented post

![](https://github.com/maticoder/social-media-app/blob/master/images/notifications.gif)

You are also able to update you profile image and details about yourself, all the changes are immediately visible

![](https://github.com/maticoder/social-media-app/blob/master/images/profile.gif)

There is also a client and server side validation, so whenever you provide invalid data, you will be informed about that

<!-- ![](https://github.com/maticoder/social-media-app/blob/master/images/login.gif) ![](https://github.com/maticoder/social-media-app/blob/master/images/signup.gif) -->

|                                      Login                                      |                                     Sign up                                      |
| :-----------------------------------------------------------------------------: | :------------------------------------------------------------------------------: |
| ![](https://github.com/maticoder/social-media-app/blob/master/images/login.gif) | ![](https://github.com/maticoder/social-media-app/blob/master/images/signup.gif) |

The whole project is connected to the firebase cloud, so the changes are immediately visible in the databse, you can see this on the gif below

![](https://github.com/maticoder/social-media-app/blob/master/images/immediately.gif)

## How to start using this app?

To start using this application you have to clone or download this repository using

```
git clone https://github.com/maticoder/social-media-app.git
```

command

next you have to install all required node modules in the client and server directories using

```
cd client
npm install
cd server
npm install
```

you also have to set your own firebase application up in order to use this application. You have to enable authentication with email/password sign-in method, cloud firestore to save data in the databsem, firebase storage to store user's images and firebase functions to invoke backend code. Provide your own `serviceAccountKey.json` file in the `server/functions` directory, this file should look like this

```
{
  "type": "",
  "project_id": "",
  "private_key_id": "",
  "private_key": "",
  "client_email": "",
  "client_id": "",
  "auth_uri": "",
  "token_uri": "",
  "auth_provider_x509_cert_url": "",
  "client_x509_cert_url": "",
}
```

also you will need to provide your own firebase config `config.js` file in the `server/functions/util` directory, this file should look like this

```
module.exports = {
    databaseURL: "",
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: "",
};
```

in order to run your application. You also have to create `config.js` file in `src` directory, put there your firebase config. Next you need to deploy firebase functions, using. There is no need to provide any firebase files in the `client` directory, everything is controlled using `JWT tokens` and `Redux`. Next you will need to deploy your firebase functions using

```
firebase deploy
```

in `functions` directory, make sure that you have `firebase-tools` installed, using following command

```
npm install -g firebase-tools
```

now you need to change `url` links, they shoul fetch data from your own firebase `endpoints`, not main, so make sure that you changed all `links` on the client side of the application. Now you just have to run application using

```
npm start
```

in the `client` directory. Once again, remember to make sure that you have got your own firebase project. As I mentioned before, you have to change `config.js` file with your firebase config data and `serviceAccountKey.json` with your key to make this application work properly. You have to also change url to fetch data from firebase to your own url.

## Landing page

The application was designed using `Figma`

![](https://github.com/maticoder/social-media-app/blob/master/images/page.png)
