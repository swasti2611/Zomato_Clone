import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import "../Style/deatils.css";
import query from "query-string";
import axios from "axios";
import Modal from "react-modal";
import { useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "antiquewhite",
    border: "solid 1px brown",
    width: "745px",
    height: "500px",
  },
};

const DetailsPage = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const[detailModelsOpen,setDetailModelIsopen]=useState(false)
  const [restaurant, setRestaurant] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [restaurantId, setRestaurantId] = useState(undefined);

  const [Name, setName] = useState("");
  const [email,setEmail]=useState("")
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  let location = useLocation();

  useEffect(() => {
    let qs = query.parse(location.search);
    let { restaurant } = qs;
    axios
      .get(`https://foodify-restro-backend.onrender.com/api/restaurantById/${restaurant}`)
      .then((res) => {
        setRestaurant(res.data.restaurant);
        setRestaurantId(restaurant);
      })
      .catch();
  }, [location.search]);

  function handlePlaceOrder() {
    setIsOpen(true);
    axios
      .get(`https://foodify-restro-backend.onrender.com/api/menuitems/${restaurantId}`)
      .then((res) => {
        setMenuItems(res.data.items);
      })
      .catch();
  }

  const addItems = (index, operationType) => {
    let total = 0;
    let newItems = [...menuItems];
    let item = { ...newItems[index] };

    if (operationType === "add") {
      item.qty = item.qty + 1;
    } else {
      item.qty = item.qty - 1;
    }

    newItems[index] = item;
    newItems.forEach((item) => {
      total += item.qty * item.price;
    });

    setMenuItems(newItems);
    setSubTotal(total);
  };
  function handleCloseItemModal() {
    setIsOpen(false);
  }


  function handlePay(){
    setDetailModelIsopen(true)
    setIsOpen(false);
  }


  // const isDate = (val) => {
  //   // Cross realm compatible
  //   return Object.prototype.toString.call(val) === '[object Date]';
  // };

  // const isObj = (val) => {
  //   return typeof val === 'object';
  // };

  // const stringifyValue = (val) => {
  //   if (isObj(val) && !isDate(val)) {
  //     return JSON.stringify(val);
  //   } else {
  //     return val;
  //   }
  // };

  // const buildForm = ({ action, params }) => {
  //   const form = document.createElement('form');
  //   form.setAttribute('method', 'post');
  //   form.setAttribute('action', action);

  //   Object.keys(params).forEach(key => {
  //     const input = document.createElement('input');
  //     input.setAttribute('type', 'hidden');
  //     input.setAttribute('name', key);
  //     input.setAttribute('value', stringifyValue(params[key]));
  //     form.appendChild(input);
  //   });

  //   return form;
  // };

  // const post = (details) => {
  //   const form = buildForm(details);
  //   document.body.appendChild(form);
  //   form.submit();
  //   form.remove();
  // };

  // function getData(data){
  //   return fetch(`https://foodify-restro-backend.onrender.com/api/payment`, {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify(data)
  //   }).then(response => response.json()).catch(err => console.log(err));
  // };

  // const makePayment = () => {
  //   getData({ amount: subTotal, email: email }).then(response => {
  //     var information = {
  //       action: "https://securegw-stage.paytm.in/order/process",
  //       params: response
  //     };
  //     post(information);
  //   });
  // };



  // const makePayment = async () => {
  //   try {
  //     // Replace this with your actual backend endpoint that creates Razorpay order
  //     const response = await fetch("/createRazorpayOrder", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         amount: subTotal,
  //         email: email,
  //         name: Name,
  //         mobile: mobile,
  //         address: address,
  //       }),
  //     });
  //     const data = await response.json();

  //     if (data.success) {
  //       const options = {
  //         key: data.key_id, // Your Razorpay key
  //         amount: data.amount, // Amount in smallest currency unit (paise in India)
  //         currency: data.currency || "INR", // Currency code (default: INR)
  //         name: "Order Payment", // Name of the product
  //         description: "Payment for order", // Description of the payment
  //         order_id: data.order_id, // Order ID from backend
  //         handler: function (response) {
  //           alert("Payment successful");
  //           // Handle success scenario (e.g., redirect to a success page)
  //         },
  //         prefill: {
  //           name: Name, // Customer name
  //           email: email, // Customer email
  //           contact: mobile, // Customer contact number
  //         },
  //         theme: {
  //           color: "#2300a3", // Customize the Razorpay button theme color
  //         },
  //       };

  //       const razorpayObject = new window.Razorpay(options);
  //       razorpayObject.open();
  //     } else {
  //       alert(data.msg); // Handle error response from backend
  //     }
  //   } catch (error) {
  //     console.error("Error occurred during payment:", error);
  //     // Handle error state or display error message
  //   }
  // };

  
  const currency = "INR";
  const receiptId = "qwsaq1";

  const paymentHandler = async (e) => {
    const response = await fetch("https://foodify-restro-backend.onrender.com/api/order", {
      method: "POST",
      body: JSON.stringify({
        amount:subTotal*100,
        currency,
        receipt: receiptId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const order = await response.json();
    console.log(order);

    var options = {
      key: "rzp_test_i4YrWdimJbtZi6", // Enter the Key ID generated from the Dashboard
      amount:subTotal, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency,
      name: "Acme Corp", //your business name
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: async function (response) {
        const body = {
          ...response,
        };

        
        
      },
      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
        name: "Web Dev Matrix", //your customer's name
        email: "webdevmatrix@example.com",
        contact: "9000000000", //Provide the customer's phone number for better conversion rates
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });
    rzp1.open();
    e.preventDefault();
  };



  return (
    <>

      <div className="container">
        <div >
          {restaurant.thumb && (
            <img 
              src="https://as1.ftcdn.net/v2/jpg/02/48/92/96/1000_F_248929619_JkVBYroM1rSrshWJemrcjriggudHMUhV.jpg"
              style={{ width: "100%", height: "500px", objectFit: "cover", borderRadius:"5px", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",marginTop: "30px"}}
            />
          )}
          <button className="gallery-button">Click to see Image Gallery</button>
        </div>
        <button
          className="btn btn-danger"
          style={{ float: "right", margin: "25px" }}
          onClick={handlePlaceOrder}
        >
          Place Online Order
        </button>
        <div className="heading">{restaurant.name}</div>
        <div className="tabs">
          <div className="tab">
            <input type="radio" id="tab-1" name="tab-group-1" defaultChecked />
            <label htmlFor="tab-1">Overview</label>
            <div className="content">
              <div className="about">About the place</div>
              <div className="head">Cuisine</div>
              <div className="value">
                {restaurant.cuisine &&
                  restaurant.cuisine.map((item) => item.name + ", ")}
              </div>
              <div className="head">Average Cost</div>
              <div className="value">&#8377; {restaurant.min_price}</div>
            </div>
          </div>
          <div className="tab">
            <input type="radio" id="tab-2" name="tab-group-1" />
            <label htmlFor="tab-2">Contact</label>
            <div className="content">
              <div className="head">Phone Number</div>
              <div className="value">{restaurant.contact_number}</div>
              <div className="head">{restaurant.name}</div>
              <div className="value">{`${restaurant.locality}, ${restaurant.city}`}</div>
            </div>
          </div>
        </div>

        <Modal isOpen={modalIsOpen} style={customStyles}>
          <div className="row" style={{ marginTop: "30px" }}>
            <div
              className="col-xs-4 col-sm-4 col-md-4 col-lg-4 subtotal"
              style={{ paddingLeft: "26px" }}
            >
              Subtotal
            </div>
            <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 subtotal">
              &#8377;{subTotal}
            </div>
            <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
              <button className="btn btn-danger" style={{ marginLeft: "30px" }}  onClick={paymentHandler}>
                Pay Now
              </button>
            </div>
          </div>
          <div>
            <div
              className="glyphicon-glyphicon-remove-lose"
              style={{ float: "right" }}
            >
              <FontAwesomeIcon
                icon={faXmark}
                style={{ marginTop: "12px", padding: "2px" }}
                onClick={() => {
                  handleCloseItemModal();
                }}
              />
            </div>
            <h3 className="restaurant-name">{restaurant.name}</h3>
            {menuItems &&
              menuItems.map((item, index) => {
                return (
                  <div
                    key={index}
                    style={{
                      width: "44rem",
                      marginTop: "10px",
                      marginBottom: "10px",
                      borderBottom: "2px solid #dbd8d8",
                    }}
                  >
                    <div
                      className="card"
                      style={{ width: "43rem", margin: "auto" }}
                    >
                      <div
                        className="row"
                        style={{ paddingLeft: "10px", paddingBottom: "10px" }}
                      >
                        <div
                          className="col-xs-9 col-sm-9 col-md-9 col-lg-9"
                          style={{ paddingLeft: "10px", paddingBottom: "10px" }}
                        >
                          <span className="card-body">
                            <h5 className="item-name">{item.name}</h5>
                            <h5 className="item-name">&#8377;{item.price}</h5>
                            <p className="card-text">{item.description}</p>
                          </span>
                        </div>
                        <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                          <img
                            className="card-img-center title-img"
                            src={`./${item.image}`}
                            alt={item.name}
                          />
                          {item.qty === 0 ? (
                            <div>
                              <button
                                className="add-button"
                                onClick={() => addItems(index, "add")}
                              >
                                Add
                              </button>
                            </div>
                          ) : (
                            <div className="add-number">
                              <button
                                style={{
                                  marginLeft: "-10px",
                                  border: "none",
                                  width: "22px",
                                  height: "23px",
                                }}
                                onClick={() => addItems(index, "subtract")}
                              >
                                -
                              </button>
                              <span style={{ marginLeft: "13px" }}>
                                {item.qty}
                              </span>
                              <button
                                style={{
                                  marginLeft: "14px",
                                  border: "none",
                                  width: "22px",
                                  height: "23px",
                                }}
                                onClick={() => addItems(index, "add")}
                              >
                                +
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </Modal>

        
      </div>
    </>
  );
};

export default DetailsPage;
