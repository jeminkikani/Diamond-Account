import React, { useState } from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const AddExpanse = () => {


  const [formData, setFormData] = useState({ name: '', mobile_no: '' });

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      axios.post('https://diamond-be.onrender.com/api/v1/expense/add-expense', formData)
        .then((res) => {
          if (res == 200 || 201) {
            toast.success("Expense Added Successfully")
          }
          // alert('Broker added successfully!');
          setFormData({ purchase_Date: '', description: '', amount: '' });
        })
        .catch((err) => {
          alert('Error adding broker: ' + (err.response ? err.response.data.message : err.message));
        });
    } catch (err) {
      toast.error(err)
    }

  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div>
      <ToastContainer position="top-right" />

      <form className="max-w-md mx-auto mt-28 ml-[650px] p-5 border rounded" onSubmit={handleSubmit}>
        <h1 className="text-xl mb-5">Add Expense (ખર્ચ ઉમેરો)</h1>

        <div className='relative z-0 w-full mb-5 group'>
          <input
            type="date"
            name="purchase_Date"
            placeholder=" "
            required
            value={formData.purchase_Date}
            onChange={handleChange}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"

          />
          <label for="floating_password" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Date(તારીખ)</label>
        </div>

        <div className='relative z-0 w-full mb-5 group'>
          <input
            type="text"
            placeholder=" "
            name="description"
            value={formData.description}
            required
            onChange={handleChange}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          />
          <label for="floating_password" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Expense(ખર્ચ)</label>
        </div>

        <div className='relative z-0 w-full mb-5 group'>
          <input
            type="number"
            placeholder=" "
            name="amount"
            value={formData.amount}
            required
            onChange={handleChange}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          />
          <label for="floating_password" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Amount(રકમ)</label>
        </div>

        <button type="submit" className="w-full p-2 bg-red-600 hover:bg-red-500 text-white rounded">
          Submit
        </button>
      </form>
    </div>
  )
}

export default AddExpanse
