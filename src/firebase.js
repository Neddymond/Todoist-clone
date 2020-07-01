import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = firebase.initializeApp({
    apiKey: "AIzaSyBqHQ3bjf7stFnxBxFWCctxipgcgirlKnk",
    authDomain: "todoist-clone-3ca29.firebaseapp.com",
    databaseURL: "https://todoist-clone-3ca29.firebaseio.com",
    projectId: "todoist-clone-3ca29",
    storageBucket: "todoist-clone-3ca29.appspot.com",
    messagingSenderId: "474977393431",
    appId: "1:474977393431:web:95c20fccb7419d20837552"
});

export { firebaseConfig as firebase }