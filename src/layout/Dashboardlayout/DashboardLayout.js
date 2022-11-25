import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Header from '../../sheared/Header/Header';

const DashboardLayout = () => {
    return (
        <div className='px-10'>
            <Header></Header>
            <div className="drawer drawer-mobile">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <Outlet></Outlet>
                    

                </div>
                <div className="drawer-side">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 bg-base-100 text-base-content">
                       
                        <li><Link to="/dashboard">My Order</Link></li>
                        <li><Link to="/dashboard/my products">My Add Products</Link></li>
                        <li><Link to="/dashboard/my_sell_products">My Sell Products</Link></li>
                       
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;