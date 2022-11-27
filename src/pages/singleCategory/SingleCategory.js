import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import CategoryCar from '../CategoryCar/CategoryCar';
import OpenModal from '../CategoryCar/OpenModal/OpenModal';

const SingleCategory = () => {
    const categories = useLoaderData([]);
    
    const [products, setProducts] = useState()

    const [name, setname] = useState(categories)

    

    return (

        <div className='bg-neutral'>

            <div className=' bg-neutral p-10'>
                <h1 className='text-3xl font-bold text-center text-info mt-5'>{name[1].name}</h1>
            </div>

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