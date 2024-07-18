import React, { Component, createRef } from "react";
import { FaTimes } from "react-icons/fa";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import "./index.css";

class Booking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: null,
      selectedTime: '',
      appointments: [],
      showBookingError: false,
      bookingErrorMsg: '',
      showHistory: false,
    };
    this.timeSectionRef = createRef();
  }

onClickClose = ()=>{
  this.props.history.push('/home');
}

  componentDidMount() {
    this.fetchAppointments();
  }

  fetchAppointments = async () => {
    const url = 'http://localhost:3000/api/appointments';
    const token = localStorage.getItem('token');
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.ok) {
        this.setState({ appointments: data.appointments });
      } else {
        this.setState({ showBookingError: true, bookingErrorMsg: data.error });
      }
    } catch (error) {
      this.setState({ showBookingError: true, bookingErrorMsg: "Failed to fetch appointments." });
    }
  };

  handleDateChange = (date) => {
    this.setState({ selectedDate: date, selectedTime: '', showHistory: false }, () => {
      if (this.timeSectionRef.current) {
        this.timeSectionRef.current.scrollIntoView({ behavior: "smooth" });
      }
    });
    console.log(date)
  };

  handleTimeChange = (time) => {
    this.setState({ selectedTime: time });
  
  };

  bookAppointment = async (event) => {
    event.preventDefault();
    const { selectedDate, selectedTime } = this.state;
 
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth() + 1;
    const day = selectedDate.getDate();
  
    const formattedDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
  
const appointmentDetails = { date: formattedDate, time: selectedTime };
    const url = 'http://localhost:3000/api/appointments';
    const token = localStorage.getItem('token');
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(appointmentDetails),
    };
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.ok) {
        this.setState({ selectedDate: null, selectedTime: '', showHistory: true }, () => {
          this.fetchAppointments();
        });
      } else {
        this.setState({ showBookingError: true, bookingErrorMsg: data.error });
      }
    } catch (error) {
      this.setState({ showBookingError: true, bookingErrorMsg: "Failed to book appointment." });
    }
  };

  render() {
    const { selectedDate, selectedTime, appointments, showBookingError, bookingErrorMsg, showHistory } = this.state;
    const availableTimes = [
      "10:00am", "10:30am", "11:00am", "11:30am", "12:00pm", "12:30pm",
      "2:00pm", "2:30pm", "3:00pm", "3:30pm", "4:00pm", "4:30pm", "5:00pm"
    ];
    const latestAppointments = appointments.slice(-5).reverse();


    return (
      <div className="booking-container">
        <div className="booking-header">
          <h2 className="hello">Hello Client!</h2>
          <FaTimes className="close-icon" onClick={this.onClickClose}/>
        </div>
        <div className="booking-content">
          <div className="intro-section">
            <h3 className="intro-title">Hi, I am Gabbug!</h3>
            <p className="intro-text">Ready for a Quality Software? Let's Dig Deep Into Your Thought!</p>
            <img 
              src="https://res.cloudinary.com/dwwunc51b/image/upload/v1719476389/ai_icon_ekj4k0.png" 
              alt="Gabbug" 
              className="intro-image"
            />
          </div>
          <div className="calendar-section">
            {!selectedDate && !showHistory ? (
              <>
                <h3 className="select-text">Select a Day</h3>
                <Calendar onChange={this.handleDateChange} value={selectedDate} />
                <div className="timezone">
                  <p className="timezone-head">Time zone</p>
                  <p className="ist">India Standard Time (11:04am)</p>
                </div>
              </>
            ) : selectedDate && !selectedTime && !showHistory ? (
              <div id="time-section" className="time-section" ref={this.timeSectionRef}>
                <h2>Select a Time</h2>
                <p>Duration: 30 min</p>
                <div className="time-buttons">
                  {availableTimes.map(time => (
                    <button key={time} className="time-button" onClick={() => this.handleTimeChange(time)}>
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            ) : selectedTime ? (
              <div>
                <h3>Selected Date: {selectedDate.toDateString()}</h3>
                <h3>Selected Time: {selectedTime}</h3>
                <button className="appoint-btn" onClick={this.bookAppointment}>Confirm Appointment</button>
              </div>
            ) : showHistory ? (
              <div className="appointment-history">
                <h2 className="booked">Booked Appointments</h2>
                <ul>
                  {latestAppointments.map((appointment, index) => (
                    <li className="li" key={index}>{appointment.date} at {appointment.time}</li>
                  ))}
                </ul>
                <button className="appoint-btn" onClick={() => this.setState({ selectedDate: null, selectedTime: '', showHistory: false })}>New Appointment</button>
              </div>
            ) : null}
            {showBookingError && <p className="booking-error">{bookingErrorMsg}</p>}
          </div>
        </div>
      </div>
    );
  }
}

export default Booking;
