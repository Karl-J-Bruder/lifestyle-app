import app from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./config";
import "firebase/firestore";

class Firebase {

    constructor() {
        // Initialize Firebase
        app.initializeApp(firebaseConfig);
        // enable access of various firebase auth features
        this.auth = app.auth();
        this.db = app.firestore();
    }
    async register(username, email, password, city) {
        //firebase method
        const newUser = await this.auth.createUserWithEmailAndPassword(
            email,
            password
        )
        //firebase method
        // return promise that updateProfile gives us
        return await newUser.user.updateProfile({
            displayName: username
        })
    }

    async login(email, password) {
        //firebase method
        // return promise that signInWithEmailAndPassword gives us
        return await this.auth.signInWithEmailAndPassword(email, password)
    }

    async logout() {
        await this.auth.signOut();
    }
    async resetPassword(email) {
        await this.auth.sendPasswordResetEmail(email);
    }
}

// must instantiate our class
const firebase = new Firebase();

export default firebase;