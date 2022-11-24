import React from 'react';
import { Link } from 'react-router-dom';

const SingleProduct = ({ product }) => {
    const { Brand_name, image } = product;
    return (
        <div>
            <div className="card card-compact w-96 bg-base-100 shadow-xl">
                <figure className='p-2 '><img src={image} alt=" "/></figure>
                <div className="card-body">
                    <h2 className="text-5xl font-bold text-center">{Brand_name}</h2>
                   <button className="btn btn-primary text-center mt-2">  <Link to={``}>Views</Link></button>
                    
                </div>
            </div>
        </div>
    );
};

export default SingleProduct;