import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

import firebaseCredentials from './config';

export const firebaseApp = initializeApp(firebaseCredentials);

export const database = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);

// ? firestore collections
export * from './collections/index';

// ? firestore functions
export * from './firestore';
export { default as createSimpleTransaction } from './transaction';

// ? authentication functions
export * from './authentication';
