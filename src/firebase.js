// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAn6yl_fWl_gfEQAb3CuzqcYZ8lErPEtX0",
  authDomain: "netflix-clone-310ea.firebaseapp.com",
  projectId: "netflix-clone-310ea",
  storageBucket: "netflix-clone-310ea.appspot.com",
  messagingSenderId: "1024905961640",
  appId: "1:1024905961640:web:0feec8d40ede25fbc5a29d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password)=>{
     try {
        const res =  await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"),{
          uid: user.uid,
          name,
          authProvider: "local",
          email,

        });
     } catch (error) {
          console.log(error);
          toast.error(error.code.split('/')[1].split('-').join(" "));
     }
}
const login = async(email, password)=>{
     try {
         await signInWithEmailAndPassword(auth, email,password);
     } catch (error) {
          console.log(error);
          toast.error(error.code.split('/')[1].split('-').join(" "));
     }
}
const logout = ()=>{
     signOut(auth);
}

export {auth, db, login, signup, logout}