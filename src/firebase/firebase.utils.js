import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyBq_-zFlfgNGVx-aq0qeGBGy1OTCroFx-Q",
  authDomain: "krithi-db.firebaseapp.com",
  databaseURL: "https://krithi-db.firebaseio.com",
  projectId: "krithi-db",
  storageBucket: "krithi-db.appspot.com",
  messagingSenderId: "409660821819",
  appId: "1:409660821819:web:ddaa9ea2ebeed4f926a71e",
  measurementId: "G-PYQDH6VPM9"
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