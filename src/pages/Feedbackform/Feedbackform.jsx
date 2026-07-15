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

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewAnswers, setReviewAnswers] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleStarClick = (starValue) => {
    setRating(starValue);
    setReviewAnswers({}); 
    
  };

  const handleOptionClick = (questionId, option) => {
    setReviewAnswers((prev) => ({
      ...prev,
      [questionId]: option,
    }));
  };

  const negativeQuestions = [
    { id: "q1", label: "What aspect of the snack disappointed you the most?" ,newID:"N1"},
    { id: "q2", label: "How can we improve this product to meet your expectations?" ,newID:"N2"},
    { id: "q3_neg", label: "Would you give this flavor another chance if we modified it?" ,newID:"N3"},
  ];

  const positiveQuestions = [
    { id: "q3_pos", label: "What did you love most about your recent snack purchase?" ,newID:"P1"},
    { id: "q4", label: "How often do you see yourself purchasing this item?" ,newID:"P2"},
    { id: "q5", label: "Any creative flavor suggestions you would like us to launch next?" ,newID:"P3"},
  ];

  const activeQuestions = rating > 0 ? (rating <= 3 ? negativeQuestions : positiveQuestions) : [];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (rating === 0) {
      alert('Please select a rating before submitting.');
      return;
    }

    const totalQuestions = activeQuestions.length;
    const answeredCount = Object.keys(reviewAnswers).filter(key => reviewAnswers[key]).length;

    if (answeredCount < totalQuestions) {
      alert('Please answer all the review questions before submitting.');
      return;
    }

    const structuredReviewAnswers = {};

    negativeQuestions.forEach(q => {
      structuredReviewAnswers[q.newID] = (rating <= 3) ? (reviewAnswers[q.id] || "") : "";
    });

    positiveQuestions.forEach(q => {
      structuredReviewAnswers[q.newID] = (rating > 3) ? (reviewAnswers[q.id] || "") : "";
    });

    const finalFormSubmissionData = {
      fullName: formData.fullName,
      contactNumber: `+91 ${formData.contactNumber}`,
      emailAddress: formData.emailAddress,
      additionalFeedback: formData.additionalFeedback,
      starRating: rating,
      allReviewAnswers: structuredReviewAnswers
    };

    console.log('--- FORM INPUT DATA ---');
    console.log(finalFormSubmissionData);
    console.log('------------------------------------');

    alert('Feedback and review submitted successfully! Check your browser console for full details.');
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
              <label htmlFor="fullName">Full Name <span className="required-dot">*</span></label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Name"
                value={formData.fullName}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group flex-1">
              <label htmlFor="contactNumber">Phone Number <span className="required-dot">*</span></label>
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
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="emailAddress">Email Address <span className="required-dot">*</span></label>
              <input
                type="email"
                id="emailAddress"
                name="emailAddress"
                placeholder="yourname@example.com"
                value={formData.emailAddress}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>  

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="additionalFeedback">Feedback <span className="required-dot">*</span></label>
              <textarea
                id="additionalFeedback"
                name="additionalFeedback"
                placeholder="Tell us more about the taste, crunch, freshness, packaging, or any issues you encountered..."
                value={formData.additionalFeedback}
                onChange={handleInputChange}
                rows="5"
                required
              ></textarea>
            </div>
          </div>

          <div className="review-section-wrapper">
            <div className="form-group rating-group">
              <label>Rating <span className="required-dot">*</span></label>
              <div className="star-rating-container">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    className={`star-button ${(hoverRating || rating) >= star ? "active" : ""}`}
                    onClick={() => handleStarClick(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                  >
                    ★
                  </button>
                ))}
              </div>

              {rating > 0 && (
                <span className="rating-badge">
                  {rating} {rating === 1 ? "Star" : "Stars"} rated
                </span>
              )}
            </div>

            {rating > 0 && (
              <div className="conditional-questions-wrapper">
                <div className="section-divider"></div>

                {activeQuestions.map((question) => (
                  <div className="question-row" key={question.id}>
                    <label className="question-label">
                      {question.label} <span className="required-dot">*</span>
                    </label>
                    <div className="option-buttons">
                      {["Bad", "Average", "Good"].map((option) => (
                        <button
                          type="button"
                          key={option}
                          className={`option-btn ${reviewAnswers[question.id] === option ? "selected" : ""}`}
                          onClick={() => handleOptionClick(question.id, option)}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Button text="Submit Feedback" />
        </form>
      </div>
    </div>
  );
};

export default Feedbackform;