import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { FacebookAuthProvider, GoogleAuthProvider, getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDf8CJChrd4C6E4FxXbwfBnhPV3vpl-6ng',
  authDomain: 'fir-class-practice-bf05f.firebaseapp.com',
  projectId: 'fir-class-practice-bf05f',
  storageBucket: 'fir-class-practice-bf05f.appspot.com',
  messagingSenderId: '348002813973',
  appId: '1:348002813973:web:34f547c0663ad5793a661c'
};

export const firebaseApp = initializeApp(firebaseConfig);

/**
 * Firebase File Storage
 */
export const storage = getStorage(firebaseApp);

/**
 * Firebase Authentication
 */
export const auth = getAuth(firebaseApp);

/**
 * Google and Facebook Authentication
 */
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
