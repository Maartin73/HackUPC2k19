import React, {Component} from 'react';
import './App.css'
import { Fragment } from 'react';
import FriendForm from '../FriendForm';
import FriendList from '../FriendList';
import Map from '../../Map.js';

export default class App extends Component {
  

  constructor (props) {
    super(props);
    this.addFriend = this.addFriend.bind(this);
    this.removeFriend = this.removeFriend.bind(this);
    this.friends = this.props.initFriends;
    this.state = {friends: this.friends};

    // Create a request variable and assign a new XMLHttpRequest object to it.
    var request = new XMLHttpRequest()

    // Open a new connection, using the GET request on the URL endpoint
    request.open('GET', 'http://partners.api.skyscanner.net/apiservices/autosuggest/v1.0/UK/GBP/enUS?query=&apiKey=skyscanner-hackupc2019', true)

    request.onload = function() {
      // Begin accessing JSON data here
      var data = JSON.parse(this.response)

      if (request.status >= 200 && request.status < 400) {
        data.forEach(place => {
          console.log(place.PlaceName)
        })
      } else {
        console.log('error')
      }
    }

    // Send request
    request.send()
  }

  addFriend(friend) {
    this.friends.unshift({
      index: this.friends.length+1,
      value: friend.newFriendValue
    });
    this.setState({friends: this.friends});
  }

  removeFriend(friendIndex) {
    console.log(this.friends);
    this.friends.splice(friendIndex, 1);
    console.log(this.friends);
    this.setState({friends: this.friends});
  }

    render() {
      return (
        <Fragment>
          <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <h1>RepliScanner</h1>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
          </nav>
          <div class="row justify-content-center bg-secondary">
            <div class="col-5 justify-content-center align-items-center pt-md-3 pl-md-5 pb-md-3">
              <div class="row justify-content-center align-items-center">
                <FriendForm addFriend={this.addFriend} />
              </div>
              <div class="row justify-content-center align-items-center pt-md-3 pl-md-5">
                <FriendList friends={this.props.initFriends} removeFriend={this.removeFriend}/>
              </div>
              <div class="row justify-content-center align-items-center pt-md-3 pl-md-5">
                <a href="#" class="btn btn-info btn-lg"> Search </a>
              </div>
            </div>
            <div class="col justify-content-center align-items-center pt-md-3 pl-md-5 pb-md-3">
              <Map/>
            </div>
          </div>
        </Fragment>
      );
    }
  };
