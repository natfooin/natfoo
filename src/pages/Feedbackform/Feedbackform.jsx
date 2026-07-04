import React, { useState } from 'react';
import { IoSendOutline } from "react-icons/io5";
import Button from './../../Components/ui/Button/Button';
import './Feedbackform.css';
const Feedbackform = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    contactNumber: '',
    emailAddress: '',
    additionalFeedback: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Feedback Form Data Submitted');
    console.log(formData);
    alert('Feedback submitted successfully! Check the console for data.');
  };

  return (
    <div className="box">
    <div className="feedback-container">
      <div className="feedback-header">
        <h2>Help Us Improve</h2>
        <p>Your taste buds matter. Share your thoughts about your recent snack purchase to help us deliver world-class flavors and quality.</p>
      </div>
      <form className="feedback-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group flex-1">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group flex-1">
            <label htmlFor="mobileNumber">Phone Number</label>
            <div className="phone-input-wrapper">
              <span className="country-code">+91</span>
              <input
              type="text" 
                inputMode="numeric"
                pattern="[0-9]*"
                id="contactNumber"
                name="contactNumber"
                placeholder="Phone Number"
                value={formData.contactNumber}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group flex-1">
            <label htmlFor="emailAddress">Email Address</label>
            <input
              type="email"
              id="emailAddress"
              name="emailAddress"
              placeholder="yourname@example.com"
              value={formData.emailAddress}
              onChange={handleChange}
              required
            />
          </div>
        </div>  
        <div className="form-row">
          <div className="form-group flex-1">
            <label htmlFor="additionalFeedback">Additional Feedback</label>
            <textarea
              id="additionalFeedback"
              name="additionalFeedback"
              placeholder="Tell us more about the taste, crunch, freshness, packaging, or any issues you encountered..."
              value={formData.additionalFeedback}
              onChange={handleChange}
              rows="5"
              required
            ></textarea>
          </div>
        </div>
       <Button text="submit" />
      </form>
    </div>
    </div>
  );
};

export default Feedbackform;