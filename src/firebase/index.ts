import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore, collection } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY as string,
  authDomain: 'quick-polls-2f66e.firebaseapp.com',
  projectId: 'quick-polls-2f66e',
  storageBucket: 'quick-polls-2f66e.appspot.com',
  messagingSenderId: '451846600628',
  appId: import.meta.env.VITE_FIREBASE_APP_ID as string,
  measurementId: 'G-TN3VKQWN4C',
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);

export const pollsRef = collection(db, 'polls');
