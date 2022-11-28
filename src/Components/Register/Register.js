import React, { useContext, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';
import { toast } from 'react-hot-toast';
import useToken from '../hook/useToken';

const Register = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [signupError, setSignupError] = useState('');
    const {createUser,updateUser} = useContext(AuthContext);
    const Navigate = useNavigate();

    const [createUserEmail, setCreatedUserEmail]= useState('');
    const [token] = useToken(createUserEmail);

    if(token){
        Navigate('/')
    }

    const handleRegister = (data) => {
        
        setSignupError(' ');
        createUser(data.email, data.password)
        .then(result =>{
            const user = result.user;
            console.log(user);
            toast.success('SuccessFull user Created');
            const userInfo ={
                displayName : data.name,
            }
            updateUser(userInfo)
            .then(()=>{
                saveUser(data.name, data.email)
               

            })
            .catch(err => console.log(err))
        })
        .catch(error=>{
            console.error(error)
            setSignupError(error.message)
        })
    }


    const saveUser =(name,email)=>{
        const user ={name,email};
        fetch('http://localhost:5000/users',{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(user)
        })
        .then(res=>res.json())
        .then(data=>{
            setCreatedUserEmail(email)
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
                                    <input type="email"
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
                            <div className="divider">OR</div>
                            <p>New to Doctors portal <Link to='/login' className='text-primary'>YOU Have An Account</Link></p>
                           
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Register;