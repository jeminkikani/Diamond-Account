import axios from 'axios';
import { Calendar } from 'primereact/calendar';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';

const ShowEntryOutgoing = ({selectedColor}) => {



  const [diamondEntry, setDiamondEntry] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const brokersPerPage = 8;
  const [showModal, setShowModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [dateRange, setDateRange] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    ShowEntry();
  }, [dateRange]);

  const ShowEntry = () => {
    axios
      .get('https://diamond-be.onrender.com/api/v1/daimond/get-diamond?entryType=outgoing')
      .then((res) => {
        const entries = res.data.data;

        const filteredEntries = dateRange
          ? entries.filter((entry) => {
            const entryDate = new Date(entry.date);
            return (
              entryDate >= dateRange[0] &&
              entryDate <= dateRange[1]
            );
          })
          : entries;

        setDiamondEntry(filteredEntries);
      });
  };

  const indexOfLastBroker = currentPage * brokersPerPage;
  const indexOfFirstBroker = indexOfLastBroker - brokersPerPage;
  const currentBrokers = diamondEntry.slice(indexOfFirstBroker, indexOfLastBroker);
  const totalPages = Math.ceil(diamondEntry.length / brokersPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
  const handleNext = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
  const handlePrevious = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  const openModal = (row) => {
    setSelectedRow(row);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedRow(null);
  };

  const deleteEntry = (id) => {
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
          .delete(`https://diamond-be.onrender.com/api/v1/daimond/delete-diamond/${id}`)
          .then(() => {
            setDiamondEntry(diamondEntry.filter((entry) => entry._id !== id));
          })
          .catch((error) => {
            console.error("There was an error deleting the entry!", error);
          });

        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  const handleInputChange = (e, field) => {
    const { name, value } = e.target;
    setSelectedRow({
      ...selectedRow,
      [field]: value,
    });

    if (name === 'weight' || name === 'price') {
      calculateTotalPayment(name, value);
    }

    if (name === 'diamondPaymentPercentage' || name === 'percentage') {
      calculateBrokerage(value);
    }
  };

  const calculateTotalPayment = (fieldName, fieldValue) => {
    const weight = fieldName === 'weight' ? parseFloat(fieldValue) || 0 : parseFloat(selectedRow.weight) || 0;
    const price = fieldName === 'price' ? parseFloat(fieldValue) || 0 : parseFloat(selectedRow.price) || 0;
    const totalPayment = Math.floor(weight * price);
    setSelectedRow(prev => ({ ...prev, totalPayment }));
  };

  const calculateBrokerage = (percentageValue) => {
    const totalPayment = parseFloat(selectedRow.totalPayment) || 0;
    const brokeragePercentage = parseFloat(percentageValue) || 0;
    const brokerageAmount = Math.floor((totalPayment * brokeragePercentage) / 100);
    const amountAfterBrokerage = totalPayment - brokerageAmount;
    
    // Static 1% deduction after brokerage
    const staticFee = Math.floor(amountAfterBrokerage * 0.01);
    const finalAmount = amountAfterBrokerage - staticFee;

    setSelectedRow(prev => ({
      ...prev,
      brokerage: brokerageAmount,
      amountAfterBrokerage: finalAmount,
    }));
  };


  const updateData = (id) => {
    const updatedData = {
      ...selectedRow,
      totalPayment: selectedRow.totalPayment,
      brokerage: selectedRow.brokerage,
      amountAfterBrokerage: selectedRow.amountAfterBrokerage,
    };

    axios
      .put(`https://diamond-be.onrender.com/api/v1/daimond/update-diamond/${id}`, updatedData)
      .then((response) => {
        Swal.fire('Updated!', 'The entry has been updated successfully.', 'success');
        ShowEntry()
        closeModal();
      })
      .catch((error) => {
        Swal.fire('Error!', 'There was an issue updating the entry.', 'error');
        console.error('Error updating entry:', error);
      });
    }

  return (
    <div>
      <div className="flex flex-col px-14 pt-5 ml-[250px] mt-24">
      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="border rounded-lg divide-y divide-gray-200 dark:border-neutral-700 dark:divide-neutral-700">
            <div className="py-3 px-4">
              <div className="relative max-w-[40rem] flex">
                <label className="sr-only">Search</label>
                {/* <input
                  type="text"
                  name="hs-table-with-pagination-search"
                  id="hs-table-with-pagination-search"
                  className="py-2 mr-3 px-3 ps-9 block w-full shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border border-grey dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  placeholder="Search for items"
                  onChange={(e) => setSearchTerm(e.target.value)}
                /> */}
                <Calendar
                  selectionMode="range"
                  value={dateRange}
                  onChange={(e) => setDateRange(e.value)}
                  placeholder="Select Date Range"
                  className="border-2 w-1/2 rounded-md py-2 px-3"
                  showButtonBar
                  numberOfMonths={2}
                />
              </div>
            </div>
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                <thead className="bg-gray-50">
                  <tr className="bg-red-500 text-white" style={{backgroundColor:selectedColor}}>
                    <th scope="col" className="px-2 py-3 text-start text-xs font-medium text-white uppercase dark:text-neutral-100">Date(તારીખ)</th>
                    <th scope="col" className="py-3 text-start text-xs font-medium text-white uppercase dark:text-neutral-100">Party Name(પાર્ટીનું નામ)</th>
                    <th scope="col" className="py-3 text-start text-xs font-medium text-white uppercase dark:text-neutral-100">Broker Name(દલાલનું નામ)</th>
                    {/* <th scope="col" className="py-3 text-start text-xs font-medium text-white uppercase dark:text-neutral-100">Payment(ચુકવણીની તારીખ)</th> */}
                    <th scope="col" className="py-3 text-start text-xs font-medium text-white uppercase dark:text-neutral-100">Amount After Brokerage</th>
                    <th scope="col" className="py-3 text-start text-xs font-medium text-white uppercase dark:text-neutral-100">More</th>
                  </tr>
                </thead>
                {
                  diamondEntry.length ? <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                    {currentBrokers.map((ele, index) => (
                      <tr key={index}>
                        <td className="px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-500">
                          {new Date(ele.date).toLocaleDateString('en-GB', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit'
                          })}
                        </td>
                        <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-500">{ele.partyName}</td>
                        <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-500">{ele.brokerName ?ele.brokerName.name : ele.brokerName}</td>
                        {/* <td className="px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-500">
                          {new Date(ele.paymentDate).toLocaleDateString('en-GB', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit'
                          })}
                        </td> */}
                        <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-500">{ele.amountAfterBrokerage}</td>
                        <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-500">
                          <button onClick={() => openModal(ele)} className="text-blue-600 hover:text-blue-800"><i className="pi pi-list mr-3"></i></button>
                          <button className="text-blue-600 hover:text-blue-800" onClick={() => deleteEntry(ele._id)}><i className="pi pi-trash mr-3"></i></button>
                          {/* <button className="text-blue-600 hover:text-blue-800"><i className="pi pi-pen-to-square"></i></button> */}
                        </td>
                      </tr>
                    ))}
                  </tbody> : <div>
                    <h1 className='w-full p-5 font-bold'>

                      No Record Find <i class="pi pi-fa-circle-xmark"></i>
                    </h1>
                  </div>
                }

              </table>
            </div>
            <div className="py-1 px-4">
              <nav className="flex items-center space-x-1" aria-label="Pagination">
                <button onClick={handlePrevious} disabled={currentPage === 1} className="p-2.5 min-w-[40px] inline-flex justify-center items-center gap-x-2 text-sm rounded-full text-gray-800 dark:hover:bg-neutral-700 dark:hover:text-white dark:focus:bg-neutral-700" aria-label="Previous">
                  «
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button style={{backgroundColor: currentPage === i + 1 ? selectedColor : 'white'}}
                    key={i + 1}
                    onClick={() => handlePageChange(i + 1)}
                    className={`min-w-[40px] flex justify-center items-center text-black py-2.5 text-sm rounded-full ${currentPage === i + 1 ? 'bg-red-600 text-white' : 'hover:text-black focus:bg-red-900 hover:bg-red-900'}`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button onClick={handleNext} disabled={currentPage === totalPages} className="p-2.5 min-w-[40px] inline-flex justify-center items-center gap-x-2 text-sm rounded-full text-gray-800 dark:hover:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700" aria-label="Next">
                  »
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
      {showModal && selectedRow && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white dark:bg-white p-6 rounded-lg max-w-lg w-full">
            <h2 className="text-lg font-semibold mb-4 bg-red-500 text-center uppercase p-2 rounded-lg text-white" style={{ backgroundColor: selectedColor }}>
              {selectedRow.partyName} Details
            </h2>
            <div>
              <label className='block'>Weight</label>
              <input name='weight'
                className="text-sm border border-gray-600 p-[10px]  rounded-lg w-full mt-2 text-gray-700 dark:text-gray-600"
                value={selectedRow.weight}
                onChange={(e) => handleInputChange(e, 'weight')}
              />
            </div>
            <div>
              <label className='block'>Price</label>
              <input name='price'
                className="text-sm border border-gray-600 p-[10px] rounded-lg w-full mt-2 text-gray-700 dark:text-gray-600"
                value={selectedRow.price}
                onChange={(e) => handleInputChange(e, 'price')}
              />
            </div>
            <div>
              <label className='block'>Total Payment</label>
              <input name='totalPayment'
                className="text-sm border border-gray-600 p-[10px] rounded-lg w-full mt-2 text-gray-700 dark:text-gray-600"
                value={selectedRow.totalPayment}
                readOnly
              />
            </div>
            <div>
              <label className='block'>Percentage</label>
              <input name='diamondPaymentPercentage'
                className="text-sm border border-gray-600 p-[10px] rounded-lg w-full mt-2 text-gray-700 dark:text-gray-600"
                value={selectedRow.diamondPaymentPercentage}
                onChange={(e) => handleInputChange(e, 'diamondPaymentPercentage')}
              />
            </div>
            <div>
              <label className='block'>Brokerage</label>
              <input name='brokerage'
                className="text-sm border border-gray-600 p-[10px] rounded-lg w-full mt-2 text-gray-700 dark:text-gray-600"
                value={selectedRow.brokerage}
                onChange={(e) => handleInputChange(e, 'brokerage')}
              />
            </div>
            <div>
              <label className='block'>Amount After Brokerage</label>
              <input name='amountAfterBrokerage'
                className="text-sm border border-gray-600 p-[10px] rounded-lg w-full mt-2 text-gray-700 dark:text-gray-600"
                value={selectedRow.amountAfterBrokerage}
                readOnly
              />
            </div>
            <button
              style={{ backgroundColor: selectedColor }}
              onClick={closeModal}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-300"
            >
              Close
            </button>
            <button
              onClick={() => updateData(selectedRow._id)}
              className="mt-4 ml-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-300"
            >
              Update
            </button>
          </div>
        </div>
      )}
    </div>
    </div>
  )
}

export default ShowEntryOutgoing
