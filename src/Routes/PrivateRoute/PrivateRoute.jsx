import { useContext } from "react";
import { AuthContext } from "../../Firebase/AuthProvider";
import { Navigate } from "react-router-dom";


const PrivateRoute = ({ children }) => {

    const { user, loading } = useContext(AuthContext)

    if (loading) {
        return <h1>Loading</h1>
    }
    if (user?.email) {
        return children;
    }

    return <Navigate to="/login" replace></Navigate>
};

export default PrivateRoute;