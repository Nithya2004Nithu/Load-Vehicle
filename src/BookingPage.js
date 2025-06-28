import React, { useState, useEffect, useCallback } from 'react';
import './BookingPage.css';
import { useNavigate } from 'react-router-dom';

// Using truck data from ServicesPage for pricing calculations
const trucks = [
  {
    name: "Truck A",
    img: '/img1.png',
    capacity: '12 tons',
    dimension: '40 cubic-meters',
    price: '₹500 for 10km',
    fuelType: 'Diesel',
    isPowered: 'fuel',
    pricePerKm: 50 // ₹50 per km
  },
  {
    name: "Van B",
    img: '/img2.png',
    capacity: '3.5 tons',
    dimension: '14 cubic-meters',
    price: '₹300 for 10km',
    fuelType: 'Gasoline',
    isPowered: 'fuel',
    pricePerKm: 30 // ₹30 per km
  },
  {
    name: "Electric Delivery C",
    img: '/img3.png',
    capacity: '4.2 tons',
    dimension: '16 cubic-meters',
    price: '₹350 for 10km',
    range: '350 km',
    isPowered: 'electric',
    pricePerKm: 35 // ₹35 per km
  },
  {
    name: "Hybrid Truck D",
    img: '/img4.png',
    capacity: '8.5 tons',
    dimension: '28 cubic-meters',
    price: '₹450 for 10km',
    fuelType: 'Hybrid-diesel',
    range: '200 km',
    isPowered: 'hybrid',
    pricePerKm: 45 // ₹45 per km
  }
];

// Indian states and districts data
const indianStates = {
  "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur"],
  "Karnataka": ["Bangalore", "Mysore", "Hubli"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai"],
  "Maharashtra": ["Mumbai", "Pune", "Nagpur"],
  "Delhi": ["New Delhi", "North Delhi", "South Delhi"],
  "Gujarat": ["Ahmedabad", "Surat", "Vadodara"],
  // Add more states as needed
};

// Estimated distances between major cities (in km)
const distanceMatrix = {
  "Mumbai": {
    "Pune": 150,
    "Delhi": 1400,
    "Bangalore": 980,
  },
  "Delhi": {
    "Mumbai": 1400,
    "Bangalore": 2150,
    "Chennai": 2200,
  },
  "Bangalore": {
    "Mumbai": 980,
    "Chennai": 350,
    "Delhi": 2150,
  },
  "Chennai": {
    "Bangalore": 350,
    "Delhi": 2200,
    "Mumbai": 1350,
  },
  // Add more city pairs as needed
};

const BookingPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    pickupState: '',
    pickupDistrict: '',
    pickupCity: '',
    destinationState: '',
    destinationDistrict: '',
    destinationCity: '',
    date: '',
    time: '',
    weight: '',
    cargoDescription: '',
    selectedTruck: 'Truck A'
  });

  const [minDate, setMinDate] = useState('');
  const [pickupDistricts, setPickupDistricts] = useState([]);
  const [destinationDistricts, setDestinationDistricts] = useState([]);
  const [estimatedPrice, setEstimatedPrice] = useState(0);
  const [estimatedDistance, setEstimatedDistance] = useState(0);
  
  const navigate = useNavigate();
  
  useEffect(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    setMinDate(`${yyyy}-${mm}-${dd}`);
  }, []);

  useEffect(() => {
    // Update districts when state changes
    if (formData.pickupState && indianStates[formData.pickupState]) {
      setPickupDistricts(indianStates[formData.pickupState]);
    }
    
    if (formData.destinationState && indianStates[formData.destinationState]) {
      setDestinationDistricts(indianStates[formData.destinationState]);
    }
  }, [formData.pickupState, formData.destinationState]);

  // Define calculatePrice with useCallback - FIXED: Added formData to dependencies array
  const calculatePrice = useCallback(() => {
    const { pickupCity, destinationCity, selectedTruck } = formData;
    
    // Get distance between cities
    let distance = 0;
    if (distanceMatrix[pickupCity] && distanceMatrix[pickupCity][destinationCity]) {
      distance = distanceMatrix[pickupCity][destinationCity];
    } else if (distanceMatrix[destinationCity] && distanceMatrix[destinationCity][pickupCity]) {
      distance = distanceMatrix[destinationCity][pickupCity];
    } else {
      // Default distance if not found
      distance = 100;
    }
    
    setEstimatedDistance(distance);
    
    // Find selected truck
    const truck = trucks.find(t => t.name === selectedTruck) || trucks[0];
    
    // Calculate price based on distance and truck's price per km
    const price = distance * truck.pricePerKm;
    setEstimatedPrice(price);
  }, [formData]); // Added formData as a dependency

  useEffect(() => {
    // Calculate estimated price when cities are selected
    if (formData.pickupCity && formData.destinationCity) {
      calculatePrice();
    }
  }, [formData.pickupCity, formData.destinationCity, formData.selectedTruck, calculatePrice]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProceed = async (e) => {
    e.preventDefault();
    const { 
      name, phone, email, 
      pickupState, pickupDistrict, pickupCity,
      destinationState, destinationDistrict, destinationCity,
      date, time, weight, cargoDescription
    } = formData;
    
    // Basic validation
    if (!name || !phone || !email || 
        !pickupState || !pickupCity || 
        !destinationState || !destinationCity || 
        !date || !time || !weight || !cargoDescription) {
      alert('Please fill out all required fields.');
      return;
    }
    
    // Validate phone number
    if (!/^\d{10}$/.test(phone)) {
      alert('Please enter a valid 10-digit phone number.');
      return;
    }
    
    // Validate email
    if (!/\S+@\S+\.\S+/.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      alert('Booking date cannot be in the past.');
      return;
    }

    // Create the payload with all the form data
    const bookingData = {
      ...formData,
      estimatedPrice,
      estimatedDistance
    };

    try {
      const response = await fetch('http://localhost:5000/api/booking/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookingData)
      });
        
      const data = await response.json();
      if (response.ok) {
        alert('✅ Booking successful!');
        // Store booking details for payment page
        localStorage.setItem('bookingDetails', JSON.stringify({
          pickupLocation: `${pickupCity}, ${pickupDistrict || ''}, ${pickupState}`,
          destination: `${destinationCity}, ${destinationDistrict || ''}, ${destinationState}`,
          date: `${date} at ${time}`,
          truckType: formData.selectedTruck,
          estimatedPrice
        }));
        navigate('/payment');
      } else {
        alert(`❌ ${data.message}`);
      }
    } catch (error) {
      console.error('Error while submitting booking:', error);
      alert('❌ Something went wrong. Please try again later.');
    }
  };
    
  return (
    <div className="booking-body">
      <div className="header">Bookings</div>
      <div className="form-container">
        <form onSubmit={handleProceed}>
          <h3>Personal Details</h3>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input type="tel" id="phone" name="phone" pattern="[0-9]{10}" value={formData.phone} onChange={handleChange} required />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          
          <h3>Pickup Details</h3>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="pickupState">State</label>
              <select id="pickupState" name="pickupState" value={formData.pickupState} onChange={handleChange} required>
                <option value="">Select State</option>
                {Object.keys(indianStates).map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="pickupDistrict">District</label>
              <select 
                id="pickupDistrict" 
                name="pickupDistrict" 
                value={formData.pickupDistrict} 
                onChange={handleChange} 
                disabled={!formData.pickupState}
              >
                <option value="">Select District</option>
                {pickupDistricts.map(district => (
                  <option key={district} value={district}>{district}</option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="pickupCity">City/Town</label>
              <input 
                type="text" 
                id="pickupCity" 
                name="pickupCity" 
                value={formData.pickupCity} 
                onChange={handleChange} 
                required 
              />
            </div>
          </div>
          
          <h3>Destination Details</h3>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="destinationState">State</label>
              <select id="destinationState" name="destinationState" value={formData.destinationState} onChange={handleChange} required>
                <option value="">Select State</option>
                {Object.keys(indianStates).map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="destinationDistrict">District</label>
              <select 
                id="destinationDistrict" 
                name="destinationDistrict" 
                value={formData.destinationDistrict} 
                onChange={handleChange} 
                disabled={!formData.destinationState}
              >
                <option value="">Select District</option>
                {destinationDistricts.map(district => (
                  <option key={district} value={district}>{district}</option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="destinationCity">City/Town</label>
              <input 
                type="text" 
                id="destinationCity" 
                name="destinationCity" 
                value={formData.destinationCity} 
                onChange={handleChange} 
                required 
              />
            </div>
          </div>
          
          <h3>Booking Details</h3>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                min={minDate}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="time">Time</label>
              <input
                type="time"
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <h3>Cargo Details</h3>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="weight">Weight of Load (kg)</label>
              <input 
                type="number" 
                id="weight" 
                name="weight" 
                value={formData.weight} 
                onChange={handleChange} 
                required 
                min="1" 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="cargoDescription">Cargo Description</label>
              <textarea
                id="cargoDescription"
                name="cargoDescription"
                value={formData.cargoDescription}
                onChange={handleChange}
                placeholder="Please describe what you're shipping"
                required
              ></textarea>
            </div>
          </div>
          
          <h3>Select Transport Vehicle</h3>
          <div className="truck-selection">
            {trucks.map(truck => (
              <div 
                key={truck.name} 
                className={`truck-option ${formData.selectedTruck === truck.name ? 'selected' : ''}`}
                onClick={() => setFormData({...formData, selectedTruck: truck.name})}
              >
                <div className="truck-image">
                  <img src={truck.img} alt={truck.name} />
                </div>
                <div className="truck-details">
                  <h4>{truck.name}</h4>
                  <p>Capacity: {truck.capacity}</p>
                  <p>Price: {truck.price}</p>
                </div>
              </div>
            ))}
          </div>
          
          {estimatedPrice > 0 && (
            <div className="price-estimate">
              <h3>Estimated Cost</h3>
              <p>Distance: Approximately {estimatedDistance} km</p>
              <p>Estimated Price: ₹{estimatedPrice.toLocaleString()}</p>
              <p><small>Note: Final price may vary based on actual route and additional services.</small></p>
            </div>
          )}

          <div className="buttons">
            <button
              type="button"
              className="button back-button"
              onClick={() => navigate('/services')}
            >
              Back
            </button>
            <button 
              type="submit"
              className="button proceed-button"
            >
              Proceed to Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingPage;