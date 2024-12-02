import React, { useRef, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddBroker = () => {
  const [formData, setFormData] = useState({ name: '', mobile_no: '' });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.mobile_no.length !== 10) {
      toast.error("Mobile number must be 10 digits")
      // alert("Mobile number must be 10 digits.");
      // return;
    }
    try {
      axios.post('https://diamond-be.onrender.com/api/v1/broker/add-broker', formData)
        .then((res) => {
          if (res == 200 || 201) {
            toast.success("Data Added Successfully")
          }
          console.log(res,"res");
          
          // alert('Broker added successfully!');
          setFormData({ name: '', mobile_no: '' });
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

  // const toast = useRef(null);

  // const showSuccess = () => {
  //   toast.current.show({ severity: 'success', summary: 'Success', detail: 'Redord Added', life: 3000 });
  // }
  return (
    <>
      <ToastContainer position="top-right" />

      <form className="max-w-md mx-auto mt-28 ml-[650px] p-5 border rounded" onSubmit={handleSubmit}>
        <h1 className="text-xl mb-3">Add Broker (દલાલ ઉમેરો)</h1>

        <div className='relative z-0 w-full mb-5 group'>
          <input
            type="text"
            name="name"
            placeholder=" "
            required
            value={formData.name}
            onChange={handleChange}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"

          />
          <label for="floating_password" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Broker Name(દલાલનું નામ)</label>
        </div>

        <div className='relative z-0 w-full mb-5 group'>
          <input
            type="number"
            placeholder=" "
            name="mobile_no"
            value={formData.mobile_no}
            required
            onChange={handleChange}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          />
          <label for="floating_password" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Mobile No (મોબાઇલ નં)</label>
        </div>

        <button type="submit" className="w-full p-2 bg-red-600 hover:bg-red-500 text-white rounded">
          Submit
        </button>
      </form>


    </>
  );
};

export default AddBroker;
