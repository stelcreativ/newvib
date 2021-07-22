import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar from './navigation/Navbar'
import Home from './components/Home'
import Profile from './components/users/Profile'
import EditProfil from './components/sharing/EditProfil'
import PostShare from './components/sharing/PostShare'
import SignUp from './components/auth/SignUp'
import SignIn from './components/auth/SignIn'
import ForgotPassword from './components/auth/ForgotPassword'
import { AuthProvider } from './components/auth/Auth'
import PrivateRoute from "./components/auth/PrivateRoute"
import './App.css';


function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <div className="App">
            <Navbar />
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/signup' component={SignUp} />
              <Route path='/signin' component={SignIn} />
              <PrivateRoute path='/profile' component={Profile} />
              <PrivateRoute path='/editprofil' component={EditProfil} />
              <Route path='/forgot-password' component={ForgotPassword} />
              <Route path='/postshare' component={PostShare} />
            </Switch>

          </div>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
