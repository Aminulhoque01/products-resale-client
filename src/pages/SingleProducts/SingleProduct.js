import React, { useState } from 'react';
import { Link,} from 'react-router-dom';

const SingleProduct = ({ product }) => {
    const { Brand_name, image,id } = product;



    
    
    return (
        <div>
            <div className="card card-compact w-96 bg-base-100 shadow-xl">
                <figure className='p-2 '><img src={image} alt=" "/></figure>
                <div className="card-body">
                    <h2 className="text-5xl font-bold text-center">{Brand_name}</h2>
                    <Link className="btn btn-primary text-center mt-2" to={`/single_category/${id}`}><button> Views</button></Link>
                    
                </div>
            </div>
        </div>
    );
};

export default SingleProduct;