import React, { Component } from 'react'

class UserItem extends Component {
  state = {
      id: 'id',
      login: 'mojombo',
      avatar_url: 'https://lh3.googleusercontent.com/proxy/5JTUZg97JrcnLtTX4eVcXdxVXndkz0sC2-kp6c3plsCa2ci_triH9vUMUXA5Pg1_ftms0pOfsemocGVRHnH5pj90VymnbTGrx5q_mV3-x7A',
      html_url: 'https://github.com/mojombo'
  }
  


  render() {

    const {login, avatar_url, html_url} = this.state
    return (
      <div className="card text-center">
        <img src={avatar_url} alt="" className='round-img' style={{width: '60px'}}/>
        <h3>{login}</h3>

        <div>
          <a href={html_url} className="btn btn-dark btn-sm my-1">More</a>
        </div>
      </div>
    )
  }
}

export default UserItem
