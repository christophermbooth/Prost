import React, {useState, useEffect} from 'react';
import LandingPage from './components/LandingPage.jsx';
import CustomerView from './components/Customer/CustomerView.jsx';
import OwnerView from './components/Owner/OwnerView.jsx';

function App() {

  const [value, setViewValue] = useState('');
  const handleChange = (event, newValue) => {
    setViewValue(newValue);
  };

  useEffect(() => {
    if(localStorage.token) {
      handleChange(null, 'CustomerView');
    }else{
      handleChange(null, 'Landing')
    }
  }, [])

    if (value === 'Landing') {
      return <LandingPage setViewValue={setViewValue}/>
    } else if (value === 'CustomerView') {
      return <CustomerView setViewValue={setViewValue} />
    } else if (value === 'OwnerView') {
      return <OwnerView />
    } else {
      return (
        <div>
           <LandingPage setViewValue={setViewValue}/>
        </div>
      )
    }
}

export default App
