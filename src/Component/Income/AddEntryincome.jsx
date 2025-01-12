import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddEntryincome = ({selectedColor}) => {

    const [formData, setFormData] = useState({
        date: '',
        partyName: '',
        brokerName: '',
        paymentDate: '',
        amountAfterBrokerage: '',
        weight: '',
        price: '',
        totalPayment: '',
        percentage: '',
        brokerage: '',
        diamondType: '',
        entryType: "incoming",
        days: '',
    });
    const [data, setData] = useState([])


    const valdropdown = [
        {
            name: '+000 -00'
        },
        {
            name: '+00 -0'
        },
        {
            name: '+0 -1 '
        },
        {
            name: '-2'
        },
        {
            name: '-4'
        },

        {
            name: '-5'
        },
        {
            name: '+2'
        },
        {
            name: '+650'
        },
        {
            name: 'Cut(ચોકી)'
        }, {
            name: 'Pan(પાન)'
        },
        {
            name: 'Marquee(માર્કીસ)'
        },
        {
            name: 'Oval(ઓવલ)'
        },
        {
            name: 'Emeral(એમરલ)'
        },
        {
            name: '1 Caret(1 કેરેટ)'
        },
        {
            name: '2 Caret(2 કેરેટ)'
        },
        {
            name: '3 Caret(3 કેરેટ)'
        }
    ]
    useEffect(() => {
        getBroker()
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('https://diamond-be.onrender.com/api/v1/daimond/add-diamond', formData)
            .then((res) => {

                if (res.status == 200 || res.status == 201 || res.status == 204) {                    
                    toast.success("Data Added Successfully")
                }
                setFormData({
                    date: '',
                    partyName: "",
                    brokerName: "",
                    paymentDate: '',
                    amountAfterBrokerage: '',
                    weight: '',
                    price: '',
                    totalPayment: '',
                    percentage: '',
                    brokerage: '',
                    diamondType: '',
                    entryType: "incoming",
                    days: ''
                });
            })
            .catch((err) => {
                toast.error(err.response ? err.response.data.message : err.message)
            });
    };

    const getBroker = () => {
        axios.get('https://diamond-be.onrender.com/api/v1/broker/get-brokers').then((res) => {
            setData(res.data.data)
        })
    }


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        if (name === 'weight' || name === 'price') {
            calculateTotalPayment(name, value);
        }
        if (name === 'diamondPaymentPercentage') {
            calculateBrokerage(value);
        } if (name == "percentage") {
            calculateBrokerage(value)
        }
    };

    const calculateTotalPayment = (fieldName, fieldValue) => {
        const weight = fieldName === 'weight' ? parseFloat(fieldValue) || 0 : parseFloat(formData.weight) || 0;
        const price = fieldName === 'price' ? parseFloat(fieldValue) || 0 : parseFloat(formData.price) || 0;
        const totalPayment = Math.floor(weight * price);

        setFormData((prevData) => ({ ...prevData, totalPayment }));
    };

    const calculateBrokerage = (percentageValue) => {

        const totalPayment = parseFloat(formData.totalPayment) || 0;
        const brokerage6Percent = Math.floor((totalPayment * percentageValue) / 100);
        const amountAfter6Percent = Math.floor(totalPayment - brokerage6Percent);
        const brokerage = Math.floor((amountAfter6Percent * 1) / 100);
        const amountAfterBrokerage = amountAfter6Percent - brokerage;        
        const diamondPayment = Math.floor(amountAfterBrokerage);


        setFormData((prevData) => ({
            ...prevData,
            brokerage,
            amountAfterBrokerage,
            diamondPayment
        }));
    };


    return (

        <>
            <ToastContainer position="top-right" />
            <div>
                <form class="max-w-3xl mx-auto mt-24 border p-5 rounded-[10px] border-solid border-[black] ml-[510px]" onSubmit={handleSubmit}>
                    <h1 className='bg-red-500 text-white text-xl rounded-3xl text-center mb-5 p-1' style={{backgroundColor:selectedColor}}>Income(આવક)</h1>
                    <div class="grid md:grid-cols-2 md:gap-6">
                        <div class="relative z-0 w-full mb-5 group">
                            <input type="date" name="date" id="floating_first_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" value={formData.date} onChange={handleInputChange} placeholder=" " required />
                            <label for="floating_first_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Date(તારીખ)</label>
                        </div>
                        <div class="relative z-0 w-full mb-5 group">
                            <input type="number" name="weight" id="floating_last_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" value={formData.weight} onChange={handleInputChange} placeholder=" " required />
                            <label for="floating_last_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Weight(વજન)</label>
                        </div>
                    </div>

                    <select placeholder="select diamond type" name="diamondType" className='w-full text-gray-900 py-2.5 border-black border-0 border-b-2 mb-4' value={formData.diamondType} onChange={handleInputChange}>
                    <option value="" disabled selected hidden>
                                 Select Diamond Type
                                </option>
                        {
                            valdropdown.map((val) => {
                                return (

                                    <option>{val.name}</option>
                                )
                            })
                        }
                    </select>

                    <div class="grid md:grid-cols-2 md:gap-6">
                        <div class="relative z-0 w-full mb-5 group">
                            <input type="number" name="price" id="floating_email" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={formData.price} onChange={handleInputChange} required />
                            <label for="floating_email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Price(ભાવ)</label>
                        </div>
                        <div class="relative z-0 w-full mb-5 group">
                            <input type="number" name="totalPayment" id="floating_email" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={formData.totalPayment} readOnly />
                            <label for="floating_email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Total Payment(કુલ ચૂકવણી)</label>
                        </div>
                    </div>

                    <div class="grid md:grid-cols-2 md:gap-6">

                        {/* <div class="relative z-0 w-full mb-5 group">
                            <input type="number" name="totalPayment" id="floating_email" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" value={formData.diamondPaymentPercentage} onChange={handleInputChange}  required/>
                            <label for="floating_email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Brokerage Percentage(ટકાવારી)</label>
                        </div> */}
                        <div class="relative z-0 w-full mb-5 group">
                            <input type="number" name="diamondPaymentPercentage" id="floating_email" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={formData.diamondPaymentPercentage} onChange={handleInputChange} required />
                            <label for="floating_email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Brokerage Percentage(ટકાવારી)</label>
                        </div>
                        <div class="relative z-0 w-full mb-5 group">
                            <input type="text" name="partyName" id="" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={formData.partyName} onChange={handleInputChange} required />
                            <label for="floating_password" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Party Name(પાર્ટીનું નામ)</label>
                        </div>
                    </div>

                    <div class="grid  md:gap-6">
                        {/* <div class="relative z-0 w-full mb-3 group"> */}

                            {/* <div class="relative z-0 w-full  group">
                                <input type="date" name="paymentDate" id="floating_first_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" value={formData.paymentDate} onChange={handleInputChange} placeholder="Date" required />
                                <label for="floating_first_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Payment(ચુકવણીની તારીખ)</label>
                            </div> */}
                            {/* <input type="password" name="repeat_password" id="floating_repeat_password" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required /> */}
                            {/* <label for="floating_repeat_password" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Broker Name(દલાલનું નામ)</label> */}
                        {/* </div> */}
                        <div class="relative z-0 w-full mb-5 group">
                            <input type="number" name="days" id="days" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={formData.days} onChange={handleInputChange} required />
                            <label for="days" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Days</label>
                        </div>
                    </div>

                    <select placeholder="helo" name="brokerName" value={formData._id} onChange={handleInputChange} className='block mb-3 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'>
                        <option value="" disabled selected hidden>
                            Select a broker
                        </option>
                        {
                            data.map((val) => {
                                return (
                                    <option key={val._id} value={val._id} className='peer-focus:font-medium p-3 absolute text-sm text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
                                        {val.name}
                                    </option>
                                )
                            })
                        }
                    </select>
                    <div class="grid md:grid-cols-2 md:gap-6">

                        {/* <div class="relative z-0 w-full mb-5 group">
                            <input type="text" name="percentage" id="percentage" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={formData.percentage} onChange={handleInputChange} required />
                            <label for="percentage" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Percentage(ટકાવારી)</label>
                        </div> */}
                    </div>
                    <div class="grid md:grid-cols-2 md:gap-6">
                        <div class="relative z-0 w-full mb-5 group">
                            <input type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" id="brokerage" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " name="brokerage" value={formData.brokerage} readOnly />
                            <label for="brokerage" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Brokerage(દલાલી)</label>
                        </div>
                        <div class="relative z-0 w-full mb-5 group">
                            <input type="text" name="amountAfterBrokerage" id="amountAfterBrokerage" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={formData.amountAfterBrokerage} readOnly />
                            <label for="amountAfterBrokblack" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Amount After Brokerage</label>
                        </div>
                    </div>
                    <div class="relative z-0 w-full mb-5 group">
                        <input type="number" name="final ampount" id="final ampount" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={formData.diamondPayment} onChange={handleInputChange} readOnly />
                        <label for="final ampount" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Total Payment</label>
                    </div>
                    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800" style={{backgroundColor:selectedColor}}>Submit</button>
                </form>

            </div>
        </>
    )
}

export default AddEntryincome
