import React, { useEffect, useState } from 'react';
import AllProductShow from './AllProductShow';

const AllProduct = () => {
    const [medicineInfo, setMedicineInfo] = useState([]);
    const [userQuantity, setUserQuantity] = useState('');
    const [medicine, setMedicine] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetch('http://localhost:5000/entryMedicine')
            .then(res => res.json())
            .then(data => {
                if (data) {
                    setMedicineInfo(data);
                }
            });
    }, [medicineInfo, medicine])



    const handleDelete = async (medicineName, medicinePower) => {
        const confirm = window.confirm('Do you want to delete this medicine?');
        if (confirm) {
            await fetch(`http://localhost:5000/entryMedicine/${medicineName}/${medicinePower}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount) {
                        const axistingMedicine = medicineInfo.filter(medicine => medicine.name !== medicineName && medicine.power !== medicinePower);
                        setMedicineInfo(axistingMedicine);
                    };
                })
        }

    }

    const handleAddToCart = (medicineObj) => {
        if (userQuantity) {
            setMedicine(medicineObj);
            const { name, power, company, buyingPrice, salingPrice } = medicine;
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
                    // console.log(data);
                })
            setUserQuantity(0);

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
                    // console.log(data)
                });
        }

    }

    return (
        <div className='mt-2'>
            <div className="overflow-x-auto">
                <table className="table table-compact w-full text-center">
                    <thead>
                        <tr>
                            <th>Medicine Name</th>
                            <th>Power</th>
                            <th>Company</th>
                            <th>Quantity</th>
                            <th>Buying Price</th>
                            <th className='bg-success text-black'>Saling Price</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>

                    {
                        medicineInfo.map(medicine =>
                            <tbody className='text-black'>
                                <tr>
                                    <td>{medicine.name}</td>
                                    <td>{medicine.power} mg</td>
                                    <td>{medicine.company}</td>
                                    <td>{medicine.quantity} pics</td>
                                    <td>{medicine.buyingPrice} tk</td>
                                    <td>{medicine.salingPrice} tk</td>
                                    <th onClick={() => handleDelete(medicine.name, medicine.power)} className='text-warning cursor-pointer'>Delete</th>
                                    <th><label onClick={() => handleAddToCart(medicine)} htmlFor="my-modal-6" className="text-success cursor-pointer">Add to cart</label></th>
                                </tr>
                            </tbody>

                        )
                    }
                </table>
            </div>

            {/* Put this part before </body> tag MODAL*/}
            <input type="checkbox" id="my-modal-6" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle text-black">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Medicine Information - Medicine Park</h3>
                    <input onChange={(e) => setUserQuantity(e.target.value)} className='input input-bordered input-warning w-full max-w-xs mt-2' type="text" name="quantity" id="" />
                    <div className="modal-action">
                        <label onClick={() => handleAddToCart(medicine)} htmlFor="my-modal-6" className="btn btn-warning">done</label>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default AllProduct;