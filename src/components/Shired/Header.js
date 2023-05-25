import React, { useEffect, useState } from 'react';
import { useAuthState, useSignOut } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../firebase.config';
import Loading from './Loading';

const Header = () => {
    const [user] = useAuthState(auth)
    const [signOut, loading, error] = useSignOut(auth);
    const navigate = useNavigate();
    const [medicines, setMedicines] = useState([])

    useEffect(() => {
        fetch('https://pharmecy-management-server.vercel.app/cartMedicine')
            .then(res => res.json())
            .then(data => {
                setMedicines(data);
            })
    }, [medicines])

    if (loading) {
        return <Loading></Loading>;
    }

    const handleSignOut = () => {
        signOut();
        navigate('/login')
    }
    return (
        <div>
            <div className="navbar bg-base-300 text-white">
                <div className="navbar-start w-[18%]">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-300 rounded-box w-52">
                            <li><Link to='/home'>Home</Link></li>
                            <li><Link to='/enteryMedicine'>Entry new Medicine</Link></li>
                            <li><Link to='/allMedicine'>All Medicine</Link></li>
                            <li><Link to='/login'>Login</Link></li>
                        </ul>
                    </div>
                    <a className="btn btn-ghost normal-case text-xl block">Medicine Park</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li><Link to='/home'>Home</Link></li>
                        <li><Link to='/enteryMedicine'>Entry new Medicine</Link></li>
                        <li><Link to='/allMedicine'>All Medicine</Link></li>
                        {!user ? <li><Link to='/login'>Login</Link></li> : <li onClick={handleSignOut} className='my-auto cursor-pointer'>Sign Out</li>}
                    </ul>
                </div>
                <div className="navbar-end w-[18%]">
                    <div className="indicator">
                        <span className="indicator-item badge badge-secondary mr-[70px] mt-[22px]">{medicines.length}</span>
                        <Link to='/cart' className="btn grid bg-base-300 place-items-center">cart</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;