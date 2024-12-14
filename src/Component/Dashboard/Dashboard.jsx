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

  const calculateNetAmount = () => {
    if (total && total.diamonds) {
      const incoming = total.diamonds.find((d) => d.type === "incoming")?.totalPayment || 0;
      const outgoing = total.diamonds.find((d) => d.type === "outgoing")?.totalPayment || 0;
      const expense = total.totalExpense
      return incoming - outgoing - expense;
    }
    return 0;
  };
  

  return (
    <>

      <div className="flex bg-gray-50">
        <div className="relative ml-[220px] flex-wrap mt-14 w-full flex min-h-[80vh] justify-around overflow-hidden bg-gray-50 p-6 sm:p-12">

          {/* Total Incoming */}
          <div className="group overflow-hidden relative h-[230px] w-[350px] cursor-pointer bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:rounded-lg">
            <span className="absolute top-10 z-0 h-20 w-20 rounded-full bg-red-500 transition-all duration-300 group-hover:scale-[10]"></span>
            <div className="relative z-10">
              <div className="flex items-center border-b-[1px] border-[#e2e2e2] pb-3">
                <span className="grid h-20 w-20 place-items-center rounded-full bg-red-500 transition-all duration-300 group-hover:bg-red-400">
                  <i className="pi pi-arrow-down text-white text-3xl"></i>
                </span>
                <p className="ml-2 text-2xl font-semibold leading-[2.75rem] text-gray-600 transition-all duration-300 group-hover:text-white/90">
                  Total Incoming
                </p>
              </div>
              <div className="pt-5 text-center text-3xl font-bold text-gray-600 transition-all duration-300 group-hover:text-white/90">
                {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(total.diamonds && total.diamonds[0] ? total.diamonds[0].totalPayment : 0)}
              </div>
            </div>
          </div>

          {/* Total Outgoing */}
          <div className="group overflow-hidden relative h-[230px] w-[350px] cursor-pointer bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:rounded-lg">
            <span className="absolute top-10 z-0 h-20 w-20 rounded-full bg-red-500 transition-all duration-300 group-hover:scale-[10]"></span>
            <div className="relative z-10">
              <div className="flex items-center border-b-[1px] border-[#e2e2e2] pb-3">
                <span className="grid h-20 w-20 place-items-center rounded-full bg-red-500 transition-all duration-300 group-hover:bg-red-400">
                  <i className="pi pi-arrow-up text-white text-3xl"></i>
                </span>
                <p className="ml-2 text-2xl font-semibold leading-[2.75rem] text-gray-600 transition-all duration-300 group-hover:text-white/90">
                  Total Outgoing
                </p>
              </div>
              <div className="pt-5 text-center text-3xl font-bold text-gray-600 transition-all duration-300 group-hover:text-white/90">
                {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(total.diamonds && total.diamonds[1] ? total.diamonds[1].totalPayment : 0)}
              </div>
            </div>
          </div>

          {/* Profit */}
          <div className="group overflow-hidden relative h-[230px] w-[350px] cursor-pointer bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:rounded-lg">
            <span className="absolute top-10 z-0 h-20 w-20 rounded-full bg-red-500 transition-all duration-300 group-hover:scale-[10]"></span>
            <div className="relative z-10">
              <div className="flex items-center border-b-[1px] border-[#e2e2e2] pb-3">
                <span className="grid h-20 w-20 place-items-center rounded-full bg-red-500 transition-all duration-300 group-hover:bg-red-400">
                  <i className="pi pi-chart-line text-white text-3xl"></i>
                </span>
                <p className="ml-2 text-2xl font-semibold leading-[2.75rem] text-gray-600 transition-all duration-300 group-hover:text-white/90">
                  Profit
                </p>
              </div>
              <div className="pt-5 text-center text-3xl font-bold text-gray-600 transition-all duration-300 group-hover:text-white/90">
                {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(calculateNetAmount())}
              </div>
            </div>
          </div>

          {/* Total Expense */}
          <div className="group overflow-hidden relative h-[230px] w-[350px] cursor-pointer bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:rounded-lg">
            <span className="absolute top-10 z-0 h-20 w-20 rounded-full bg-red-500 transition-all duration-300 group-hover:scale-[10]"></span>
            <div className="relative z-10">
              <div className="flex items-center border-b-[1px] border-[#e2e2e2] pb-3">
                <span className="grid h-20 w-20 place-items-center rounded-full bg-red-500 transition-all duration-300 group-hover:bg-red-400">
                  <i className="pi pi-wallet text-white text-3xl"></i>
                </span>
                <p className="ml-2 text-2xl font-semibold leading-[2.75rem] text-gray-600 transition-all duration-300 group-hover:text-white/90">
                  Total Expense
                </p>
              </div>
              <div className="pt-5 text-center text-3xl font-bold text-gray-600 transition-all duration-300 group-hover:text-white/90">
                {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(total.totalExpense)}
              </div>
            </div>
          </div>

          {/* income Brokerage */}
          <div className="group overflow-hidden relative h-[230px] w-[350px] cursor-pointer bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:rounded-lg">
            <span className="absolute top-10 z-0 h-20 w-20 rounded-full bg-red-500 transition-all duration-300 group-hover:scale-[10]"></span>
            <div className="relative z-10">
              <div className="flex items-center border-b-[1px] border-[#e2e2e2] pb-3">
                <span className="grid h-20 w-20 place-items-center rounded-full bg-red-500 transition-all duration-300 group-hover:bg-red-400">
                  <i className="pi pi-briefcase text-white text-3xl"></i>
                </span>
                <p className="ml-2 text-2xl font-semibold leading-[2.75rem] text-gray-600 transition-all duration-300 group-hover:text-white/90">
                  Incoming Brokerage
                </p>
              </div>
              <div className="pt-5 text-center text-3xl font-bold text-gray-600 transition-all duration-300 group-hover:text-white/90">
                {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(total.diamonds && total?.diamonds[0]?.totalBrokerage ||0)}
              </div>
            </div>
          </div>

          {/* outgoing brokerage */}
          <div className="group overflow-hidden relative h-[230px] w-[350px] cursor-pointer bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:rounded-lg">
            <span className="absolute top-10 z-0 h-20 w-20 rounded-full bg-red-500 transition-all duration-300 group-hover:scale-[10]"></span>
            <div className="relative z-10">
              <div className="flex items-center border-b-[1px] border-[#e2e2e2] pb-3">
                <span className="grid h-20 w-20 place-items-center rounded-full bg-red-500 transition-all duration-300 group-hover:bg-red-400">
                  <i className="pi pi-briefcase text-white text-3xl"></i>
                </span>
                <p className="ml-2 text-2xl font-semibold leading-[2.75rem] text-gray-600 transition-all duration-300 group-hover:text-white/90">
                  Outgoing Brokerage
                </p>
              </div>
              <div className="pt-5 text-center text-3xl font-bold text-gray-600 transition-all duration-300 group-hover:text-white/90">
                {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(total.diamonds &&  total?.diamonds[1]?.totalBrokerage ||0)}
              </div>
            </div>
          </div>

        </div>
      </div>

    </>
  )
}

export default Dashboard
