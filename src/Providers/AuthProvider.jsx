/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile ,signInWithPopup} from "firebase/auth";
import app from '../Firebase/Firebase.config';
import useAxiosPublic from "../Pages/Shared/Hooks/useAxiosPublic";


export const AuthContext = createContext(null);
const auth = getAuth(app)

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();
    const axiosPublic = useAxiosPublic();

    const googleSignup = () => {
        setLoading(true);
        return signInWithPopup(auth,googleProvider)

        
    }

    const loginUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const logOut = () => {
        setLoading(true);
        return (signOut(auth))
    }


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            console.log("current user watching", currentUser);
            if (currentUser) {
                // get token and store client 
                const userInfo = { email: currentUser.email };
                
                axiosPublic.post("/jwt", userInfo)
                    .then(res => {
                       
                        if (res.data.token) {
                            localStorage.setItem("access-token", res.data.token);
                            setLoading(false);
                        }
                    })
            } else {
                // TODO: remove token (if token stored in the client local storage,caching ,in memory)
                localStorage.removeItem("access-token");
                setLoading(false);
            }
           
        })
        return () => {
            unsubscribe()
        }
    }, [axiosPublic]);
    
    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        });
    };



    const authInfo = {
        user, loading, loginUser, createUser, logOut, updateUserProfile, googleSignup
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;