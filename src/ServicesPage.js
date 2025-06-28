import React, { useState, useEffect } from 'react';
import './ServicesPage.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ServicesPage = () => {
  const navigate = useNavigate();
  const [trucks, setTrucks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'active', 'maintenance', 'retired'
  const [sortBy, setSortBy] = useState('name'); // 'name', 'tonnage', 'price'
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc', 'desc'
  const [searchQuery, setSearchQuery] = useState('');

  // API base URL
  const API_URL = "http://localhost:5000/api/truck";

  // Helper function to get power type icon
  const getPowerTypeIcon = (isPowered) => {
    switch(isPowered) {
      case 'electric': return '⚡';
      case 'hybrid': return '🔋';
      case 'fuel': return '⛽';
      default: return '🚚';
    }
  };

  // Helper function to get status indicator
  const getStatusIndicator = (status) => {
    switch(status) {
      case 'active': return <span className="status-indicator active">●</span>;
      case 'maintenance': return <span className="status-indicator maintenance">●</span>;
      case 'retired': return <span className="status-indicator retired">●</span>;
      default: return <span className="status-indicator unknown">●</span>;
    }
  };

  // Fetch trucks from API
  useEffect(() => {
    const fetchTrucks = async () => {
      setLoading(true);
      try {
        const response = await axios.get(API_URL);
        setTrucks(response.data);
        setError(null);
      } catch (err) {
        setError("Failed to load trucks. Please try again later.");
        console.error("Error fetching trucks:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrucks();
  }, []);

  // Helper function to calculate price
  const calculatePrice = (truck) => {
    const basePricePerKm = 40; // ₹40 per km
    const tonnage = parseFloat(truck.tonnage) || 0;
    const pricePerKm = basePricePerKm + (tonnage * 5); // ₹5 more per ton
    return `₹${pricePerKm} per km`;
  };

  // Filter function
  const filterTrucks = () => {
    let filtered = [...trucks];

    // Apply status filter
    if (filterStatus !== 'all') {
      filtered = filtered.filter(truck => truck.status === filterStatus);
    }

    // Apply search query filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(truck => 
        truck.name.toLowerCase().includes(query) || 
        truck.isPowered.toLowerCase().includes(query) ||
        (truck.fuelType && truck.fuelType.toLowerCase().includes(query))
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let valueA, valueB;

      switch (sortBy) {
        case 'tonnage':
          valueA = parseFloat(a.tonnage) || 0;
          valueB = parseFloat(b.tonnage) || 0;
          break;
        case 'price':
          valueA = parseFloat(a.tonnage) || 0;
          valueB = parseFloat(b.tonnage) || 0;
          break;
        default: // name
          valueA = a.name.toLowerCase();
          valueB = b.name.toLowerCase();
          break;
      }

      if (sortOrder === 'asc') {
        return valueA > valueB ? 1 : -1;
      } else {
        return valueA < valueB ? 1 : -1;
      }
    });

    return filtered;
  };

  const filteredTrucks = filterTrucks();

  // Get count by status
  const activeTrucksCount = trucks.filter(truck => truck.status === 'active').length;
  const maintenanceTrucksCount = trucks.filter(truck => truck.status === 'maintenance').length;
  const retiredTrucksCount = trucks.filter(truck => truck.status === 'retired').length;

  return (
    <div className="services-container">
      <div className="services-header">
        <h1 className="services-title">Transport Fleet Management</h1>
      </div>
      
      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-number">{trucks.length}</div>
          <div className="stat-label">Total Trucks</div>
        </div>
        <div className="stat-card active">
          <div className="stat-number">{activeTrucksCount}</div>
          <div className="stat-label">Active</div>
        </div>
        <div className="stat-card maintenance">
          <div className="stat-number">{maintenanceTrucksCount}</div>
          <div className="stat-label">In Maintenance</div>
        </div>
        <div className="stat-card retired">
          <div className="stat-number">{retiredTrucksCount}</div>
          <div className="stat-label">Retired</div>
        </div>
      </div>
      
      <div className="filter-controls">
        <div className="search-box">
          <input 
            type="text" 
            placeholder="Search trucks..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="filter-dropdown">
          <label htmlFor="status-filter">Status:</label>
          <select 
            id="status-filter" 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Trucks</option>
            <option value="active">Active</option>
            <option value="maintenance">In Maintenance</option>
            <option value="retired">Retired</option>
          </select>
        </div>
        
        <div className="sort-dropdown">
          <label htmlFor="sort-by">Sort By:</label>
          <select 
            id="sort-by" 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="name">Name</option>
            <option value="tonnage">Capacity</option>
            <option value="price">Price</option>
          </select>
          
          <button 
            className="sort-order-btn" 
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          >
            {sortOrder === 'asc' ? '↑' : '↓'}
          </button>
        </div>
      </div>
      
      {loading && <div className="loading">Loading trucks...</div>}
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="truck-table-container">
        <table className="truck-table">
          <thead>
            <tr>
              <th>Status</th>
              <th>Name</th>
              <th>Type</th>
              <th>Max Load</th>
              <th>Storage</th>
              <th>Fuel/Power</th>
              <th>Range</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTrucks.map((truck, index) => (
              <tr key={truck._id || index} className={`truck-row ${truck.status}`}>
                <td>{getStatusIndicator(truck.status)} {truck.status}</td>
                <td className="truck-name-cell">{truck.name}</td>
                <td>{getPowerTypeIcon(truck.isPowered)} {truck.isPowered}</td>
                <td>{truck.tonnage} tons</td>
                <td>{truck.storageCapacity} {truck.storageUnit ? truck.storageUnit.replace('-', ' ') : ''}</td>
                <td>
                  {(truck.isPowered === 'fuel' || truck.isPowered === 'hybrid') && truck.fuelType ? 
                    truck.fuelType.charAt(0).toUpperCase() + truck.fuelType.slice(1).replace('-', ' ') : 
                    (truck.isPowered === 'electric' ? 'Electric' : '-')}
                </td>
                <td>
                  {(truck.isPowered === 'electric' || truck.isPowered === 'hybrid') && truck.range ? 
                    `${truck.range} km` : '-'}
                </td>
                <td className="price-cell">{calculatePrice(truck)}</td>
                <td className="action-buttons">
                  
                  {truck.status === 'active' && (
                    <button 
                      className="book-btn" 
                      onClick={() => navigate('/booking', { state: { selectedTruck: truck } })}
                    >
                      Book
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {filteredTrucks.length === 0 && !loading && !error && (
        <div className="no-trucks">
          No trucks match your current filters. Please try different search criteria.
        </div>
      )}
    </div>
  );
};

export default ServicesPage;