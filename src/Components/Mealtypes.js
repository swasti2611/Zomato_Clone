import React, { useEffect,useState } from "react";
import "../Style/home.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Mealtypes = ({ mealtypes }) => {
  const [userdata, setUserdata] = useState({});
let navigate=useNavigate()
 function handleNavigate(mealtypeId){
 

 

  let locationId=sessionStorage.getItem("locationId")
        console.log( "sesssion storage",  locationId);
        if(locationId){
          navigate(`/filter?mealtype=${mealtypeId}&location=${locationId}`)
        }else{
 navigate(`/filter?mealtype=${mealtypeId}`)
        }
      
 }
 
 

  return (
    <div className="container mb-5">
      <div className="quick-searches mt-5 ms-4">Quick Searches</div>
      <div className="qs-subtitle mt-3 ms-4">
        Discover restaurants by type of meal
      </div>

      
      <div className="row mt-3">
      {mealtypes.map((item, index) => (
        <div key={index} onClick={()=>{handleNavigate(item.meal_type)}} className="card col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4 col-xxl-4 my-3 mx-auto text-center">
         
            <div className="row">
              <div className="col-6 px-0 mx-0">
                <img src={`./${item.image}`}  alt=" hhh" className="card-img" />
              </div>
              <div className="col-6 px-3 py-3">
                <div className="card-title">{item.name}</div>
                <div className="card-description">{item.content}</div>
              </div>
            </div>
            </div>
          ))}
       
      </div>
    </div>
  );
};

export default Mealtypes;
