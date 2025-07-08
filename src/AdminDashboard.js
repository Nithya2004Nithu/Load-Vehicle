import React, { useState, useEffect } from "react";
import "./AdminDashboard.css";
import axios from "axios";

const AdminDashboard = () => {
  const [trucks, setTrucks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // "add", "edit"
  const [currentTruck, setCurrentTruck] = useState({
    name: "",
    licensePlate: "",
    driver: "",
    status: "active",
    lastMaintenance: "",
    tonnage: "",
    storageCapacity: "",
    storageUnit: "cubic-meters",
    fuelType: "",
    wheelConfiguration: "4x2",
    batteryCapacity: "",
    chargeTime: "",
    range: "",
    isPowered: "fuel"
  });

  // Vehicle details view modal
  const [showDetails, setShowDetails] = useState(false);
  const [selectedTruck, setSelectedTruck] = useState(null);

  // API base URL
  const API_URL = "http://localhost:5000/api/truck";

  // Fetch all trucks from API
  const fetchTrucks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      setTrucks(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch trucks. Please try again later.");
      console.error("Error fetching trucks:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch trucks on component mount
  useEffect(() => {
    fetchTrucks();
  }, []);

  // Open modal for adding new truck
  const handleAddTruck = () => {
    setModalMode("add");
    setCurrentTruck({
      name: "",
      licensePlate: "",
      driver: "",
      status: "active",
      lastMaintenance: new Date().toISOString().split('T')[0],
      tonnage: "",
      storageCapacity: "",
      storageUnit: "cubic-meters",
      fuelType: "diesel",
      wheelConfiguration: "4x2",
      batteryCapacity: "",
      chargeTime: "",
      range: "",
      isPowered: "fuel"
    });
    setShowModal(true);
  };

  // Open modal for editing truck
  const handleEditTruck = (truck) => {
    setModalMode("edit");
    // Format the date for the input field
    const formattedTruck = {
      ...truck,
      lastMaintenance: truck.lastMaintenance ? new Date(truck.lastMaintenance).toISOString().split('T')[0] : ""
    };
    setCurrentTruck(formattedTruck);
    setShowModal(true);
  };

  // Handle view truck details
  const handleViewTruck = (truck) => {
    setSelectedTruck(truck);
    setShowDetails(true);
  };

  // Handle delete truck
  const handleDeleteTruck = async (id) => {
    if(window.confirm("Are you sure you want to delete this truck?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        setTrucks(trucks.filter(truck => truck._id !== id));
        setShowDetails(false);
      } catch (err) {
        setError("Failed to delete truck. Please try again.");
        console.error("Error deleting truck:", err);
      }
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentTruck({...currentTruck, [name]: value});
    
    // Special handling for power type selection
    if(name === "isPowered") {
      if(value === "fuel") {
        setCurrentTruck(prev => ({
          ...prev, 
          [name]: value,
          batteryCapacity: "",
          chargeTime: "",
          range: ""
        }));
      } else if(value === "electric") {
        setCurrentTruck(prev => ({
          ...prev, 
          [name]: value,
          fuelType: ""
        }));
      }
    }
  };

  // Save truck (add or update)
  const handleSaveTruck = async (e) => {
    e.preventDefault();
    
    try {
      if(modalMode === "add") {
        // Add new truck
        const response = await axios.post(API_URL, currentTruck);
        setTrucks([...trucks, response.data]);
      } else {
        // Update existing truck
        const response = await axios.put(`${API_URL}/${currentTruck._id}`, currentTruck);
        setTrucks(trucks.map(truck => 
          truck._id === currentTruck._id ? response.data : truck
        ));
      }
      
      setShowModal(false);
    } catch (err) {
      setError(`Failed to ${modalMode === "add" ? "add" : "update"} truck. Please check your data and try again.`);
      console.error(`Error ${modalMode === "add" ? "adding" : "updating"} truck:`, err);
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "Not set";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="container">
      {/* Sidebar */}
      <aside>
        <div className="sidebar">
          <a href="/#" className="active">
            <span className="material-icons-sharp">dashboard</span>
          </a>
          <a href="/#">
            <span className="material-icons-sharp">local_shipping</span>
          </a>
          <a href="/#">
            <span className="material-icons-sharp">group</span>
          </a>
          <a href="/#">
            <span className="material-icons-sharp">map</span>
          </a>
          <a href="/#">
            <span className="material-icons-sharp">build</span>
          </a>
          <a href="/#">
            <span className="material-icons-sharp">settings</span>
          </a>
          <a href="/#">
            <span className="material-icons-sharp">logout</span>
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main>
        <div className="top-bar">
          <h1>Fleet Management</h1>
          <button className="btn-primary" onClick={handleAddTruck}>
            <span className="material-icons-sharp">add</span>
            Add Truck
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="error-message">
            {error}
            <button onClick={() => setError(null)}>×</button>
          </div>
        )}

        {/* Truck Table */}
        <div className="truck-table">
          {loading ? (
            <div className="loading">Loading trucks...</div>
          ) : trucks.length === 0 ? (
            <div className="no-trucks">No trucks available. Add a new truck to get started.</div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Truck Name</th>
                  <th>License Plate</th>
                  <th>Driver</th>
                  <th>Tonnage</th>
                  <th>Power Type</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {trucks.map(truck => (
                  <tr key={truck._id}>
                    <td>{truck.name}</td>
                    <td>{truck.licensePlate}</td>
                    <td>{truck.driver || "Not Assigned"}</td>
                    <td>{truck.tonnage} tons</td>
                    <td>
                      <span className={`power-type ${truck.isPowered}`}>
                        {truck.isPowered === "fuel" ? (
                          <>{truck.fuelType && (truck.fuelType.charAt(0).toUpperCase() + truck.fuelType.slice(1))}</>
                        ) : truck.isPowered === "electric" ? (
                          <>Electric</>
                        ) : (
                          <>Hybrid</>
                        )}
                      </span>
                    </td>
                    <td>
                      <span className={`status ${truck.status}`}>
                        {truck.status.charAt(0).toUpperCase() + truck.status.slice(1)}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button 
                          className="btn btn-view"
                          onClick={() => handleViewTruck(truck)}
                        >
                          View
                        </button>
                        <button 
                          className="btn btn-edit"
                          onClick={() => handleEditTruck(truck)}
                        >
                          Edit
                        </button>
                        <button 
                          className="btn btn-delete"
                          onClick={() => handleDeleteTruck(truck._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>

      {/* Add/Edit Truck Modal */}
      {showModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <div className="modal-header">
              <h2>{modalMode === "add" ? "Add New Truck" : "Edit Truck"}</h2>
              <button className="close-btn" onClick={() => setShowModal(false)}>×</button>
            </div>
            <form onSubmit={handleSaveTruck}>
              <div className="form-section">
                <h3>Basic Information</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label>Truck Name</label>
                    <input 
                      type="text" 
                      name="name"
                      value={currentTruck.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>License Plate</label>
                    <input 
                      type="text" 
                      name="licensePlate"
                      value={currentTruck.licensePlate}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Assigned Driver</label>
                    <input 
                      type="text" 
                      name="driver"
                      value={currentTruck.driver || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Status</label>
                    <select 
                      name="status"
                      value={currentTruck.status}
                      onChange={handleInputChange}
                    >
                      <option value="active">Active</option>
                      <option value="maintenance">Maintenance</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h3>Specifications</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label>Tonnage (tons)</label>
                    <input 
                      type="number" 
                      step="0.1"
                      name="tonnage"
                      value={currentTruck.tonnage || ""}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Wheel Configuration</label>
                    <select
                      name="wheelConfiguration"
                      value={currentTruck.wheelConfiguration}
                      onChange={handleInputChange}
                    >
                      <option value="4x2">4x2</option>
                      <option value="4x4">4x4</option>
                      <option value="6x2">6x2</option>
                      <option value="6x4">6x4</option>
                      <option value="6x6">6x6</option>
                      <option value="8x4">8x4</option>
                      <option value="8x8">8x8</option>
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Storage Capacity</label>
                    <input 
                      type="number"
                      step="0.1"
                      name="storageCapacity"
                      value={currentTruck.storageCapacity || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Storage Unit</label>
                    <select
                      name="storageUnit"
                      value={currentTruck.storageUnit}
                      onChange={handleInputChange}
                    >
                      <option value="cubic-meters">Cubic Meters</option>
                      <option value="cubic-feet">Cubic Feet</option>
                      <option value="liters">Liters</option>
                      <option value="gallons">Gallons</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h3>Power & Fuel</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label>Power Type</label>
                    <select
                      name="isPowered"
                      value={currentTruck.isPowered}
                      onChange={handleInputChange}
                    >
                      <option value="fuel">Fuel Only</option>
                      <option value="electric">Electric Only</option>
                      <option value="hybrid">Hybrid</option>
                    </select>
                  </div>
                  {(currentTruck.isPowered === "fuel" || currentTruck.isPowered === "hybrid") && (
                    <div className="form-group">
                      <label>Fuel Type</label>
                      <select
                        name="fuelType"
                        value={currentTruck.fuelType || ""}
                        onChange={handleInputChange}
                      >
                        <option value="diesel">Diesel</option>
                        <option value="gasoline">Gasoline</option>
                        <option value="biodiesel">Biodiesel</option>
                        <option value="cng">Compressed Natural Gas (CNG)</option>
                        <option value="lng">Liquefied Natural Gas (LNG)</option>
                        <option value="hybrid-diesel">Hybrid Diesel</option>
                        <option value="hybrid-gasoline">Hybrid Gasoline</option>
                      </select>
                    </div>
                  )}
                </div>

                {(currentTruck.isPowered === "electric" || currentTruck.isPowered === "hybrid") && (
                  <div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Battery Capacity (kWh)</label>
                        <input 
                          type="number"
                          step="0.1"
                          name="batteryCapacity"
                          value={currentTruck.batteryCapacity || ""}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-group">
                        <label>Charging Time (hours)</label>
                        <input 
                          type="number"
                          step="0.1"
                          name="chargeTime"
                          value={currentTruck.chargeTime || ""}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Range (km)</label>
                        <input 
                          type="number"
                          name="range"
                          value={currentTruck.range || ""}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="form-section">
                <h3>Maintenance</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label>Last Maintenance Date</label>
                    <input 
                      type="date" 
                      name="lastMaintenance"
                      value={currentTruck.lastMaintenance || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              <div className="form-buttons">
                <button 
                  type="button" 
                  className="btn btn-cancel"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-save">
                  {modalMode === "add" ? "Add Truck" : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Truck Details Modal */}
      {showDetails && selectedTruck && (
        <div className="modal-backdrop">
          <div className="modal detail-modal">
            <div className="modal-header">
              <h2>Truck Details: {selectedTruck.name}</h2>
              <button className="close-btn" onClick={() => setShowDetails(false)}>×</button>
            </div>
            
            <div className="detail-content">
              <div className="detail-section">
                <h3>Basic Information</h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="detail-label">License Plate:</span>
                    <span className="detail-value">{selectedTruck.licensePlate}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Driver:</span>
                    <span className="detail-value">{selectedTruck.driver || "Not Assigned"}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Status:</span>
                    <span className={`status ${selectedTruck.status}`}>
                      {selectedTruck.status.charAt(0).toUpperCase() + selectedTruck.status.slice(1)}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Last Maintenance:</span>
                    <span className="detail-value">{formatDate(selectedTruck.lastMaintenance)}</span>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h3>Specifications</h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="detail-label">Tonnage:</span>
                    <span className="detail-value">{selectedTruck.tonnage} tons</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Wheel Configuration:</span>
                    <span className="detail-value">{selectedTruck.wheelConfiguration}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Storage Capacity:</span>
                    <span className="detail-value">
                      {selectedTruck.storageCapacity} {selectedTruck.storageUnit ? selectedTruck.storageUnit.replace('-', ' ') : ''}
                    </span>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h3>Power Information</h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="detail-label">Power Type:</span>
                    <span className={`power-type ${selectedTruck.isPowered}`}>
                      {selectedTruck.isPowered.charAt(0).toUpperCase() + selectedTruck.isPowered.slice(1)}
                    </span>
                  </div>
                  
                  {(selectedTruck.isPowered === "fuel" || selectedTruck.isPowered === "hybrid") && selectedTruck.fuelType && (
                    <div className="detail-item">
                      <span className="detail-label">Fuel Type:</span>
                      <span className="detail-value">
                        {selectedTruck.fuelType.charAt(0).toUpperCase() + selectedTruck.fuelType.slice(1).replace('-', ' ')}
                      </span>
                    </div>
                  )}
                  
                  {(selectedTruck.isPowered === "electric" || selectedTruck.isPowered === "hybrid") && (
                    <>
                      {selectedTruck.batteryCapacity && (
                        <div className="detail-item">
                          <span className="detail-label">Battery Capacity:</span>
                          <span className="detail-value">{selectedTruck.batteryCapacity} kWh</span>
                        </div>
                      )}
                      {selectedTruck.chargeTime && (
                        <div className="detail-item">
                          <span className="detail-label">Charging Time:</span>
                          <span className="detail-value">{selectedTruck.chargeTime} hours</span>
                        </div>
                      )}
                      {selectedTruck.range && (
                        <div className="detail-item">
                          <span className="detail-label">Range:</span>
                          <span className="detail-value">{selectedTruck.range} km</span>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
            
            <div className="form-buttons">
              <button 
                className="btn btn-edit"
                onClick={() => {
                  setShowDetails(false);
                  handleEditTruck(selectedTruck);
                }}
              >
                Edit
              </button>
              <button 
                className="btn btn-delete"
                onClick={() => {
                  handleDeleteTruck(selectedTruck._id);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;