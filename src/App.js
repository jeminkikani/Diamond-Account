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
  const [selectedColor, setSelectedColor] = useState('#ff0000'); //
  
  useEffect(() => {
    const checkLoading = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 2000)); 
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
        
          <Navbar selectedColor={selectedColor} setSelectedColor={setSelectedColor}/>
          {loading ? (
            <div className="loader-container mt-28 justify-center ml-[800px]">
              <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" animationDuration=".5s" />
            </div>
          ) : (
            <Routes>
              <Route path='/' element={<Dashboard selectedColor={selectedColor}/>} />
              <Route path="/addEntryincome" element={<AddEntryincome selectedColor={selectedColor}/>} /> 
              <Route path="/showEntryincome" element={<ShowEntryIncome selectedColor={selectedColor}/>} />
              <Route path="/addbroker" element={<AddBroker selectedColor={selectedColor}/>} />
              <Route path="/getbroker" element={<GetBroker selectedColor={selectedColor}/>} />
              <Route path='/addexpanse' element={<AddExpanse selectedColor={selectedColor}/>} />
              <Route path='/getexpanse' element={<GetExpanse selectedColor={selectedColor}/>} />
              <Route path='/addEntryoutgoing' element={<AddEntryOutgoing selectedColor={selectedColor}/>} />
              <Route path='/showEntryoutgoing' element={<ShowEntryOutgoing selectedColor={selectedColor}/>} />

            </Routes>
          )}
        </>
      )}
    </>
  );
}

export default App;
