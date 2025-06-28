import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PaymentPage.css';

const PaymentPage = () => {
  const navigate = useNavigate();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState({
    name: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });
  
  const [bankDetails, setBankDetails] = useState({
    accountName: '',
    accountNumber: '',
    bankName: '',
    ifscCode: ''
  });
  
  const handleCardChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails({ ...paymentDetails, [name]: value });
  };
  
  const handleBankChange = (e) => {
    const { name, value } = e.target;
    setBankDetails({ ...bankDetails, [name]: value });
  };

  const selectPaymentMethod = (method) => {
    setSelectedPaymentMethod(method);
  };
  
  const isValidExpiry = (expiry) => {
    if (!/^\d{2}\/\d{2}$/.test(expiry)) return false;
    const [month, year] = expiry.split('/').map(Number);
    if (month < 1 || month > 12) return false;
    const currentDate = new Date();
    const inputDate = new Date(`20${year}`, month - 1); 
    return inputDate >= new Date(currentDate.getFullYear(), currentDate.getMonth());
  };
  
  const isValidCVV = (cvv) => {
    return /^\d{3,4}$/.test(cvv);
  };
  
  const handlePayment = () => {
    if (selectedPaymentMethod === 'credit-card') {
      const { name, cardNumber, expiry, cvv } = paymentDetails;
      if (!name || !cardNumber || !expiry || !cvv) {
        alert('Please fill in all credit card details.');
        return;
      }
      if (!/^\d{16}$/.test(cardNumber)) {
        alert('Card Number must be 16 digits.');
        return;
      }
      if (!isValidCVV(cvv)) {
        alert('CVV must be 3 or 4 digits.');
        return;
      }
      if (!isValidExpiry(expiry)) {
        alert('Invalid expiry date. Please use MM/YY format and ensure the card is not expired.');
        return;
      }
    } else if (selectedPaymentMethod === 'gpay') {
      alert('Redirecting to Google Pay...');
    } else if (selectedPaymentMethod === 'bank-transfer') {
      const { accountName, accountNumber, bankName, ifscCode } = bankDetails;
      if (!accountName || !accountNumber || !bankName || !ifscCode) {
        alert('Please fill in all bank transfer details.');
        return;
      }
      if (!/^\d{9,18}$/.test(accountNumber)) {
        alert('Please enter a valid account number.');
        return;
      }
      if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifscCode)) {
        alert('Please enter a valid IFSC code (format: ABCD0123456).');
        return;
      }
    } else {
      alert('Please select a payment method.');
      return;
    }
    alert('Payment successful!');
    navigate('/confirmation');
  };
  
  return (
    <div className="payment-page">
      <header className="header">
        <nav className="navbar">
          <div className="logo" onClick={() => navigate('/')}>Transpogo</div>
          <div className="nav-links">
            <button className="nav-btn" onClick={() => navigate('/home')}>Home</button>
            <button className="nav-btn" onClick={() => navigate('/track')}>Track Shipment</button>
            <button className="nav-btn" onClick={() => navigate('/services')}>Services</button>
            <button className="nav-btn" onClick={() => navigate('/about')}>About Us</button>
          </div>
        </nav>
      </header>
      
      <div className="payment-container">
        <h1>Payment</h1>
        <p>Please select your preferred payment method:</p>
        
        <div className="payment-methods">
          <div 
            className={`payment-method ${selectedPaymentMethod === 'credit-card' ? 'selected' : ''}`}
            onClick={() => selectPaymentMethod('credit-card')}
          >
            <div className="payment-method-icon">💳</div>
            <div className="payment-method-name">Credit Card</div>
          </div>
          
          <div 
            className={`payment-method ${selectedPaymentMethod === 'gpay' ? 'selected' : ''}`}
            onClick={() => selectPaymentMethod('gpay')}
          >
            <div className="payment-method-icon">G</div>
            <div className="payment-method-name">Google Pay</div>
          </div>
          
          <div 
            className={`payment-method ${selectedPaymentMethod === 'bank-transfer' ? 'selected' : ''}`}
            onClick={() => selectPaymentMethod('bank-transfer')}
          >
            <div className="payment-method-icon">🏦</div>
            <div className="payment-method-name">Bank Transfer</div>
          </div>
        </div>
        
        {selectedPaymentMethod === 'credit-card' && (
          <div className="credit-card-form">
            <h2>Credit Card Details</h2>
            <input
              type="text"
              name="name"
              placeholder="Name on Card"
              value={paymentDetails.name}
              onChange={handleCardChange}
            />
            <input
              type="text"
              name="cardNumber"
              placeholder="Card Number"
              value={paymentDetails.cardNumber}
              onChange={handleCardChange}
              maxLength="16"
            />
            <div className="payment-row">
              <input
                type="text"
                name="expiry"
                placeholder="MM/YY"
                value={paymentDetails.expiry}
                onChange={handleCardChange}
                maxLength="5"
              />
              <input
                type="password"
                name="cvv"
                placeholder="CVV"
                value={paymentDetails.cvv}
                onChange={handleCardChange}
                maxLength="4"
              />
            </div>
          </div>
        )}
        
        {selectedPaymentMethod === 'gpay' && (
          <div className="gpay-info">
            <h2>Google Pay</h2>
            <p>You will be redirected to Google Pay to complete your payment securely.</p>
            <div className="gpay-button">
              <div className="gpay-logo">
                <span className="gpay-text">Pay</span>
              </div>
            </div>
          </div>
        )}
        
        {selectedPaymentMethod === 'bank-transfer' && (
          <div className="bank-transfer-info">
            <h2>Bank Transfer Details</h2>
            <p>Please enter your bank account details:</p>
            
            <input
              type="text"
              name="accountName"
              placeholder="Account Holder Name"
              value={bankDetails.accountName}
              onChange={handleBankChange}
            />
            <input
              type="text"
              name="accountNumber"
              placeholder="Account Number"
              value={bankDetails.accountNumber}
              onChange={handleBankChange}
            />
            <div className="payment-row">
              <input
                type="text"
                name="bankName"
                placeholder="Bank Name"
                value={bankDetails.bankName}
                onChange={handleBankChange}
              />
              <input
                type="text"
                name="ifscCode"
                placeholder="IFSC Code"
                value={bankDetails.ifscCode}
                onChange={handleBankChange}
              />
            </div>
            
            <div className="bank-info-note">
              <p>Note: Please verify all details carefully before proceeding. Our team will verify the transfer and process your order once payment is confirmed.</p>
            </div>
          </div>
        )}
        
        {selectedPaymentMethod && (
          <button className="pay-button" onClick={handlePayment}>
            {selectedPaymentMethod === 'credit-card' ? 'Pay Now' : 
             selectedPaymentMethod === 'gpay' ? 'Continue to Google Pay' : 
             'Confirm Bank Transfer'}
          </button>
        )}
        
        <div className="payment-secure-note">
          <p>🔒 All payments are secure and encrypted</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;