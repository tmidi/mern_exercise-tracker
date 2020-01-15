import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component {
  constructor(props) {
    super(props);

    // To set 'this' to use this class
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: ''
    };
  }

  componentDidMount() {
    this.setState({
      users: ['test user'],
      username: 'test user'
    });
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      username: this.state.username
    };

    console.log(user);

    axios
      .post('http://localhost:5000/users/add', user)
      .then(res => console.log(res.data));

    this.setState({
      username: ''
    });
  }

  render() {
    return (
      <div>
        <h3>Create New User</h3>
        <form onSubmit={this.onSubmit}>
          <div className='form-group'>
            <label>Username: </label>
            <input
              className='form-control'
              type='text'
              onChange={this.onChangeUsername}
              value={this.state.username}
            />
          </div>
          <div className='form-group'>
            <input
              type='submit'
              value='Create User'
              className='btn btn-primary'
            />
          </div>
        </form>
      </div>
    );
  }
}
