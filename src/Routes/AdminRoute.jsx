/* eslint-disable react/prop-types */
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../Pages/Shared/Hooks/useAdmin";


const AdminRoute = ({children}) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
    const [isAdmin, isAdminLoading] = useAdmin();
    if (loading || isAdminLoading) {
        return <div className="h-screen flex justify-center items-center">
            <span className="loading loading-ring loading-lg"></span>
        </div>
    }
    if (user?.email && isAdmin) {
        return children;
    }
    return <Navigate to="/login" state={{from:location}} replace></Navigate>
};

export default AdminRoute;