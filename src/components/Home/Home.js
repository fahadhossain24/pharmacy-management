import React, { useState } from 'react';
import bannar1 from '../../images/bannar1.jpg'
import bannar2 from '../../images/bannar2.jpg'
import bannar3 from '../../images/bannar3.jpg'
import './home.css'
import AutoTypedText from './AutoTypedText';
import Loading from '../Shired/Loading'

const Home = () => {
    const [searchText, setSearchText] = useState('');
    const [searchResult, setSearchResult] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [medicine, setMedicine] = useState({});
    const [userQuantity, setUserQuantity] = useState('');

    const handleMedicineSearch = () => {
        setIsLoading(true);
        const searchTextArr = searchText.split(' ');
        const searchName = searchTextArr[0];
        const searchPower = searchTextArr[1];

        fetch(`http://localhost:5000/searchMedicine/${searchName}/${searchPower}`)
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                if (data._id) {
                    setIsLoading(false);
                    setSearchResult(data)
                } else {
                    setSearchResult(data);
                    setIsLoading(false)
                }
            })
    }

    const handleAddToCart = (medicineObj) => {
        setMedicine(medicineObj);
        const { name, power, company, buyingPrice, salingPrice } = medicine;
        if (userQuantity) {
            const newMedicineObj = {
                name, power, company, userQuantity, buyingPrice, salingPrice,
            }

            fetch('http://localhost:5000/cartMedicine', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newMedicineObj),
            })
                .then(res => res.json())
                .then(data => {
                    if(data.insertedId){
                        setIsLoading(false);
                    }
                })

            const quantity = parseInt(medicineObj.quantity) - parseInt(userQuantity)
            const quantityWithString = quantity.toString();
            const newMedicineObjForUpdateQuantity = {
                name, power, company, quantity: quantityWithString, buyingPrice, salingPrice,
            }

            setIsLoading(true);
            fetch('http://localhost:5000/updateQunatity', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newMedicineObjForUpdateQuantity),
            })
                .then(res => res.json())
                .then(data => {
                    setIsLoading(false)
                });
        }

    }

    const handleEnterKey = (searchReultObj) => {
        handleMedicineSearch();
        handleAddToCart(searchReultObj);
    }
    
    return (
        <>
            {
                (isLoading && <Loading></Loading>) || (!isLoading && <div>
                    <div className='fixed h-full w-full'>
                        <div className="carousel w-full h-full relative brightness-50">
                            <div id="item1" className="carousel-item w-full">
                                <img src={bannar3} className="w-full" alt='' />
                            </div>
                            <div id="item2" className="carousel-item w-full">
                                <img src={bannar2} className="w-full" alt='' />
                            </div>
                        </div>
                    </div>
                    <div className='w-[550px]'>
                        <div className='absolute top-[30%] left-3 lg:left-[35%]  w-[550px] text-[40px]'>
                            <AutoTypedText></AutoTypedText>
                        </div>
                        <div className='flex gap-2 absolute top-[50%] left-3 lg:left-[35%]  w-[550px]'>
                            <input type="text" onKeyDown={(e) => e.key === "Enter"? handleEnterKey(searchResult) : ''} onChange={(event) => setSearchText((event.target.value).toLowerCase())} placeholder="Search Medicine..." className="input input-bordered input-warning w-full max-w-xs text-xl bg-transparent font-bold placeholder:text-yellow-500" />
                            <button onClick={handleMedicineSearch} className='btn btn-warning'>Search</button>
                        </div>
                        <div className='absolute top-[60%] left-3 lg:left-[35%]  w-[550px] text-[25px]'>
                            {searchResult._id ? <p className='mt-2 font-bold'>
                                <span><span className='text-success'>In Stock avilable</span> - Quantity: {searchResult.quantity} pices <span onClick={() => handleAddToCart(searchResult)}><label htmlFor="my-modal-6" className="text-warning cursor-pointer btn">Add</label></span></span>
                            </p> : <p className='text-warning mt-2'>{searchResult.message}</p>}
                        </div>
                    </div>
                </div>)
            }
            <input type="checkbox" id="my-modal-6" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle text-black">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Medicine Information - Medicine Park</h3>
                    <input onChange={(e) => setUserQuantity(e.target.value)} className='input input-bordered input-warning w-full max-w-xs mt-2' type="text" name="quantity" id="" />
                    <div className="modal-action">
                        <label onClick={() => handleAddToCart(searchResult)} htmlFor="my-modal-6" className="btn btn-warning">done</label>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;