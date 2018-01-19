import React, {Component} from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      friends: [
        {
          name: 'Loading Friends...'
        }
      ],
      newFriend: {
        name: null,
        age: null,
        email: null
      }
    }
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleAgeChange = this.handleAgeChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.addNewFriend = this.addNewFriend.bind(this);
    this.deleteFriend = this.deleteFriend.bind(this);
  }

  componentDidMount() {
    const url = "http://localhost:5000/friends";
    axios.get(url).then(response => this.setState({friends: response.data})).catch(err => console.log(err));
  }

  handleNameChange(e) {
    const name = e.target.value;
    this.setState({
      newFriend: {
        name,
        age: this.state.newFriend.age,
        email: this.state.newFriend.email
      }
    })
  }

  handleAgeChange(e) {
    const age = e.target.value;
    this.setState({
      newFriend: {
        age,
        name: this.state.newFriend.name,
        email: this.state.newFriend.email
      }
    })
  }

  handleEmailChange(e) {
    const email = e.target.value;
    this.setState({
      newFriend: {
        email,
        name: this.state.newFriend.name,
        age: this.state.newFriend.age
      }
    })
  }

  addNewFriend(e) {
    e.preventDefault();
    const newFriend = this.state.newFriend;
    const url = "http://localhost:5000/friends";
    //axios post url (info) then catch
    axios.post(url, newFriend).then(response => {
      this.setState({friends: response.data})
    }).catch(err => console.log(err))
  }

  deleteFriend(e) {
    const id = e.target.id;
    const url = "http://localhost:5000/friends/";
    axios.delete(url + id).then(response => {
      this.setState({friends: response.data})
    }).catch(err => console.log(err))
  }

  render() {
    return (<div className="App">
      <h1>App</h1>
      <form onSubmit={this.addNewFriend}>
        <input type='string' placeholder='Name' required="required" onChange={this.handleNameChange}></input>
        <input type='number' placeholder='Age' required="required" onChange={this.handleAgeChange}></input>
        <input type='email' placeholder='email' required="required" onChange={this.handleEmailChange}></input>
        <button onClick={this.addNewFriend}>Add Friend</button>
      </form>
      <ul>
        {
          this.state.friends.map(friend => {
            return <li key={friend.id}>
              <div>{friend.name}</div>
              <div>{friend.age}</div>
              <div>{friend.email}</div>
              <button onClick={this.deleteFriend} id={friend.id}>delete</button>
            </li>
          })
        }
      </ul>
    </div>);
  }
}

export default App;
