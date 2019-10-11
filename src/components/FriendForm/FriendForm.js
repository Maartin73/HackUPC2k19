import React, {Component} from 'react';
import './FriendForm.css'
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import * as FriendFormActions from "../../store/FriendForm/actions";
export default class FriendForm extends Component {
    constructor(props) {
      super(props);
      this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
      this.refs.friendName.focus();
    }

    onSubmit(event) {
      event.preventDefault();
      var newFriendValue = this.refs.friendName.value;

      if(newFriendValue) {
        this.props.addFriend({newFriendValue});
        this.refs.form.reset();
      }
    }
    render () {
      return (
        <form ref="form" class="form-inline pt-md-3 pl-md-5" onSubmit={this.onSubmit}>
          <input class="form-control mr-sm-2" type="search" ref="friendName" placeholder="Name" aria-label="Search"></input>
          <input class="form-control mr-sm-2" type="search" ref="friendOrigin" placeholder="Origin" aria-label="Search"></input>
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Add</button>
        </form>
        // <form ref="form" onSubmit={this.onSubmit} className="form-inline">
        //   <input type="text" ref="itemName" className="form-control" placeholder="add a new todo..."/>
        //   <button type="submit" className="btn btn-default">Add</button>
        // </form>
      );
    }
  }
// export default connect(
//     ({ FriendForm }) => ({ ...FriendForm }),
//     dispatch => bindActionCreators({ ...FriendFormActions }, dispatch)
//   )( FriendForm );
