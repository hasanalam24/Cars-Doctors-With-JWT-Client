import { Result } from "postcss";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const HomeCard = () => {

    const [services, setServices] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/service')
            .then(res => res.json())
            .then(data => setServices(data))
    }, [])

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {
                services.map(service => <div key={service._id} className="card card-compact  bg-base-100 shadow-xl">
                    <figure><img src={service.img} alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">Shoes!</h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        <div className="card-actions justify-end">
                            <Link to={`/checkout/${service._id}`}>
                                <button className="btn btn-primary">Book Now</button>
                            </Link>
                        </div>
                    </div>
                </div>)
            }
        </div >
    );
};

export default HomeCard;