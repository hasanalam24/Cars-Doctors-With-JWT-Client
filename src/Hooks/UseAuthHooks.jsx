import { useContext } from "react";
import { AuthContext } from "../Firebase/AuthProvider";


const UseAuthHooks = () => {
    const auth = useContext(AuthContext)
    return auth;
};

export default UseAuthHooks;