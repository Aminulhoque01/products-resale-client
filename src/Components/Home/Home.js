import React from 'react';
import AdvertisedItems from '../../pages/Advertiseditems/AdvertisedItems';
import Banner from '../../pages/Banner/Banner';
import Delivery from '../../pages/delevaryPage/Delivery';
import ProductCategories from '../../pages/productCategories/ProductCategories';

const Home = () => {
    return (
        <div className='px-10 rounded'>
           <Banner></Banner>
           <ProductCategories></ProductCategories>
           <Delivery></Delivery>
           <AdvertisedItems></AdvertisedItems>
        </div>
    );
};

export default Home;