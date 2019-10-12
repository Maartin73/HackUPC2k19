import React, {Component} from 'react';
import './App.css'
import { Fragment } from 'react';
import FriendForm from '../FriendForm';
import FriendList from '../FriendList';
import Map from '../../Map.js';
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import * as AppActions from "../../store/App/actions";
export default class App extends Component {

  constructor (props) {
    super(props);
    this.addFriend = this.addFriend.bind(this);
    this.removeFriend = this.removeFriend.bind(this);
    this.friends = this.props.initFriends;
    this.state = {friends: this.friends};
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
          <div class="row ">
            <div class="col-5">
              <div class="row justify-content-center align-items-center">
                <FriendForm addFriend={this.addFriend} />
              </div>
              <div class="row justify-content-center align-items-center pt-md-3 pl-md-5">
                <FriendList friends={this.props.initFriends} removeFriend={this.removeFriend}/>
              </div>
              <div class="row justify-content-center align-items-center pt-md-3 pl-md-5">
                <a href="#" class="btn btn-info btn-lg">
                  <span class="glyphicon glyphicon-plus-sign"></span> Search
                </a>
              </div>
            </div>
            <div class="col"></div>
          </div>
          <Map/>
        </Fragment>
      );
    }
  }
// export default connect(
//     ({ App }) => ({ ...App }),
//     dispatch => bindActionCreators({ ...AppActions }, dispatch)
//   )( App );
