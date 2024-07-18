import {Route, Switch, BrowserRouter, Redirect} from 'react-router-dom'

import Login from "./components/login"
import Booking from"./components/calender"
import Home from './components/home'
import Contact from './components/contact'
import NotFound from './components/notfound'
import ProtectedRoute from './components/protectedRoute'
import "./App.css"

const App = ()=> {
return(
      <BrowserRouter>
      <Switch>
          <Route exact path="/" component={Login} />
          <ProtectedRoute exact path="/home" component={Home} />
          <ProtectedRoute exact path="/contact" component={Contact} />
          <ProtectedRoute exact path="/appointment" component={Booking} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
      </Switch>
      </BrowserRouter>
)
}

export default App;