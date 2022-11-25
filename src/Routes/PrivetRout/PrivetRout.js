import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';

const PrivetRout = ({children}) => {
    const {user,loader} = useContext(AuthContext);
    const location = useLocation();

    if(loader){
        return <progress className="progress w-56"></progress>
    }

    if(user){
        return children;
    }
    return <Navigate to='/login' state={{form:location}} replace></Navigate>;
};

export default PrivetRout;