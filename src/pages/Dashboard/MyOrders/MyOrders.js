import { async } from '@firebase/util';
import { useQueries, useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../../Context/AuthProvider/AuthProvider';

const MyOrders = () => {
    const{user} = useContext(AuthContext);

    const url = `http://localhost:5000/bookings?email=${user?.email}`

    const {data: bookings = []} = useQuery({
        queryKey:['bookings', user?.email],
        queryFn: async()=>{
            const res = await fetch(url);
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
                            <th>items Name</th>
                            <th>items Price</th>
                            <th>Buyer Name</th>
                            <th>Buyer email</th>
                            <th>Buyer phone</th>
                            <th>Buyer location</th>
                        </tr>
                    </thead>
                    <tbody>
                       
                       {
                        bookings.map((booking ,i)=> <tr key={booking._id}>
                            <th>{i+1}</th>
                            <td>{booking.itemsName}</td>
                            <td>{booking.itemsPrice}</td>
                            <td>{booking.name}</td>
                            <td>{booking.email}</td>
                            <td>{booking.phone}</td>
                            <td>{booking.location}</td>
                            
                        </tr>)
                       }
                       
                        
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyOrders;