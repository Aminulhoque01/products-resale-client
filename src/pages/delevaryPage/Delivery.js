import React from 'react';
import delivery from '../../asstes/98455-delivery-truck.json'
import Lottie from 'lottie-react'
const Delivery = () => {
    return (
        <div className='mt-10'>
             <h2 className='text-black text-4xl text-center p-5 font-bold'>Product Delivery</h2>
            <div className="card card-side bg-base-300 ">
                

                <figure className='h-80 am:h-96 w-96' ><Lottie animationData={delivery}></Lottie></figure>
                <div className="card-body w-96 mt-10">
                   
                    <h3 className="card-title text-right algin-items-center pt-10 text-3xl">Get the desired product delivery through </h3>
                    <p className=' pt-5 text-1xl font-normal'>Find the best deals on t products that will reach you. Order online and enjoy our buyer protection policy,<br /> which results in a free replacement of the item if the product does not match the advertised description!.</p>
                   
                </div>
            </div>
        </div>
    );
};

export default Delivery;