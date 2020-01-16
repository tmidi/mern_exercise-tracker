import React, { Component } from 'react';
import axios from 'axios';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    // Bindings
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      username: this.refs.username.value,
      password: this.refs.password.value
    };

    axios
      .post('http://localhost:5000/users/login', user)
      .catch(err => console.log(err));
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <h3>Sign In</h3>

        <div className='form-group'>
          <label>Email address</label>
          <input
            type='text'
            className='form-control'
            placeholder='Enter email'
            name='username'
            ref='username'
          />
        </div>

        <div className='form-group'>
          <label>Password</label>
          <input
            type='password'
            className='form-control'
            placeholder='Enter password'
            name='password'
            ref='password'
          />
        </div>
        <div className='form-group'>
          <input type='submit' value='Login' className='btn btn-primary' />
        </div>
      </form>
    );
  }
}
