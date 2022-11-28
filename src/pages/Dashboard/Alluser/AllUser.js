import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useLoaderData } from 'react-router-dom';

const AllUser = () => {
    const users = useLoaderData()
    const [displayUser, setDisplayUser]= useState(users);

    // const { data: users = [], refetch } = useQuery({
    //     queryKey: ['users'],
    //     queryFn: async () => {
    //         const res = await fetch('http://localhost:5000/users')
    //         const data = await res.json()
    //         return data;
    //     }
    // })

    const handleVerifyBtn = (id) => {
        fetch(`http://localhost:5000/users/admin/${id}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    toast.success("user verified");
                    // refetch()
                }
            })
    }

    const handleDeleteBtn = (id) => {
        const proceed = window.confirm('Are you sure you want delete user');

        if (proceed) {
            fetch(`http://localhost:5000/users/admin/${id}`, {
                method: 'DELETE',
               
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.acknowledged === true ) {
                        toast.success("user deleting successful");

                        const remaining = displayUser.filter(user=> user._id !==id);
                        setDisplayUser(remaining)
                    }
                })
        }
    }

    return (
        <div>
            <h2 className='text-3xl font-bold m-10'>All users</h2>

            <div className="overflow-x-auto">
                <table className="table w-full">

                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>User verify</th>
                            <th>Delete user</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            displayUser.map((user, i) => <tr key={user._id}>
                                <th>{i + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user?.role !== 'verified' && <button onClick={() => handleVerifyBtn(user._id)} className='btn btn-xs btn-info'>User verify</button>}</td>
                                <td><button onClick={() => handleDeleteBtn(user._id)} className='btn btn-xs btn-error'>Delete user</button></td>
                            </tr>)
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUser;