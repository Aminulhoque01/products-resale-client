import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);
console.log(stripePromise);

const Payment = () => {
    const booking = useLoaderData();
    
    return (
        <div>
            <h2 className='text-3xl font-bold mb-10'>Add to card</h2>
            <h3 className='text-2xl pb-5'>Payment for your selected product <strong>{booking.itemsName}</strong></h3>
            <p className='text-2xl '>This product price <strong>{booking.itemsPrice}</strong></p>

            <div className="card w-96  shadow-xl mt-5">
                <div className="card-body">
                    <div className='mt-5'>
                        <Elements stripe={stripePromise} >
                            <CheckoutForm
                                booking={booking}
                            />
                        </Elements>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default Payment;