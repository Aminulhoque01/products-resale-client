import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../../Context/AuthProvider/AuthProvider';
import ConfirmationModal from '../../../../sheared/ConfirmationModal/ConfirmationModal';

const SellerProduct = () => {
    const { user } = useContext(AuthContext);
    const [deletingProduct, setDeletingProduct] = useState(null);

    const closeModal=()=>{
        setDeletingProduct(null);
    }

   

    const url = `http://localhost:5000/addProducts?email=${user?.email}`

    const { data: addProducts = [] ,refetch} = useQuery({
        queryKey: ['addProducts', user?.email],
        queryFn: async () => {
            const res = await fetch(url);
            const data = await res.json();
            return data;
        }
    })

    const handleDeleteProduct=(product)=>{
        fetch(`http://localhost:5000/addProducts/${product._id}`,{
            method:'DELETE',
            // headers:{
            //     c
            // }
        })
        .then(res=> res.json())
        .then(data=>{
            if(data.deleteCount> 0){
                refetch();
                toast.success('deleting products')
                console.log(data);
            }
        })
    }

    return (
        <div>
            <h2>My sell products</h2>

            <div className="overflow-x-auto">
                <table className="table w-full">

                    <thead>
                        <tr>
                            <th></th>
                            <th>Product image</th>
                            <th>products Name</th>
                            <th>products price</th>
                            <th>seller phone</th>
                            <th>sell location</th>
                            <th>product used</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            addProducts.map((product, i) => <tr key={product._id}>
                                <th>{i + 1}</th>
                                <th><div className="avatar">
                                    <div className="w-24 rounded">
                                        <img src={product.image_url} alt=''/>
                                    </div>
                                </div></th>
                                <td>{product.name}</td>
                                <td>{product.sell_price}</td>
                                <td>{product.phone}</td>
                                <td>{product.location}</td>
                                <td>{product.used}</td>
                                <td>
                                    <label onClick={()=>setDeletingProduct(product)} htmlFor="confirmation-modal" className='btn btn-error'>Delete</label>
                                   
                                </td>

                            </tr>)
                        }


                    </tbody>
                </table>
            </div>
            {
                deletingProduct &&
                <ConfirmationModal
                title={`Are you sure Delete ?`}
                message={`This product name ${deletingProduct.name}`}
                closeModal={closeModal}
                handleDeleteProduct = {handleDeleteProduct}
                modalData = {deletingProduct}
                >

                </ConfirmationModal>
            }
        </div>
    );
};

export default SellerProduct;