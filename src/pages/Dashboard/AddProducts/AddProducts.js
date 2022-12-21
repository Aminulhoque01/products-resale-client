
import { useQuery } from '@tanstack/react-query';
import React, {useContext } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthProvider/AuthProvider';
import ProductCategories from '../../productCategories/ProductCategories';

const AddProducts = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();

    const conditions = [
        {
            conditionType: "Excellent",
            id: "1",
        },
        {
            conditionType: "Good",
            id: "2",
        },
        {
            conditionType: "normal",
            id: "3",
        },
    ];




    const{user} =useContext(AuthContext)

   
    const handleAdd = (event) => {
        event.preventDefault();
        const form = event.target;
        const items = form.items.value;
        const price = form.price.value;
        const description = form.description.value;
        const phone = form.phone.value;
        const location = form.location.value;
        const url = form.url.value;
        const time = new Date().toLocaleString();
        const used = form.used.value;
        const PurchaseYear = form.PurchaseYear.value;
        const category = form.category.value;
        const sell  = form.sell.value;

        const AddProducts = {
            name: items,
            sell_price: price,
            category_id:category,
            description,
            phone,
            location,
            image_url:url,
            used,
            buy_price:sell,
            Time:time,
            PurchaseYear,
            condition: conditions,
            
           
        }

       

        fetch(`https://y-sable-eight.vercel.app/addProducts?email=${user?.email}`,{
            method:'POST',
            headers:{
                "content-type":"application/json",
                authorization:`bearer ${localStorage.getItem('accessToken')}`
            },
            body:JSON.stringify(AddProducts)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            if(data.acknowledged){
                toast.success('successful your product add')
                form.reset('')
            }
        })
       
    }
    return (
        <div>
            <h2 className='text-3xl font-bold mb-5'>Now add products</h2>

            <form onSubmit={handleAdd}>
                
                <input type="text" name='items'  placeholder="Your product Name"  className="input w-full input-bordered" />
                <br />
                <br />
                <input type="text" name='url'  placeholder="Your product url"  className="input w-full input-bordered" />
                <br />
                <br />
                <input type="text" name='category'  placeholder="Your product category_id (01 or 02 or 03)"  className="input w-full input-bordered" />
                <br />
                <br />
                <input type="text" name='price'   placeholder="Your product buy price" className="input w-full input-bordered" />
                <br />
                <br />
                <input type="text" name='sell'   placeholder="Your product sell price" className="input w-full input-bordered" />
                <br />
                <br />
            
                <input type="text" name='PurchaseYear'   placeholder="Your product PurchaseYear" className="input w-full input-bordered" />
                <br />
                <br />
                <input name='description' type="text"   placeholder="Your product description" className="input w-full input-bordered" />
                <br />
                <br />
                <input name='used' type="text"   placeholder="Your product use of years" className="input w-full input-bordered" />
                <br />
                <br />
                <input name='phone' type="text" placeholder="Your Phone" className="input w-full input-bordered" />
                <br />
                <br />
                <input name='location' type="text" placeholder="Location" className="input w-full input-bordered" />
                
                <div className="form-control w-full max-w-xs">
                        <label className="label">
                            {" "}
                            <span className="label-text">Condition</span>
                        </label>
                        <select
                            {...register("condition", { required: true })}
                            className="select input-bordered w-full max-w-xs"
                        >
                            <option disabled selected>
                                Select Your product Condition
                            </option>
                            {conditions.map((condition) => (
                                <option key={condition.id} value={condition?.conditionType}>
                                    {condition?.conditionType}
                                </option>
                            ))}
                        </select>
                    </div>
                    <br />
                <input className='btn btn-accent w-full max-w-xs' type="submit" />



            </form>
        </div>
    );
};

export default AddProducts;