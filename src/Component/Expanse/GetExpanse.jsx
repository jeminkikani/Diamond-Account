import React, { useEffect, useState } from 'react'
import { Dialog } from 'primereact/dialog';
import Swal from 'sweetalert2'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const GetExpanse = ({selectedColor}) => {
  const [expanse, setExpanse] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const brokersPerPage = 8; // Number of brokers to display per page
  const [visible, setVisible] = useState(false);
  const [selectedBroker, setSelectedBroker] = useState({ name: '', mobile_no: '', _id: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExpanse, setSelectedExpanse] = useState(null); // Track selected expanse for editing


  useEffect(() => {
    getExpanse();
  }, []);

  const getExpanse = () => {
    axios
      .get('https://diamond-be.onrender.com/api/v1/expense/get-expense')
      .then((res) => {
        setExpanse(res.data.data);
      });
  };

  const filteredBrokers = expanse.filter((b) =>
    (b.description && b.description.toLowerCase().includes(searchTerm)) ||
    (b.amount && b.amount.toString().includes(searchTerm))
  );

  const indexOfLastExpanse = currentPage * brokersPerPage;
  const indexOfFirstExpanse = indexOfLastExpanse - brokersPerPage;
  const currentExpanse = filteredBrokers.slice(indexOfFirstExpanse, indexOfLastExpanse);

  // Calculate total pages
  const totalPages = Math.ceil(filteredBrokers.length / brokersPerPage);


  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handle Next and Previous
  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // const openUpdateDialog = (broker) => {
  //   setSelectedBroker(broker);  // Set the selected broker data
  //   setVisible(true);
  // };

  const deleteExpanse = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://diamond-be.onrender.com/api/v1/expense/delete-expense/${id}`)
          .then((res) => {

            if (res.status === 200 || res.status === 201) {
              toast.success("Expanse Delete Successfully")
            }
            // Update the broker list by removing the deleted broker
            setExpanse(expanse.filter((item) => item.id !== id));
            getExpanse()
          })
          .catch((error) => {
            console.error("Error deleting broker:", error);
          });

        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });

  }

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedExpanse({ ...selectedExpanse, [name]: value });
  };

  const saveExpanse = () => {
    axios
      .put(`https://diamond-be.onrender.com/api/v1/expense/update-expense/${selectedExpanse._id}`, selectedExpanse)
      .then((res) => {
        toast.success('Expanse updated successfully!');
        setVisible(false); // Close dialog
        getExpanse(); // Refresh data
      })
      .catch((error) => {
        toast.error('Error updating expanse');
        console.error(error);
      });
  };


  return (
    <div>
      <ToastContainer position="top-right" />

      <Dialog
        header="Edit Expanse"
        visible={visible}
        onHide={() => setVisible(false)}
        style={{ width: '50vw' }}
        footer={
          <div>
            <button onClick={saveExpanse} className="bg-red-500 hover:bg-red-800 text-white px-4 py-2 rounded-lg mr-3" style={{backgroundColor:selectedColor}}>Save</button>
            <button onClick={() => setVisible(false)} className="bg-gray-300 px-4 py-2 rounded-lg">Cancel</button>
          </div>
        }
      >
        {selectedExpanse && (
          <div className="flex flex-col space-y-4">
            <label>
              Description:
              <input
                type="text"
                name="description"
                value={selectedExpanse.description}
                onChange={handleEditInputChange}
                className="block w-full px-4 py-2 mt-1 border rounded-lg"
              />
            </label>
            <label>
              Amount:
              <input
                type="number"
                name="amount"
                value={selectedExpanse.amount}
                onChange={handleEditInputChange}
                className="block w-full px-4 py-2 mt-1 border rounded-lg"
              />
            </label>
          </div>
        )}
      </Dialog>
      <div className="flex flex-col px-14 pt-5 ml-[250px] mt-24">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="border rounded-lg divide-y divide-gray-200 dark:border-neutral-500 dark:divide-neutral-500">
              <div className="py-3 px-4">
                <div className="relative max-w-xs">
                  <label className="sr-only">Search</label>
                  <input
                    type="text"
                    name="hs-table-with-pagination-search"
                    id="hs-table-with-pagination-search"
                    className="py-2 px-3 ps-9 block w-full  shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border border-grey dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    placeholder="Search for items"
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-3">
                    <svg className="size-4 text-gray-400 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8"></circle>
                      <path d="m21 21-4.3-4.3"></path>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                  <thead className="bg-red-500">
                    <tr className='bg-red-500' style={{backgroundColor:selectedColor}}>
                      <th scope="col" className="px-6 py-3 text-start text-xs font-bold text-white uppercase dark:text-white ">Date(તારીખ)</th>
                      <th scope="col" className="px-6 py-3 text-start text-xs font-bold text-white uppercase dark:text-white">Description (વર્ણન)</th>
                      <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-white uppercase dark:text-white">Payment(ચૂકવણી)</th>
                      <th scope="col" className="px-6 py-3 text-end text-xs font-medium text-white uppercase dark:text-white">Action</th>

                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                    {currentExpanse.map((val, index) => (
                      <tr key={index}>
                        <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-500"'>{new Date(val.purchase_Date).toLocaleDateString('en-GB')}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-500">{val.description}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-500">{val.amount}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                          <button
                            type="button"
                            className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-none focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:text-blue-400"
                            onClick={() => deleteExpanse(val._id)}                 >
                            <span className="pi pi-trash mr-3" ></span>
                          </button>

                          <button
                            type="button"
                            className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-none focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:text-blue-400"
                            onClick={() => {
                              setSelectedExpanse(val);
                              setVisible(true);
                            }}                    >
                            <span className="pi pi-pen-to-square"></span>
                          </button>


                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="py-1 px-4">
  <nav className="flex items-center space-x-1" aria-label="Pagination">
    <button 
      onClick={handlePrevious} 
      disabled={currentPage === 1} 
      className="p-2.5 min-w-[40px] inline-flex justify-center items-center gap-x-2 text-sm rounded-full text-gray-800 dark:hover:bg-neutral-700 dark:hover:text-white dark:focus:bg-neutral-700" 
      aria-label="Previous"
    >
      «
    </button>
    
    {(() => {
      const pageRange = 5;
      let startPage = Math.max(1, currentPage - Math.floor(pageRange / 2));
      let endPage = Math.min(totalPages, startPage + pageRange - 1);

      if (endPage - startPage < pageRange - 1) {
        startPage = Math.max(1, endPage - pageRange + 1);
      }

      return Array.from({ length: endPage - startPage + 1 }, (_, i) => (
        <button 
          key={startPage + i} 
          onClick={() => handlePageChange(startPage + i)} 
          style={{backgroundColor: currentPage === startPage + i ? selectedColor : 'white'}}
          className={`min-w-[40px] flex justify-center items-center text-black py-2.5 text-sm rounded-full ${currentPage === startPage + i ? 'bg-red-600 text-white' : 'hover:text-black focus:bg-red-900 hover:bg-red-900'}`}
        >
          {startPage + i}
        </button>
      ));
    })()}
    
    <button 
      onClick={handleNext} 
      disabled={currentPage === totalPages} 
      className="p-2.5 min-w-[40px] inline-flex justify-center items-center gap-x-2 text-sm rounded-full text-gray-800 dark:hover:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700" 
      aria-label="Next"
    >
      »
    </button>
  </nav>
</div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GetExpanse
