import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyBj73tizTyPMT5v3EFvFX7bzYxhh-kh6Qk",
    authDomain: "fish-list.firebaseapp.com",
    databaseURL: "https://fish-list.firebaseio.com",
    projectId: "fish-list",
    storageBucket: "fish-list.appspot.com",
    messagingSenderId: "370988561158",
    appId: "1:370988561158:web:06f9a459730608a6e5a487",
    measurementId: "G-99KERPRMX7"
};

const config = firebase.initializeApp(firebaseConfig)

export default config