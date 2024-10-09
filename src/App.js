
import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom"

import Home from './Components/Home';

import FilterPage from './Components/FilterPage';
import DetailsPage from './Components/DetailsPage';
import Success from './Components/Success';
import Header from './Components/Header';


function App() {
  return (
   <>
   <BrowserRouter>
   <Header/>
    <Routes>
      <Route exact path='/' element={<Home/>}/>
      <Route  path='/filter' element={<FilterPage/>}/>
      <Route  path='/details' element={<DetailsPage/>}/>
     
    </Routes>
   </BrowserRouter>
   </>
  );
}

export default App;
