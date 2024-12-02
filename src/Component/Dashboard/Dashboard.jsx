import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Dashboard = () => {

  const [total, setTotal] = useState([]);

  useEffect(() => {
    getallvalue()
  }, [])


  const getallvalue = () => {
    axios
      .get('https://diamond-be.onrender.com/api/v1/user/total/dashboard')
      .then((res) => {
        setTotal(res.data.data);
      });
  }

  console.log(total.diamonds,"total");
  // console.log(total.diamonds[0],"total jhgf");
  
  return (
    <>

      <div className='flex bg-gray-50'>
        <div class="relative ml-[220px] flex-wrap mt-14 w-full flex min-h-screen justify-around overflow-hidden bg-gray-50 p-6 sm:p-12">
          <div
            class="group relative h-[210px] cursor-pointer overflow-hidden bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl  sm:max-w-sm sm:rounded-lg sm:px-10">
            <span class="absolute top-10 z-0 h-20 w-20 rounded-full bg-red-500 transition-all duration-300 group-hover:scale-[10]"></span>
            <div class="relative z-10 max-w-md">
              <div className='flex text-center  border-b-[1px] border-[#e2e2e2] pb-3'>
                <span class="grid h-20 w-20 place-items-center rounded-full bg-red-500 transition-all duration-300 group-hover:bg-red-400">
                  <i className="pi pi-wallet text-white text-3xl" ></i>
                </span>
                <p className=' ml-2 text-2xl font-semibold space-y-6 pt-5 leading-[2.75rem] text-gray-600 transition-all duration-300 group-hover:text-white/90'>
                  Total Payment
                </p>
              </div>
              <div
                class="space-y-6 pt-5 text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-white/90">
                <p className='text-3xl text-center'>
                  {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(total.totalPayment- total.totalExpense)}
                </p>              </div>
            </div>
            
          </div>

          {/* broker */}
          <div
            class="group mr-3 h-[210px] relative cursor-pointer overflow-hidden bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:max-w-sm sm:rounded-lg sm:px-10">
            <span class="absolute top-10 z-0 h-20 w-20 rounded-full bg-red-500 transition-all duration-300 group-hover:scale-[10]"></span>
            <div class="relative z-10 mx-auto max-w-md">
              <div className='flex text-center  border-b-[1px] border-[#e2e2e2] pb-3'>
                <span class="grid h-20 w-20 place-items-center rounded-full bg-red-500 transition-all duration-300 group-hover:bg-red-400">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-10 w-10 text-white transition-all">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 21v-6m6 6V9m6 12V3m6 18v-9M2.25 21.75h19.5M12 5.25c0-1.38 1.343-2.5 3-2.5s3 1.12 3 2.5-1.343 2.5-3 2.5-3-1.12-3-2.5zm.75 10.5h2.25m0 0h-2.25m0 0v3m0-3v-3" />
                  </svg>

                </span>
                <p className=' ml-2 text-2xl font-semibold space-y-6 pt-5 leading-[2.75rem] text-gray-600 transition-all duration-300 group-hover:text-white/90'>
                  Total Brokerage
                </p>
              </div>
              <div
                class="space-y-6 pt-5 text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-white/90">
                <p className='text-3xl text-center'>
                  {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(total.totalBrokerage)}
                </p>

              </div>
            </div>
          </div>


          {/* expense  */}
          <div
            class="group h-[210px] mr-3 relative cursor-pointer overflow-hidden bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl  sm:max-w-sm sm:rounded-lg sm:px-10">
            <span class="absolute top-10 z-0 h-20 w-20 rounded-full bg-red-500 transition-all duration-300 group-hover:scale-[10]"></span>
            <div class="relative z-10 max-w-md">
              <div className='flex text-center border-b-[1px] border-[#e2e2e2] pb-3'>
                <span class="grid h-20 w-20 place-items-center rounded-full bg-red-500 transition-all duration-300 group-hover:bg-red-400">
                  <i className="pi pi-receipt text-white text-3xl" ></i>

                </span>
                <p className=' ml-2 text-2xl font-semibold space-y-6 pt-5 leading-[2.75rem] text-gray-600 transition-all duration-300 group-hover:text-white/90'>
                  Total Expense
                </p>
              </div>
              <div
                class="space-y-6 pt-5 text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-white/90">
                <p className='text-3xl text-center'>
                  {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(total.totalExpense)}
                </p>
              </div>
            </div>
          </div>

          <div
            class="group relative h-[210px] cursor-pointer overflow-hidden bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl  sm:max-w-sm sm:rounded-lg sm:px-10">
            <span class="absolute top-10 z-0 h-20 w-20 rounded-full bg-red-500 transition-all duration-300 group-hover:scale-[10]"></span>
            <div class="relative z-10 max-w-md">
              <div className='flex text-center  border-b-[1px] border-[#e2e2e2] pb-3'>
                <span class="grid h-20 w-20 place-items-center rounded-full bg-red-500 transition-all duration-300 group-hover:bg-red-400">
                  <i className="pi pi-wallet text-white text-3xl" ></i>
                </span>
                <p className=' ml-2 text-2xl font-semibold space-y-6 pt-5 leading-[2.75rem] text-gray-600 transition-all duration-300 group-hover:text-white/90'>
                  Total Payment
                </p>
              </div>
              <div
                class="space-y-6 pt-5 text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-white/90">
                <p className='text-3xl text-center'>
                  {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(total.totalPayment- total.totalExpense)}
                </p>              </div>
            </div>
            
          </div>

          {/* <div
            class="group relative h-[210px] cursor-pointer overflow-hidden bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl  sm:max-w-sm sm:rounded-lg sm:px-10">
            <span class="absolute top-10 z-0 h-20 w-20 rounded-full bg-red-500 transition-all duration-300 group-hover:scale-[10]"></span>
            <div class="relative z-10 max-w-md">
              <div className='flex text-center  border-b-[1px] border-[#e2e2e2] pb-3'>
                <span class="grid h-20 w-20 place-items-center rounded-full bg-red-500 transition-all duration-300 group-hover:bg-red-400">
                  <i className="pi pi-wallet text-white text-3xl" ></i>
                </span>
                <p className=' ml-2 text-2xl font-semibold space-y-6 pt-5 leading-[2.75rem] text-gray-600 transition-all duration-300 group-hover:text-white/90'>
                  Profit
                </p>
              </div>
              <div
                class="space-y-6 pt-5 text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-white/90">
                <p className='text-3xl text-center'>
                  {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(total.diamonds[1].totalPayment-total.diamonds[1].totalPayment)}
                </p>              </div>
            </div>
            
          </div> */}
        </div>


        
      </div>

      <div>
        
      </div>
    </>
  )
}

export default Dashboard
