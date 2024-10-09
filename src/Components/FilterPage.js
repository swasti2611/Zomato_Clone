import React, { useEffect, useState } from "react";
import "../Style/filter.css";
import { useNavigate, useLocation } from "react-router-dom";
import queryString from "query-string";
import axios from "axios";
const FilterPage = () => {
  const navigate = useNavigate();
  const uselocation = useLocation();
  const [loading, setLoading] = useState(true);
  const [locations, setLocations] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [cuisine, setCuisine] = useState([]);
  const[isCuisine,setIsCuisine]=useState(false)

  const [locationId, setLocationId] = useState(undefined);
  const [mealtypeId, setMealtypeId] = useState(undefined);
  const [pageId, setPageId] = useState(undefined);
 
  const [sortId, setSortId] = useState(undefined);
  const [lcost, setLcost] = useState(undefined);
  const [hcost, setHcost] = useState(undefined);




  useEffect(() => {
    axios
      .get("https://foodify-restro-backend.onrender.com/api/locations")
      .then((res) => {
        console.log(res.data); // Log the response data
        setLocations(res.data);
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setLoading(false); // Set loading to false on error
      });
  }, []);

 

  useEffect(() => {
    const qs = queryString.parse(uselocation.search);
    const { mealtype, location } = qs;

    console.log("location", typeof qs.location, qs.location);
    let filterobj = {};
    filterobj.mealtype = parseInt(qs.mealtype);
    filterobj.location = parseInt(qs.location);

    setMealtypeId(parseInt(mealtype));

    axios
      .post("https://foodify-restro-backend.onrender.com/api/filter", filterobj)
      .then((res) => {
        console.log(res.data);
        setRestaurants(res.data.restaurants);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [uselocation.search]);

  function handleChangeLocation(e) {
    let locId = e.target.value;

    let filterloc = {
      mealtype: mealtypeId,
      location: parseInt(locId),
      page: pageId,
      sort: sortId,
      lcost: lcost,
      hcost: hcost,
      cuisine
    };

   
    axios
      .post("https://foodify-restro-backend.onrender.com/api/filter", filterloc)
      .then((res) => {
        console.log(res.data);
        setRestaurants(res.data.restaurants);
        setLocationId(locId);
      })
      .catch((err) => {
        console.log(err);
      });

    navigate(`/filter?mealtype=${mealtypeId}&location=${locId}`);
  }



  function handleSortChange(sort) {
    let filterObj = {
      mealtype: mealtypeId,
      location: locationId,
      sort: sort,
      lcost,
      hcost,
      page: pageId,
      cuisine
    }
    
    axios
      .post("https://foodify-restro-backend.onrender.com/api/filter", filterObj)
      .then((res) => {
        console.log(res.data);
        setRestaurants(res.data.restaurants);
        setSortId(sort)
      })
      .catch((err) => {
        console.log(err);
      });

    //navigate(`/filter?mealtype=${mealtypeId}&location=${locationId}`);


  }

function handleCostChange(lcost,hcost){
  let filterObj = {
    mealtype: mealtypeId,
    location: locationId,
    sort: sortId,
    lcost:lcost,
    hcost:hcost,
    page: pageId,
    cuisine:cuisine.length == 0 ? undefined : cuisine,
  }
  
  axios
    .post("https://foodify-restro-backend.onrender.com/api/filter", filterObj)
    .then((res) => {
      console.log(res.data);
      setRestaurants(res.data.restaurants);
      setHcost(hcost)
      setLcost(lcost)
    })
    .catch((err) => {
      console.log(err);
    });
}

  function handleChangeCuisine(cuisineId){


    const index= cuisine.indexOf(cuisineId) ;
    if( index >=0 ){
      cuisine.splice( index, 1);
    }
    else{
      cuisine.push(cuisineId);
    }

    let filterObj = {
      mealtype: mealtypeId,
      location: locationId,
      sort: sortId,
      lcost,
      hcost,
      page: pageId,
      cuisine:cuisine.length == 0 ? undefined : cuisine,
    }
    
    axios
      .post("https://foodify-restro-backend.onrender.com/api/filter", filterObj)
      .then((res) => {
        console.log(res.data);
        setRestaurants(res.data.restaurants);
      })
      .catch((err) => {
        console.log(err);
      });
      
  }

  function handlePageChange(page){
    let filterObj = {
      mealtype: mealtypeId,
      location: locationId,
      sort: sortId,
      lcost:lcost,
      hcost:hcost,
      page: page,
      cuisine:cuisine.length == 0 ? undefined : cuisine,
    }
    
    axios
      .post("https://foodify-restro-backend.onrender.com/api/filter", filterObj)
      .then((res) => {
        console.log(res.data);
        setRestaurants(res.data.restaurants);
       setPageId(page)
      })
      .catch((err) => {
        console.log(err);
      });
  }

 function handleRstrurantByDetail(id){
  navigate(`/details?restaurant=${id}`)
 }
  return (
    <>
      <div className="container" style={{ marginTop: "30px" }}>
        <div className="heading">Breakfast Places in Mumbai</div>
        <div className="row">
          <div class="col-lg-3 col-sm-12">
            <div class="filter-block">
              <div>
                <div id="filter-head">Filters</div>
                <label>Select Location</label>
                <br />
                <select
                  name="options"
                  class="select-opt"
                  onChange={(e) => handleChangeLocation(e)}
                >
                  <option value="0" selected disabled>
                    Please type a location
                  </option>
                  {locations &&
                    locations.map((item, index) => (
                      <option key={item.location_id} value={item.location_id}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
              <div>
                <div class="option_filter">Cuisine</div>
                <div className="filter-checkbox">
                  <input class="checkboxes" type="checkbox" name="cuisine" onChange={()=>{handleChangeCuisine(1)}}/>
                  <label> North Indian</label>
                </div>
                <div className="filter-checkbox">
                  <input class="checkboxes" type="checkbox"  name="cuisine" onChange={()=>{handleChangeCuisine(2)}}/>
                  <label>South Indian</label>
                </div>
                <div className="filter-checkbox">
                  <input class="checkboxes" type="checkbox"   name="cuisine" onChange={()=>{handleChangeCuisine(3)}} />
                  <label>Chinese</label>
                </div>
                <div className="filter-checkbox">
                  <input class="checkboxes" type="checkbox"    name="cuisine" onChange={()=>{handleChangeCuisine(4)}}/>
                  <label>Fast Food</label>
                </div>
                <div className="filter-checkbox">
                  <input class="checkboxes" type="checkbox"   name="cuisine" onChange={()=>{handleChangeCuisine(5)}}/>
                  <label>Street Food</label>
                </div>
              </div>
              <div>
                <div class="option_filter">Cost for two</div>
                <div className="filter-checkbox">
                  <input class="radios" type="radio" id="" name="cost"   onChange={()=>handleCostChange(1, 500)}/>
                  <label>Less than ₹500</label>
                  <br />
                </div>
                <div className="filter-checkbox">
                  <input class="radios" type="radio" id="" name="cost"   onChange={()=>handleCostChange(500, 1000)}/>
                  <label>₹500 to ₹1000</label>
                  <br />
                </div>
                <div className="filter-checkbox">
                  <input class="radios" type="radio" id="" name="cost"   onChange={()=>handleCostChange(1000, 1500)}/>
                  <label>₹1000 to ₹1500</label>
                  <br />
                </div>
                <div className="filter-checkbox">
                  
                  <input class="radios" type="radio" id="" name="cost"  onChange={()=>handleCostChange(1500, 2000)} />
                  <label>₹1500 to ₹2000</label>
                  <br />
                </div>
                <div className="filter-checkbox">
                  <input class="radios" type="radio" id="" name="cost"   onChange={()=>handleCostChange(2000, 2500)}/>
                  <label>₹2000+</label>
                </div>
              </div>
              <div>
                <div class="option_filter">Sort</div>
                <div className="filter-checkbox">
                  <input class="radios" type="radio" id="" name="sort" onChange={() => { handleSortChange(1) }} />
                  <label>Price low to high</label>
                  <br />
                </div>
                <div className="filter-checkbox">
                  <input class="radios" type="radio" id="" name="sort" onChange={() => { handleSortChange(-1) }} />
                  <label>Price high to low</label>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-9 col-sm-12" >
            {restaurants.length > 0 &&
              restaurants.map((item, index) => {
                return (
                  <div className="item" key={index}  onClick={()=>{handleRstrurantByDetail(item._id)}}>
                    <div className="row">
                      <div className="col-3 col-sm-3 img-div">
                        <img
                          className="image1"
                          src={`/${item.image}`}
                          alt="image"
                        />
                      </div>
                      <div className="col-9 col-sm-9 restaurant_info">
                        <div className="head1">{item.name}</div>
                        <div className="head2">FORT</div>
                        <div className="head3">{item.locality}</div>
                      </div>
                      <div className="col-12">
                        <hr />
                      </div>
                      <div className="col-4 col-sm-4 prising">
                        <div className="ms-4 mt-4 cuisine">CUISINES:</div>
                        <div className="ms-4 cost-for-two">COST FOR TWO:</div>
                      </div>
                      <div className="col-8 col-sm-8">
                        <div className="mt-4 cost-price">buhh</div>
                        <div className="cost-price">item.min_price</div>
                      </div>
                    </div>
                  </div>
                );
              })}

            <div style={{ textAlign: "center" }}>
              <span className="pagination-item" >&#60;</span>
              <span className="pagination-item" onClick={() => {handlePageChange(1)}}>1</span>
              <span className="pagination-item" onClick={() => {handlePageChange(2)}}>2</span>
              <span className="pagination-item" onClick={() => {handlePageChange(3)}}>3</span>
              <span className="pagination-item" onClick={() => {handlePageChange(4)}}>4</span>
              <span className="pagination-item" onClick={() => {handlePageChange(5)}}>5</span>
              <span className="pagination-item" >&#62;</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterPage;
