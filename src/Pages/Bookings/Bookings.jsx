import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Firebase/AuthProvider";
import { update } from "firebase/database";


const Bookings = () => {

    const { user } = useContext(AuthContext)
    console.log(user.email)
    const [bookings, setBookings] = useState([])

    const url = `http://localhost:5000/bookings?email=${user?.email}`


    useEffect(() => {
        fetch(url, { credentials: 'include' })
            .then(res => res.json())
            .then(data => {
                setBookings(data)
            })
    }, [url])

    const handleDelete = id => {
        const procced = confirm('Are You Sure you want to Delete?')
        if (procced) {
            fetch(`http://localhost:5000/bookings/${id}`, {
                method: "DELETE"
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.deletedCount > 0) {
                        alert('deleted SuccessFully')
                        const remaining = bookings.filter(booking => booking._id !== id)
                        setBookings(remaining)
                    }
                })
        }
    }

    const handleConfirm = (id) => {
        fetch(`http://localhost:5000/bookings/${id}`, {
            method: "PATCH",
            headers: {
                'content-type': "application/json"
            },
            body: JSON.stringify({ status: 'confirm' })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.modifiedCount > 0) {
                    // update state
                    const remaining = bookings.filter(booking => booking._id !== id)
                    const updated = bookings.find(booking => booking._id === id)
                    updated.status = 'confirm'
                    const newBook = [updated, ...remaining]
                    setBookings(newBook)

                }
            })
    }

    return (
        <div>
            <h1>this is bookings: {bookings.length}</h1>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                {/* <label>
                                    <input type="checkbox" className="checkbox" />
                                </label> */}
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
                                        <button onClick={() => handleDelete(booking._id)} className="btn btn-sm btn-circle">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                        </button>
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
                                        {
                                            booking.status === 'confirm' ? <span className="text-2xl text-primary font-bold">Confirmed</span> :
                                                <button onClick={() => handleConfirm(booking._id)} className="btn btn-ghost btn-xs">Confirm</button>
                                        }
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