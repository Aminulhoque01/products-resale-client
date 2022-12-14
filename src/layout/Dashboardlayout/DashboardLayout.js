import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import useAdmin from '../../Components/hook/useAdmin';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';
import Header from '../../sheared/Header/Header';

const DashboardLayout = () => {

    const{user}=useContext(AuthContext);

    const [isAdmin] = useAdmin(user?.email)


    return (

         <div className='px-10 bg-neutral'>
            <Header></Header>
            <div className=''>
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">

                        <div className="drawer drawer-mobile">
                            <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                            <div className="drawer-content">
                                <Outlet></Outlet>


                            </div>
                            <div className="drawer-side">
                                <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                                <ul className="menu p-4 w-80  text-base-content">

                                    <li><Link to="/dashboard">My Order</Link></li>
                                    <li><Link to="/dashboard/my-products">My Add Products</Link></li>
                                    <li><Link to="/dashboard/my_sell_products">My Sell Products</Link></li>
                                     

                                     {
                                        isAdmin && <>
                                           <li><Link to="/dashboard/all-user">All users</Link></li>
                                        </>
                                    } 

                                </ul>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default DashboardLayout;