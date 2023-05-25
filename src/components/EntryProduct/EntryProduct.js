import React, { useState } from 'react';
import Loading from '../Shired/Loading';
import { toast } from 'react-toastify';

const EntryProduct = () => {
    const [isLoading, setIsLoading] = useState(false);

    const handleEntryMediicine = (event) => {
        event.preventDefault();
        setIsLoading(true);

        
        const medicineData = {
            name: (event.target.name.value).toLowerCase(),
            power: event.target.power.value,
            company: event.target.company.value,
            quantity: event.target.quantity.value,
            buyingPrice: event.target.buyingPrice.value,
            salingPrice: event.target.salingPrice.value,
        }
        console.log(medicineData.name)
       
        // send medicine information to database
        fetch('http://localhost:5000/entryMedicine', {
            method: 'PUT',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(medicineData),
        })
        .then(res => res.json())
        .then(data => {
            if(data.upsertedId){
                setIsLoading(false);
                toast.success('Medicine entry successfull')
            }else{
                setIsLoading(false);
                toast.success('Medicine update successfull')
            }
        })
    }
    return (
        <>
        {(isLoading && <Loading></Loading>) || (!isLoading && <div className='text-black text-center'>
            <h2 className='text-[30px] m-5 font-bold'>Entry New Medicine</h2>
            <form onSubmit={handleEntryMediicine}>
                <input type="text" placeholder="Medicine Name" name='name' className="input input-bordered input-warning w-full max-w-xs mr-2 mt-2" />
                <input type="text" placeholder="Medicine Power" name='power' className="input input-bordered input-warning w-full max-w-xs mr-2 mt-2" />
                <input type="text" placeholder="Company Name" name='company' className="input input-bordered input-warning w-full max-w-xs mr-2 mt-2" />
                <input type="text" placeholder="Quantity" name='quantity' className="input input-bordered input-warning w-full max-w-xs mr-2 mt-2" />
                <input type="text" placeholder="Buying Price Per Medicine" name='buyingPrice' className="input input-bordered input-warning w-full max-w-xs mr-2 mt-2" />
                <input type="text" placeholder="Saling Price Per Medicine" name='salingPrice' className="input input-bordered input-warning w-full max-w-xs mr-2 mt-2" /><br />
                <input className='btn btn-warning mt-3' type="submit" value="Entry" />
            </form>
            
        </div>)}
        </>
    );
};

export default EntryProduct;