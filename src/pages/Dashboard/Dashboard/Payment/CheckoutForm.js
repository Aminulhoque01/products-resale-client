import React, { useEffect, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import toast from 'react-hot-toast';

const CheckoutForm = ({booking}) => {
    const {email, _id,itemsPrice,name} = booking;
    // console.log(itemsPrice);

    const stripe = useStripe();
    const elements = useElements();
    const [cardError, setCardError] = useState(' ');
    const [clientSecret, setClientSecret] = useState("");
    const [success, setSuccess] = useState(' ');
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState(' ');
    


    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("http://localhost:5000/create-payment-intent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // authorization: `bearer ${localStorage.getItem('accessToken')}`

            },
            body:JSON.stringify({itemsPrice}),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, [itemsPrice]);


    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {

        }

        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card

        });

        if (error) {
            console.log(error);
            setCardError(error.message);
        } else {
            setCardError(' ')
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,

            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name:name,
                        email:email,
                    },
                },
            },
        );

        if (confirmError) {
            setCardError(confirmError.message);
            return
        }
        console.log(paymentIntent);

        if (paymentIntent.status === "succeeded") {
            console.log(card);

            const payment = {
                itemsPrice,
                transactionId: paymentIntent.id,
                email,
                bookingId:_id,
            }
            fetch('http://localhost:5000/payments', {
                method: 'POST',
                headers: {
                    'content-type':'application/json',
                    // authorization: `bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify(payment)
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);

                if (data.insertedId) {
                    setSuccess('congrats! your payment confirm');
                    setTransactionId(paymentIntent.id);
                    toast.success('successful your payment')
                }

            })

        }
        setProcessing(false);

    }
    return (
        <>
            <div>
                <form onSubmit={handleSubmit}>
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#424770',
                                    '::placeholder': {
                                        color: '#aab7c4',
                                    },
                                },
                                invalid: {
                                    color: '#9e2146',
                                },
                            },
                        }}
                    />
                    <button className='btn btn-primary-focus mt-5 btn-sm' type="submit" >
                        Pay
                    </button>
                </form>


                
            {
                success && <div>
                    <p className='text-green-500'>{success}</p>
                    <p>your transactionId<span className='font-bold'>{transactionId}</span></p>
                </div>
            }

            </div>
            <p className='text-red-500 font-bold'>{cardError}</p>
        </>
    );
};

export default CheckoutForm;
