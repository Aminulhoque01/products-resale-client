import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';
import { toast } from 'react-hot-toast';
import { GoogleAuthProvider } from "firebase/auth";

const Login = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [loginError, setLoginError] = useState('');
    const { loginUser, googleSignIn } = useContext(AuthContext);
    // const [loginUserEmail, setLoginUserEmail]= useState('');
    // const [token] = useToken(loginUserEmail)
    
    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname|| '/' ;

    const googleProvider = new GoogleAuthProvider();
    // if(token){
    //     navigate(from,{replace:true});
    // }

    const handleLogin = (data) => {
        console.log(data);
        setLoginError('');
        loginUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                toast.success('SuccessFull user login');
                navigate(from, {replace: true});
            })
            .catch(error => {
                console.log(error);
            })

    }

    const handleGoogle = () => {
        googleSignIn(googleProvider)
            .then(result => {
                const user = result.user;
                console.log(user);
                toast.success('successful google login')
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (

        <div className="hero min-h-screen bg-base-content">
            <div className="hero-content flex-col lg:flex-row-reverse">

                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">

                        <div className='w-96'>
                            <h2 className='text-4xl'>login</h2>
                            <form onSubmit={handleSubmit((handleLogin))}>

                                <div className="form-control w-full max-w-xs">
                                    <label className="label"><span className="label-text">Email</span> </label>
                                    <input type="text"
                                        {...register("email", {
                                            required: "Email Address is required"
                                        })}
                                        className='input input-bordered w-full' />
                                    {errors.email && <p role="alert" className='text-red-600'>{errors.email?.message}</p>}

                                    <div className="form-control w-full max-w-xs">
                                        <label className="label"><span className="label-text">Password</span></label>
                                        <input type="password" {...register('password', {
                                            required: "Password is required",
                                            minLength: { value: 6, message: 'plz put at lest 6 characters' }
                                        })}
                                            className='input input-bordered w-full' />
                                        {errors.password && <p role="alert" className='text-red-600'>{errors.password?.message}</p>}
                                    </div>

                                    <div className="form-control w-full max-w-xs">
                                        <label className="label"><span className="label-text">select now</span></label>

                                        <select {...register("category")}>
                                            <option value="">Select...</option>
                                            <option value="A">Seller user</option>
                                            <option value="B">Normal user </option>
                                        </select>

                                    </div>
                                    <div>
                                        {
                                            loginError && <p className='text-red-600'>{loginError}</p>
                                        }
                                    </div>

                                </div>
                                <br />

                                <button className="btn">Login</button>
                            </form>
                            <p>New to Doctors portal <Link to='/register' className='text-primary'>create a New Account</Link></p>
                            <div className="divider">OR</div>
                            <button onClick={handleGoogle} className='btn btn-outline'>CONTINUE WITH GOOGLE</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    );
};

export default Login;