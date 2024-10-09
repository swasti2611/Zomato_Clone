import React, { useState } from 'react'
import "../Style/home.css"

const Wallpaper = ({locations}) => {
    
    function handleLocationChange(event){
        let LocId=event.target.value
        sessionStorage.setItem("locationId",LocId)
    }
  return (
    <div>
         <div className="container-fluid back-img">
          
    <div className="row pt-4 mx-auto text-center logo-row">                
        <div className="col-12">
            <p className="px-4 py-3 px-md-4 py-md-2 logo">Ff</p>
        </div>  
    </div>
    <div className="row pt-4 mx-auto text-center restaurant-title-row">
        <div className="col-12">
            <p className="restaurant-title" >Find the best restaurants, cafés, and bars</p>
        </div>
    </div>
        
    <div className="row pt-4 mx-auto text-center search-bar-row">
        <div className="col-12 col-sm-12 col-md-1 col-lg-2 col-xl-2">
           
        </div>
        <div className="col-12 col-sm-12 col-md-4 col-lg-3 col-xl-3 mb-4">
            <div className="locationSelector">
                <select className="locationDropdown px-2 py-3" onChange={(e)=>{handleLocationChange(e)}}>
                    <option value="0" selected disabled>Please type a location</option>
                    {locations.map((item,index)=>
                        (
                            <option key={item.location_id} value={item.location_id}>{item.name}</option>
                        )
                    )}
                    
                </select>
            </div>
        </div>
        <div className="col-12 col-sm-12 col-md-6 col-lg-5 col-xl-5">
            <div className="restaurantSelector">
                <input className="restaurantsinput ps-5 py-3" type="text" placeholder="Search for restaurants" />
                <div className="search-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search "
                        viewBox="0 0 16 16">
                        <path
                            d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                    </svg>
                </div>
            </div>
        </div>
        <div className="col-12 col-sm-12 col-md-1 col-lg-2 col-xl-2"></div>
    </div>
</div>
    </div>
   
  )
}

export default Wallpaper
