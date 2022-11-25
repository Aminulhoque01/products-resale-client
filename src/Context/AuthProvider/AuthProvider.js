import React, { createContext, useEffect, useState } from 'react';
import app from '../../Firebase/firebase.config';
import{getAuth, createUserWithEmailAndPassword, onAuthStateChanged,signInWithEmailAndPassword,signOut,signInWithPopup, updateProfile} from 'firebase/auth';

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({children}) => {
    const [user, setUser]= useState(null);
    const [loader, setLoader] = useState(true);

    const createUser = (email,password)=>{
        setLoader(true)
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const loginUser =(email, password)=>{
        setLoader(true)
        return signInWithEmailAndPassword(auth,email,password);
    }
   

    const googleSignIn =(provider)=>{
        return signInWithPopup(auth, provider)
    }
    const updateUser = (userInfo)=>{
        
        return updateProfile(auth.currentUser, userInfo)
    }

    const logOut =()=>{
        setLoader(true)
        return signOut(auth);
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
            console.log(currentUser);
            setUser(currentUser);
            setLoader(false);
        });
        return ()=> unsubscribe();
    },[])


    const authInfo ={user, createUser,loginUser,logOut,googleSignIn,loader,updateUser}
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;