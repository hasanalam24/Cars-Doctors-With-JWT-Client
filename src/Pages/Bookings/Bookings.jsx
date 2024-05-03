import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Firebase/AuthProvider";


const Bookings = () => {

    const { user } = useContext(AuthContext)
    console.log(user.email)
    const [bookings, setBookings] = useState([])
    const { customerName, email, date, service, price, img } = bookings
    console.log(bookings)

    const url = `http://localhost:5000/bookings?email=${user?.email}`


    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setBookings(data)
            })
    }, [])

    return (
        <div>
            <h1>this is bookings: {bookings.length}</h1>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Service</th>
                            <th>Price</th>
                            <th>Date</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookings.map(booking =>

                                <tr key={booking._id}>
                                    <th>
                                        <label>
                                            <input type="checkbox" className="checkbox" />
                                        </label>
                                    </th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={booking.img} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{booking.customerName}</div>

                                            </div>
                                        </div>
                                    </td>
                                    <td>{booking.email}</td>
                                    <td>${booking.service}</td>
                                    <td>${booking.price}</td>
                                    <td>${booking.date}</td>

                                    <th>
                                        <button className="btn btn-ghost btn-xs">details</button>
                                    </th>
                                </tr>

                            )
                        }

                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default Bookings;