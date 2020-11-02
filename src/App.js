import React, { useState, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar'
import UserItem from './components/users/UserItem'
import Users from './components/users/Users'
import User from './components/users/User'
import axios from 'axios'
import Search from './components/users/Search'
import Alert from './components/layout/Alert'
import About from './components/pages/About'

const App = () => {
  const [users, setUsers] = useState([])
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState(null)
  const [repos, setRepos] = useState([])
  
  //search github users
  const searchUsers = async (text) => {
    setLoading(true)

    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    
    setUsers(res.data.items)
    setLoading(false)
  }

//Get single user
  const getUser = async (username) => {
    this.setState({loading: true})

    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    )

    setLoading(false)
    setUser(res.data)
  }

//Get user's repos
const getUserRepos = async (username) => {
  this.setState({loading: true})

  const res = await axios.get(
    `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
  )

  this.setState({loading: false, repos: res.data})
  setLoading(false)
  setRepos(res.data)
}




//Clear users from state
  const clearUsers = () => {
    setUsers([])
    setLoading(false)
  }

//Set alert
  const showAlert = (msg, type) => {
    this.setState({alert: {msg, type}})
    setAlert({msg, type})
    setTimeout(() => setAlert(null), 5000)
  }

  return (
    <Router>
    <div className="App">
      <Navbar />
        <div className="container">
          <Alert alert={alert}/>
          <Switch>
            <Route exact path='/' render={props => (
              <Fragment>
                <Search 
                  searchUsers={searchUsers} 
                  clearUsers={clearUsers}
                  showClear={users.length > 0 ? true : false}
                  setAlert={showAlert}  
                />
                <Users loading={loading} users={users}/>   
              </Fragment>
            )} />
            <Route exact path='/about' component={About}/>
            <Route exact path='/user/:login' render={props => (
              <User {...props} 
              getUser={getUser} 
              user={user} 
              loading={loading}
              getUserRepos={getUserRepos}
              repos={repos}
              />
            )}/>
          </Switch>

        </div>
      
    </div>
    </Router>
    
  );
  
  

}

export default App;
