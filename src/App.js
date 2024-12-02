import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Navbar from './Component/Navbar/Navbar';

import { ProgressSpinner } from 'primereact/progressspinner';
import { useState, useEffect } from 'react';
import Dashboard from './Component/Dashboard/Dashboard';
import Login from './Component/Login/Login';
import AddExpanse from './Component/Expanse/AddExpanse';
import GetExpanse from './Component/Expanse/GetExpanse';
import AddEntryincome from './Component/Income/AddEntryincome';
import ShowEntryIncome from './Component/Income/ShowEntryincome';
import AddEntryOutgoing from './Component/Outgoing/AddEntryOutgoing';
import ShowEntryOutgoing from './Component/Outgoing/ShowEntryOutgoing';
import GetBroker from './Component/Broker/GetBroker';
import AddBroker from './Component/Broker/AddBroker';

function App() {
  const [loading, setLoading] = useState(false);
  const [first, setFirst] = useState(sessionStorage.getItem("data") || "");

  useEffect(() => {
    const checkLoading = async () => {
      setLoading(true);
      // Simulate loading only if necessary (e.g., check session or preload data)
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulated delay
      setLoading(false);
    };
  
    checkLoading();
  }, []);
  

  return (
    <>
      {first.length === 0 ? (
        <Login setFirst={setFirst} />
      ) : (
        <>
          <Navbar />
          {loading ? (
            <div className="loader-container mt-28 justify-center ml-[800px]">
              <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" animationDuration=".5s" />
            </div>
          ) : (
            <Routes>
              <Route path='/' element={<Dashboard />} />
              <Route path="/addEntryincome" element={<AddEntryincome />} /> 
              <Route path="/showEntryincome" element={<ShowEntryIncome />} />
              <Route path="/addbroker" element={<AddBroker />} />
              <Route path="/getbroker" element={<GetBroker />} />
              <Route path='/addexpanse' element={<AddExpanse />} />
              <Route path='/getexpanse' element={<GetExpanse />} />
              <Route path='/addEntryoutgoing' element={<AddEntryOutgoing />} />
              <Route path='/showEntryoutgoing' element={<ShowEntryOutgoing />} />

            </Routes>
          )}
        </>
      )}
    </>
  );
}

export default App;
