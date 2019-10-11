import React, {Component} from 'react';
import './FriendList.css'
import Friend from '../Friend';
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import * as FriendListActions from "../../store/FriendList/actions";
export default class FriendList extends Component {
    render () {
      var friends = this.props.friends.map((item, index) => {
        console.log(index + " Shit works!");
        return (
          <Friend key={index} friend={item} index={index} removeFriend={this.props.removeFriend}/>
        );
      });
      return (
        <ul className="list-group"> {friends} </ul>
      );
    }
  }
// export default connect(
//     ({ FriendList }) => ({ ...FriendList }),
//     dispatch => bindActionCreators({ ...FriendListActions }, dispatch)
//   )( FriendList );
