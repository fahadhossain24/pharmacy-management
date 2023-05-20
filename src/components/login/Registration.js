import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import auth from '../../firebase.config';
import Loading from '../Shired/Loading';

const Registration = () => {
    const navigate = useNavigate();
    let error;
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        emailError,
      ] = useCreateUserWithEmailAndPassword(auth);
    
    if(loading){
        return <Loading></Loading>
    }
    if(user){
        navigate('/home');
    }
    if(emailError){
        error = emailError.message;
    }
    const handleRegister = (event) => {
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value;
        const password = event.target.password.value;
        createUserWithEmailAndPassword(email, password);
    }
    return (
        <div className='w-[50%] mx-auto text-center'> 
            <h2 className='text-[25px] mt-5 mb-5 text-black font-bold'>Create Account - Medicine Park</h2>
            <form onSubmit={handleRegister}>
                <input type="text" placeholder="Name here" name='name' className="input input-bordered input-secondary w-full max-w-xs mt-3" /><br />
                <input type="text" placeholder="email address" name='email' className="input input-bordered input-secondary w-full max-w-xs mt-3 text-black" /><br />
                <input type="password" placeholder="password" name='password' className="input input-bordered input-secondary w-full max-w-xs mt-3 text-black" /><br />
                {error && <p className='text-error'>{error}</p>}
                <input className='btn font-bold mt-5' type="submit" value="Create" />
            </form>
            <h2 className='text-black mt-3'>Have an account? please <Link className='text-warning font-bold' to='/login'>Login</Link></h2>
        </div>
    );
};

export default Registration;