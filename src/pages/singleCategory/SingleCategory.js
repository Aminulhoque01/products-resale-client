import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import CategoryCar from '../CategoryCar/CategoryCar';
import OpenModal from '../CategoryCar/OpenModal/OpenModal';

const SingleCategory = () => {
    const categories = useLoaderData();
    const [products,setProducts]=useState()


    return (
        <div className=''>
            <h1 className='text-3xl font-bold text-center text-purple-600'>{categories.name}</h1>

            <div className='gap-4'>
                {
                    categories.map(category => <CategoryCar 
                        key={category._id} 
                        category={category}
                        setProducts={setProducts}>

                    </CategoryCar>)
                }

                
            </div>
            {
                products &&
                <OpenModal 
                products={products}
                setProducts={setProducts}>
                </OpenModal>
            }
        </div>
    );
};

export default SingleCategory;