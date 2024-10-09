import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './Components/Home';
import FilterPage from './Components/FilterPage';
import DetailsPage from './Components/DetailsPage';
import Header from './Components/Header';
import Login from './Components/Login';
import Success from './Components/Success'; // Ensure you include this if you plan to use it.

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/filter' element={<FilterPage />} />
        <Route path='/details' element={<DetailsPage />} />
        <Route path='/success' element={<Success />} /> {/* Ensure Success route is included if used */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
