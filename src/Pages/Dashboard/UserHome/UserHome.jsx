import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import { Helmet } from "react-helmet-async";


const UserHome = () => {
    const { user } = useContext(AuthContext);
    return (
        <><Helmet>
            <title>Bistro Boss | User Home</title>
        </Helmet>
            <div>
                <div>
                    <h2 className="text-3xl">Hi,{' '}
                        {user.displayName ?
                            user.displayName : " "
                        }{' '} Welcome Back!</h2>
                </div>
            </div>
            
        </>
    );
};

export default UserHome;