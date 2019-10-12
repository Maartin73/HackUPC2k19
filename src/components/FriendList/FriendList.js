import React, {Component} from 'react';
import './FriendList.css'
import Friend from '../Friend';
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import * as FriendListActions from "../../store/FriendList/actions";
export default class FriendList extends Component {
    render () {
      var friends = this.props.friends.map((item, index) => {
        return (
          <div class="m-1">
            <Friend key={index} friend={item} index={index} removeFriend={this.props.removeFriend}/>
          </div>
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
