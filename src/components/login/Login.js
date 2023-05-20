import React, { useState } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../firebase.config';
import Loading from '../Shired/Loading';

const Login = () => {
    const navigate = useNavigate();
    let error;
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        emailError,
      ] = useSignInWithEmailAndPassword(auth);

    if(loading){
        return <Loading></Loading>
    }
    if(user){
        navigate('/home')
    }
    if(emailError){
        error = emailError.message;
    }

    const handleLogin = (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        signInWithEmailAndPassword(email, password);
    }
    return (
        <div className='w-[50%] mx-auto text-center'> 
            <h2 className='text-[25px] mt-5 mb-5 text-black font-bold'>Login - Medicine Park</h2>
            <form onSubmit={handleLogin}>
                <input type="text" placeholder="email address" name='email' className="input input-bordered input-secondary w-full max-w-xs mt-3 text-black" /><br />
                <input type="password" placeholder="password" name='password' className="input input-bordered input-secondary w-full max-w-xs mt-3 text-black" /><br />
                {error && <p className='text-error'>{error}</p>}
                <input className='btn font-bold mt-5' type="submit" value="Login" />
            </form>
            <h2 className='text-black mt-3'>Don't have any account? please <Link className='text-warning font-bold' to='/register'>click here</Link></h2>
        </div>
    );
};

export default Login;