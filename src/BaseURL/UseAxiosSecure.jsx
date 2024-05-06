import axios from "axios";
import { useEffect } from "react";
import UseAuthHooks from "../Hooks/UseAuthHooks";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true
})

const UseAxiosSecure = () => {

    const { logOut } = UseAuthHooks()
    const navigate = useNavigate()

    useEffect(() => {
        axiosSecure.interceptors.response.use(res => {
            return res;
        }, error => {
            console.log('error tracked', error.message)
            if (error.message.status === 401 || error.message.status === 403) {
                console.log('logOut')
                logOut()
                    .then(() => {
                        navigate('/login')
                    })
                    .catch(error => console.log(error))
            }
        }
        )
    }, [])

    return axiosSecure;
};

export default UseAxiosSecure;