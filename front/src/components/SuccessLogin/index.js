import {Component} from 'react'

import CalendarComponent from '../calender'

import './index.css'

class Home extends Component {
  state = {
    date: '',
    time: '',
    appointments: [],
    showBookingError: false,
    bookingErrorMsg: '',
  }

  componentDidMount() {
    this.fetchAppointments()
  }

  fetchAppointments = async () => {
    const url = 'http://localhost:3000/api/appointments'
    const token = localStorage.getItem('token')
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      this.setState({appointments: data.appointments})
    } else {
      this.setState({showBookingError: true, bookingErrorMsg: data.error})
    }
  }

  onChangeDate = event => {
    this.setState({date: event.target.value})
  }

  onChangeTime = event => {
    this.setState({time: event.target.value})
  }

  bookAppointment = async event => {
    event.preventDefault()
    const {date, time} = this.state
    const appointmentDetails = {date, time}
    const url = 'http://localhost:3000/api/appointments'
    const token = localStorage.getItem('token')
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(appointmentDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      this.fetchAppointments()
    } else {
      this.setState({showBookingError: true, bookingErrorMsg: data.error})
    }
  }

  render() {
    const {date, time, appointments, showBookingError, bookingErrorMsg} = this.state

    return (
      <div className="home-container">
        <h1>Book Appointment</h1>
        <form onSubmit={this.bookAppointment}>
          <label htmlFor="date">Date</label>
          <input type="date" id="date" value={date} onChange={this.onChangeDate} required />
          <label htmlFor="time">Time</label>
          <input type="time" id="time" value={time} onChange={this.onChangeTime} required />
          <button type="submit">Book</button>
        </form>

        <CalendarComponent />

        {showBookingError && <p className="error-message">*{bookingErrorMsg}</p>}

        <h1>Appointment History</h1>
        <ul>
          {appointments.map(appointment => (
            <li key={appointment.id}>
              {appointment.date} at {appointment.time}
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default Home
