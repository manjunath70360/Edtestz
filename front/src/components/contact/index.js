import React from 'react';
import './index.css';
import { FaWhatsapp } from 'react-icons/fa';
import CollapsibleExample from '../navbar'; 

const Contact = ({ history }) => {
  const toAppointment = () => {
    history.push('/appointment');
  };

  return (
    <div className="contact-container">
      <CollapsibleExample />
      <div className="background-image"></div>

      <div className="contact-content">
        <h1 className="head-contact">DROP BY OR SAY HELLO!</h1>
        <h1 className="sub-contact">WhatsApp Us Your Requirement!</h1>
        <button type="button" className="contact-btn" onClick={() => toAppointment()}>
          <FaWhatsapp size={24} className="whatsapp-icon" />
          +1(619) 630 5034
        </button>
      </div>

      <img
        src="https://res.cloudinary.com/dwwunc51b/image/upload/v1719480448/help_bug-removebg-preview_hfyrvm.png"
        onClick={toAppointment}
        className="bug-img"
        alt="bug"
      />
    </div>
  );
};

export default Contact;
