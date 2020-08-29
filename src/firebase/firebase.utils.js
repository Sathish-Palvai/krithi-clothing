import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyB-C2CZKdNAjP062XGXvBrJHquzpuyLqCM",
  authDomain: "krithi-db-3c20a.firebaseapp.com",
  databaseURL: "https://krithi-db-3c20a.firebaseio.com",
  projectId: "krithi-db-3c20a",
  storageBucket: "krithi-db-3c20a.appspot.com",
  messagingSenderId: "479586875530",
  appId: "1:479586875530:web:7e1316a5619df89f359573"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;