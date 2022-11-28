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
                            
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default DashboardLayout;