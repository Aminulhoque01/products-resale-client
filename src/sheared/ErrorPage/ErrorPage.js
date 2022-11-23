import React from 'react';
import { TiCancel } from "react-icons/ti";

const ErrorPage = () => {
    return (
        <div className='container  mt-5  w-50'>
            <div className='ms-auto '>
                <h1 className='text-error text-center fw-bold '>404</h1>
                <h1 className='text-error text-center fw-bold '>Not Found</h1>
                <p className='text-error text-center fw-bold '><TiCancel size="580px"></TiCancel></p>

            </div>
        </div>
    );
};

export default ErrorPage;