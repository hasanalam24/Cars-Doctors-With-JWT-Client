import { useEffect, useState } from "react";

const UseServices = () => {
    const [service, setSevice] = useState([])

    useEffect(() => {
        fetch('')
            .then(res => res.json())
            .then(data => {
                setSevice(data)
            })
    }, [])
    return service
};

export default UseServices;