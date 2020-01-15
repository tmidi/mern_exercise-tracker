import React, { Component } from 'react';
import axios from 'axios';

export default class Login extends Component {
  constructor(props) {
    super(props);

    // To set 'this' to use this class
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      password: ''
    };
  }
  onSubmit(e) {
    e.preventDefault();

    const user = {
      username: this.state.username,
      password: this.state.password
    };

    console.log(user);

    axios
      .post('http://localhost:5000/users/login', user)
      .then(err => console.log(err));
  }

  render() {
    return (
      <form>
        <h3>Sign In</h3>

        <div className='form-group'>
          <label>Email address</label>
          <input
            type='email'
            className='form-control'
            placeholder='Enter email'
          />
        </div>

        <div className='form-group'>
          <label>Password</label>
          <input
            type='password'
            className='form-control'
            placeholder='Enter password'
          />
        </div>
        <div className='form-group'>
          <input type='submit' value='Login' className='btn btn-primary' />
        </div>
      </form>
    );
  }
}
