import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Wallpaper from '../Components/Wallpaper';
import Mealtypes from '../Components/Mealtypes';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [locations, setLocations] = useState([]);
  const [mealtypes,setMealtypes]=useState([])
 
  const navigate = useNavigate();

  

  useEffect(() => {
    sessionStorage.clear()
    
    axios.get('https://foodify-restro-backend.onrender.com/api/locations')
      .then((res) => {
       console.log("***************",res.data); // Log the response data
        setLocations(res.data) 
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((err) => {
        console.error('Error fetching data:', err);
         // Update error state with a meaningful message
        setLoading(false); // Set loading to false on error
      });
  }, []);

  

  useEffect(() => {
    axios.get(`https://foodify-restro-backend.onrender.com/api/mealtypes`)
      .then((res) => {
       console.log(res.data); // Log the response data
        setMealtypes(res.data)
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((err) => {
        console.error('Error fetching data:', err);
        // Update error state with a meaningful message
        setLoading(false); // Set loading to false on error
      });
  }, []);
  

  return (
    <div>
      <Wallpaper locations={locations} />
      <Mealtypes  mealtypes={mealtypes}/>
      {loading && <p>Loading...</p>}
      
    </div>
  );
};

export default Home;
