import React, {Component} from 'react';
import './Friend.css'
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import * as friendActions from "../../store/friend/actions";
export default class Friend extends Component {
    constructor(props) {
      super(props);
      this.onClickClose = this.onClickClose.bind(this);
    }
    onClickClose() {
      console.log(this.props.index);
      var index = parseInt(this.props.index);
      this.props.removeFriend(index);
    }

    render () {
      return(
        <li className="list-group-item ">
          <div>
            <span className="glyphicon glyphicon-ok icon" aria-hidden="true"></span>
            {this.props.friend.value}
            <button type="button" className="close" onClick={this.onClickClose}>&times;</button>
          </div>
        </li>
      );
    }
  }
// export default connect(
//     ({ friend }) => ({ ...friend }),
//     dispatch => bindActionCreators({ ...friendActions }, dispatch)
//   )( friend );
