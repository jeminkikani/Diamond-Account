import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import DiamondForm from './Component/Diamond Form/DiamondForm';
import Navbar from './Component/Navbar/Navbar';
import ShowEntry from './Component/Entry/ShowEntry';
import AddBroker from './Component/AddBroker/AddBroker';
import GetBroker from './GetBroker/GetBroker';
import { ProgressSpinner } from 'primereact/progressspinner';
import { useState, useEffect } from 'react';
import Dashboard from './Component/Dashboard/Dashboard';
import Login from './Component/Login/Login';
import AddExpanse from './Component/Expanse/AddExpanse';
import GetExpanse from './Component/Expanse/GetExpanse';

function App() {
  const [loading, setLoading] = useState(false);
  const [first, setFirst] = useState(sessionStorage.getItem("data") || "");

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
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
              <Route path="/addEntry" element={<DiamondForm />} /> 
              <Route path="/showEntry" element={<ShowEntry />} />
              <Route path="/addbroker" element={<AddBroker />} />
              <Route path="/getbroker" element={<GetBroker />} />
              <Route path='/addexpanse' element={<AddExpanse />} />
              <Route path='/getexpanse' element={<GetExpanse />} />
            </Routes>
          )}
        </>
      )}
    </>
  );
}

export default App;
