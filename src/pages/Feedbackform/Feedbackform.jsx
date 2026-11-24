import React, { useState } from 'react';
import { IoSendOutline } from "react-icons/io5";
import Button from './../../Components/ui/Button/Button';
import './Feedbackform.css';

const Feedbackform = () => {
  const [isTravelling, setIsTravelling] = useState(true);

  const [formData, setFormData] = useState({
    fullName: '',
    contactNumber: '',
    emailAddress: '',
    trainNumber: '',
    seatNumber: '',
    coachNumber: '',
    pnrNumber: '',
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
    {
      id: "q1",
      label: "How would you rate the taste and seasoning of the snack?",
      newID: "N1"
    },
    {
      id: "q2",
      label: "How was the freshness and crunchiness of the product?",
      newID: "N2"
    },
    {
      id: "q3_neg",
      label: "How would you rate the packaging condition and sealing?",
      newID: "N3"
    },
  ];

  const positiveQuestions = [
    {
      id: "q3_pos",
      label: "How would you rate the overall flavor and crispiness?",
      newID: "P1"
    },
    {
      id: "q4",
      label: "How satisfied are you with the quantity and value for money?",
      newID: "P2"
    },
    {
      id: "q5",
      label: "How would you rate the packaging quality and delivery condition?",
      newID: "P3"
    },
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
      travelStatus: isTravelling ? 'Travelling' : 'Not Travelling',
      fullName: formData.fullName,
      contactNumber: `+91 ${formData.contactNumber}`,
      emailAddress: formData.emailAddress,
      ...(isTravelling && {
        trainNumber: formData.trainNumber,
        coachNumber: formData.coachNumber,
        seatNumber: formData.seatNumber,
        pnrNumber: formData.pnrNumber,
      }),
      additionalFeedback: formData.additionalFeedback,
      starRating: rating,
      allReviewAnswers: structuredReviewAnswers
    };

    console.log('--- FORM INPUT DATA ---');
    console.log(finalFormSubmissionData);
    console.log('------------------------------------');

    alert('Feedback and review submitted successfully!');
  };

  return (
    <div className="box">
      <div className="feedback-container">
        <div className="feedback-header">
          <h2>Help Us Improve</h2>
          <p>Your taste buds matter. Share your thoughts about your recent snack purchase to help us deliver world-class flavors and quality.</p>
        </div>

        {/* Mode Switch Centered Below Header */}
        <div className="mode-switch-wrapper">
          <div className="mode-switch">
            <button
              type="button"
              className={`switch-btn ${isTravelling ? 'active' : ''}`}
              onClick={() => setIsTravelling(true)}
            >
              Travelling
            </button>
            <button
              type="button"
              className={`switch-btn ${!isTravelling ? 'active' : ''}`}
              onClick={() => setIsTravelling(false)}
            >
              Not Travelling
            </button>
          </div>
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

          {/* Conditional Train Travel Details */}
          {isTravelling && (
            <div className="travel-details-wrapper">
              <div className="form-row">
                <div className="form-group flex-1">
                  <label htmlFor="trainNumber">Train Number / Name <span className="required-dot">*</span></label>
                  <input
                    type="text"
                    id="trainNumber"
                    name="trainNumber"
                    placeholder="e.g. 12627 / Karnataka Exp"
                    value={formData.trainNumber}
                    onChange={handleInputChange}
                    required={isTravelling}
                  />
                </div>

                <div className="form-group flex-1">
                  <label htmlFor="coachNumber">Coach Number <span className="required-dot">*</span></label>
                  <input
                    type="text"
                    id="coachNumber"
                    name="coachNumber"
                    placeholder="e.g. B2, S4, A1"
                    value={formData.coachNumber}
                    onChange={handleInputChange}
                    required={isTravelling}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group flex-1">
                  <label htmlFor="seatNumber">Seat / Berth Number <span className="required-dot">*</span></label>
                  <input
                    type="text"
                    id="seatNumber"
                    name="seatNumber"
                    placeholder="e.g. 42 (Lower)"
                    value={formData.seatNumber}
                    onChange={handleInputChange}
                    required={isTravelling}
                  />
                </div>

                <div className="form-group flex-1">
                  <label htmlFor="pnrNumber">PNR Number (Optional)</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength="10"
                    id="pnrNumber"
                    name="pnrNumber"
                    placeholder="10-digit PNR"
                    value={formData.pnrNumber}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          )}

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