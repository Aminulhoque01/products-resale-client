import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';
import { toast } from 'react-hot-toast';

const Register = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [signupError, setSignupError] = useState('');
    const {createUser} = useContext(AuthContext);

    const handleRegister = (data) => {
        console.log(data);
        setSignupError(' ');
        createUser(data.email, data.password)
        .then(result =>{
            const user = result.user;
            console.log(user);
            toast.success('SuccessFull user Created');
        })
        .catch(err=>{
            console.error(err)
        })
    }

    return (
        <div className="hero min-h-screen bg-base-content">
            <div className="hero-content flex-col lg:flex-row-reverse">

                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">

                        <div className='w-96'>
                            <h2 className='text-4xl'>Register</h2>
                            <form onSubmit={handleSubmit((handleRegister))}>
                                {/* <input {...register("firstName")} /> */}
                                <div className="form-control w-full max-w-xs">
                                    <label className="label"><span className="label-text">Name</span> </label>
                                    <input type="text"
                                        {...register("name", {
                                            required: true,

                                        })}
                                        className='input input-bordered w-full' />

                                </div>
                                <div className="form-control w-full max-w-xs">
                                    <label className="label"><span className="label-text">Email</span> </label>
                                    <input type="text"
                                        {...register("email", {
                                            required: "Email Address is required"
                                        })}
                                        className='input input-bordered w-full' />
                                    {errors.email && <p role="alert" className='text-red-600'>{errors.email?.message}</p>}
                                </div>
                                <div className="form-control w-full max-w-xs">
                                    <label className="label"><span className="label-text">Password</span></label>
                                    <input type="password" {...register('password', {
                                        required: "Password is required",
                                        minLength: { value: 6, message: 'plz put at lest 6 characters' },
                                        pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/, message: 'password must be strong upperCase and special character' }
                                    })}
                                        className='input input-bordered w-full' />
                                    {errors.password && <p role="alert" className='text-red-600'>{errors.password?.message}</p>}
                                </div>

                                {signupError && <p className='text red-600'>{signupError}</p>}

                                <br />

                                <button className="btn">Register</button>
                            </form>
                            <p>New to Doctors portal <Link to='/login' className='text-primary'>YOU Have An Account</Link></p>
                            <div className="divider">OR</div>
                           
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Register;