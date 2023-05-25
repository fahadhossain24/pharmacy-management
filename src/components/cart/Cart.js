import React, { useEffect, useRef, useState } from 'react';
import ReactPDF from '@react-pdf/renderer';
import Pdf from 'react-to-pdf';
import ReactPrint from 'react-to-pdf'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';



const Cart = () => {
    const [medicines, setMedicines] = useState([]);
    let totalPrice = 0;
    const ref = useRef()
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:5000/cartMedicine')
            .then(res => res.json())
            .then(data => {
                setMedicines(data);
            })
    }, [medicines])

    const handleClearCart = () => {
        const confirm = window.confirm('Are you sure? you want to clear this cart')
        if (confirm) {
            fetch('http://localhost:5000/cartMedicine', {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    // console.log(data);
                    navigate('/allMedicine')
                    toast.success('clear successfull');
                })
        }

    }

    const handlePrintSlip = () => {
        console.log('your slip here')

    }

    return (
        <div className='text-center'>
            <h2 className='mt-2 font-bold text-xl mb-2 text-black'>New Saling</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full text-center">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Medicine Name</th>
                            <th>Power</th>
                            <th>Company</th>
                            <th>Quantity</th>
                            <th>Buying Price</th>
                            <th>Saling Price</th>
                            <th>Total Price</th>
                        </tr>
                    </thead>
                    {
                        medicines.map(medicine =>
                            <tbody className=' text-black'>
                                <tr>
                                    <td>{medicine.name}</td>
                                    <td>{medicine.power} mg</td>
                                    <td>{medicine.company}</td>
                                    <td>{medicine.userQuantity} pics</td>
                                    <td>{medicine.buyingPrice} tk</td>
                                    <td>{medicine.salingPrice} tk</td>
                                    <td>{parseInt(medicine.salingPrice) * parseInt(medicine.userQuantity)} tk</td>
                                </tr>
                            </tbody>
                        )
                    }
                </table>
            </div>
            {medicines.length > 0 && <>
                <button onClick={handleClearCart} className='btn btn-warning mr-2'>Clear cart</button>
                <label htmlFor="my-modal-6" className='btn btn-warning'>Print Slip</label>
            </>}
            {/* modal for pdf */}
            <input type="checkbox" id="my-modal-6" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle text-black">
                <div className="modal-box">
                    
                    <div ref={ref}>
                        <h3 className="font-bold text-lg">Medicine Park</h3>
                        <div className='flex justify-around font-bold text-lg'>
                            <span>Name</span>
                            <span>Quantity</span>
                            <span>Price</span>
                        </div>
                        <span className='w-full h-[2px] bg-warning block'></span>
                        {
                            medicines.map(medicine => <div className='text-left'>
                                <span className="font-bold w-[200px] inline-block">{medicine.name} {medicine.power}</span>
                                <span className="font-bold w-[70px] inline-block text-center">{medicine.userQuantity}</span>
                                <span className="font-bold w-[175px] inline-block text-right">{parseInt(medicine.salingPrice) * parseInt(medicine.userQuantity)} tk</span>
                            </div>)
                        }

                        {
                            medicines.forEach(medicine => {
                                totalPrice += (parseInt(medicine.salingPrice) * parseInt(medicine.userQuantity))
                            })
                        }
                        <div className='w-full text-right mt-[-5px]'>
                            <span className='w-[150px] h-[2px] bg-warning inline-block '></span><br />
                            <h2 className='w-[110px] inline-block text-right font-bold'>Total: {totalPrice} tk</h2>
                        </div>
                    </div>
                    
                    <div className="modal-action">
                    <label htmlFor="my-modal-6" className="btn btn-warning">cancle</label>
                    <Pdf targetRef={ref} filename="medicine-slip.pdf">
                        {({ toPdf }) => (
                            <button onClick={toPdf} className="button btn btn-success">Print</button>
                        )}
                    </Pdf>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;