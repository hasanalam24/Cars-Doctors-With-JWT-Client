import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../Firebase/AuthProvider";


const CheckOut = () => {
    const service = useLoaderData()
    const { title, _id, price, img } = service;
    const { user } = useContext(AuthContext)

    const handleCheckService = e => {
        e.preventDefault()
        const form = e.target
        const name = form.name.value
        const date = form.date.value
        const email = user?.email
        const booking = {
            customerName: name,
            email: email,
            img,
            date: date,
            service: title,
            service_id: _id,
            price: price
        }
        console.log(booking)
        fetch('http://localhost:5000/bookings', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })
    }
    return (
        <div>
            <h1 className="text-center text-3xl">CheckOut this</h1>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">

                    </div>
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleCheckService} className="card-body grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input name="name" type="name" defaultValue={user?.displayName} placeholder="Name" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Date</span>
                                </label>
                                <input type="date" name="date" placeholder="Date" className="input input-bordered" required />

                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email" defaultValue={user?.email} className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Due Amount</span>
                                </label>
                                <input type="text" placeholder="Due Amount"
                                    defaultValue={`$ ` + price} className="input input-bordered" required />

                            </div>
                            <div className="form-control mt-6">

                                <input className="btn btn-secondary btn-block" type="submit" value="Order Confirm" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckOut;