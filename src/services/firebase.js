// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

import {
	GoogleAuthProvider,
	getAuth,
	signInWithPopup,
	signOut,
} from 'firebase/auth';
import {
	getFirestore,
	query,
	getDocs,
	collection,
	where,
	addDoc,
	doc,
	updateDoc,
} from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: process.env.REACT_APP_FB_API_KEY,
	authDomain: process.env.REACT_APP_AUTHDOMAIN,
	projectId: process.env.REACT_APP_PROJECT_ID,
	storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_APP_ID,
	measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

//SignIn with popup

const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
	try {
		const res = await signInWithPopup(auth, googleProvider);
		const user = res.user;
		const q = query(collection(db, 'users'), where('uid', '==', user.uid));
		const docs = await getDocs(q);
		if (docs.docs.length === 0) {
			await addDoc(collection(db, 'users'), {
				uid: user.uid,
				name: user.displayName,
				authProvider: 'google',
				email: user.email,
			});
		}
	} catch (err) {
		console.error(err);
		alert(err.message);
	}
};

const addUserAvatar = async (user, avatar) => {
	try {
		const usersRef = collection(db, 'users');
		const userQuery = query(usersRef, where('uid', '==', user.uid));
		const userQuerySnapshot = await getDocs(userQuery);

		const userDocRef = doc(usersRef, userQuerySnapshot.docs[0].id);
		console.log(avatar);
		// check each field and set it to a valid value if it's undefined
		const avatarUrl = avatar.avatarUrl || '';
		const skinUrl = avatar.skinUrl || '';
		const accessoryUrl = avatar.accessoryUrl || '';
		const hairUrl = avatar.hairUrl || '';
		const pantUrl = avatar.pantUrl || '';
		const shirtUrl = avatar.shirtUrl || '';
		const shoeUrl = avatar.shoeUrl || '';

		await updateDoc(userDocRef, {
			avatarUrl,
			skinUrl,
			accessoryUrl,
			hairUrl,
			pantUrl,
			shirtUrl,
			shoeUrl,
		});

		return true;
	} catch (err) {
		console.error(err);
		alert(err.message);
	}
};

// logout function
const logout = () => {
	signOut(auth);
};

export { auth, db, signInWithGoogle, logout, storage, addUserAvatar };
