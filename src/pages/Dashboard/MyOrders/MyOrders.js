import { async } from '@firebase/util';
import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthProvider/AuthProvider';

const MyOrders = () => {
    const{user} = useContext(AuthContext);

    const url = `https://y-sable-eight.vercel.app/bookings?email=${user?.email}`

    const {data: bookings = []} = useQuery({
        queryKey:['bookings', user?.email],
        queryFn: async()=>{
            const res = await fetch(url,{
                headers:{
                    authorization:`bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json();
            return data;
        }
    })

    return (
        <div>
            <h2 className='text-3xl font-bold pb-5'>My Orders</h2>
            
            <div className="overflow-x-auto">
                <table className="table w-full">
                   
                    <thead>
                        <tr>
                            <th></th>
                            <th>products image</th>
                            <th>products Name</th>
                            <th>products Price</th>
                            <th>Buyer Name</th>
                            <th>Buyer email</th>
                            <th>Buyer phone</th>
                            <th>Buyer location</th>
                            <th>Payments</th>
                        </tr>
                    </thead>
                    <tbody>
                       
                       {
                        bookings.map((booking ,i)=> <tr key={booking._id}>
                            <th>{i+1}</th>
                            <th><div className="avatar">
                                    <div className="w-24 rounded">
                                        <img src={booking.image_url} alt=''/>
                                    </div>
                                </div></th>
                            <td>{booking.itemsName}</td>
                            <td>{booking.itemsPrice}</td>
                            <td>{booking.name}</td>
                            <td>{booking.email}</td>
                            <td>{booking.phone}</td>
                            <td>{booking.location}</td>
                            <td>
                                {
                                    booking.itemsPrice && !booking.paid && <Link to={`/dashboard/payment/${booking._id}`}>
                                    <button className="btn btn-info btn-sm">pay Now</button>
                                    </Link>
                                }
                                {
                                    booking.itemsPrice && booking.paid && <span className='text-info'>paid</span>
                                }
                            </td>
                            
                        </tr>)
                       }
                       
                        
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyOrders;