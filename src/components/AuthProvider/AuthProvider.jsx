import { createContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword, 
    GoogleAuthProvider, 
    onAuthStateChanged, 
    signInWithEmailAndPassword, 
    signInWithPopup,
    signOut} from "firebase/auth";
import auth from "../../firebase/firebase.config";
// import useAxiosPublic from "../../hooks/useAxiosPublic";


export const authContext = createContext()

const AuthProvider = ({routes}) => {

    const googleProvider = new GoogleAuthProvider()

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    // const axiosPublic = useAxiosPublic();

const handleRegister = (email, password)=>{
   return createUserWithEmailAndPassword(auth, email, password)
}
const handleLogin =(email,password)=>{
    return signInWithEmailAndPassword(auth, email, password)
}
const handleGoogleLogin = () => {
    return signInWithPopup(auth, googleProvider)
}
const manageProfile = (name,image)=>{
    updateProfile(auth.currentUser,{
        displayName:name,
        photoURL:image
    })
}
const handleLogout = () => {
    signOut(auth);
}

const authInfo = {
    handleRegister,
    handleLogin,
    handleGoogleLogin,
    handleLogout,
    user,
    setUser,
    loading,
    manageProfile
}


useEffect(()=>{
const nonRegister = onAuthStateChanged(auth,(currentUser)=>{
    // setUser(currentUser)
    if(currentUser){
        // const userInfo = { email: currentUser.email };
        //         axiosPublic.post('/jwt', userInfo)
        //             .then(res => {
        //                 if (res.data.token) {
        //                     localStorage.setItem('access-token', res.data.token);
        //                     // setLoading(false)
        //                 }
        //             })
        setUser(currentUser)
    }
    else{
        setUser(null)
        // TODO: remove token (if token stored in the client side: Local storage, caching, in memory)
        // localStorage.removeItem('access-token');
        // setLoading(false)
    }
    setLoading(false)

    return()=>{
        nonRegister()
    }
})
},[])


    return (
        <div>
           <authContext.Provider value={authInfo}>
            {routes}
            </authContext.Provider>
        </div>
    );
};

export default AuthProvider;