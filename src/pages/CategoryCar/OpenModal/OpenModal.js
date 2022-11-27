import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../Context/AuthProvider/AuthProvider';

const OpenModal = ({ products, setProducts }) => {
    const { user } = useContext(AuthContext);
    const { name, sell_price } = products;

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const items = form.items.value;
        const price = form.price.value;
        const name = form.name.value;
        const email = form.email.value;
        const phone = form.phone.value;
        const location = form.location.value;

        const booking = {
            itemsName: items,
            
            itemsPrice: price,
            name,
            email,
            phone,
            location,
        }

        fetch('http://localhost:5000/bookings', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.acknowledged) {
                    setProducts(null);
                    toast.success('successfully booking');

                }else{
                    toast.error(data.message)
                }

            })



    }

    return (
        <div>
            <input type="checkbox" id="open-modal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                <label htmlFor="open-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <form onSubmit={handleSubmit}>
                        <h3 className="text-lg font-bold">{ }</h3>
                        <input type="text" name='items' defaultValue={name} disabled className="input w-full input-bordered" />
                        <br />
                        <br />
                        <input type="text" name='price' defaultValue={`${sell_price}`} disabled className="input w-full input-bordered" />
                        <br />
                        <br />
                        <input name='name' type="text" defaultValue={user?.displayName} disabled placeholder="Your Name" className="input w-full input-bordered pt-5" />
                        <br />
                        <br />
                        <input name='email' type="email" defaultValue={user?.email} disabled placeholder="Your Email" className="input w-full input-bordered" />
                        <br />
                        <br />
                        <input name='phone' type="text" placeholder="Your Phone" className="input w-full input-bordered" />
                        <br />
                        <br />
                        <input name='location' type="text" placeholder="Location" className="input w-full input-bordered" />
                        <br />
                        <br />

                        <input className='btn btn-accent w-full max-w-xs' type="submit" />



                    </form>
                  
                </div>
            </div>
        </div>
    );
};

export default OpenModal;