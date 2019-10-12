import React, {Component} from 'react';
import $ from 'jquery';
import './FriendForm.css'
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import * as FriendFormActions from "../../store/FriendForm/actions";
export default class FriendForm extends Component {

    constructor(props) {
      super(props);
      this.onSubmit = this.onSubmit.bind(this);
      this.state = {places: []};
      console.log(this.state.places);
      console.log("done");
    }

    initPlaces() {
      fetch("https://www.skyscanner.net/g/chiron/api/v1/places/geo/v1.0", {
        method: 'GET',
        headers: {
          'api-key': 'skyscanner-hackupc2019'
        }
      }).then(response => response.json())
      .then((responseData) => {
        var result = [];
        var select = $('<select class="selectpicker" data-live-search="true" title="Search Origin"></select>');
        var jsonCityAirports;
        responseData["Continents"].forEach(function(country) {
          country["Countries"].forEach(function(cities) {
            cities["Cities"].forEach(function(city) {
              var jsonTemp ={};
              jsonTemp["Name"] = city["Name"];
              select.append($("<option>"+city['Name']+"</option>"));
              jsonCityAirports = [];
              city["Airports"].forEach(function(airport) {
                jsonCityAirports.push({name: airport["Name"], location: airport["Location"]});
              });
              jsonTemp["Airports"] = jsonCityAirports;
              result.push(jsonTemp);
            });
          });
        });
        this.setState({places: result});
        console.log(result);
        $('#form').append(select);
        $('.selectpicker').selectpicker('refresh');
      })
      .catch(error => console.log(error));
    }

    componentDidMount() {
      this.refs.friendName.focus();
      this.initPlaces();
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
        <form id="form" ref="form" class="form-inline pt-md-3 pl-md-5" onSubmit={this.onSubmit}>
          <input class="form-control mr-sm-2" type="search" ref="friendName" placeholder="Name" aria-label="Search"></input>
          // <select class="selectpicker" data-live-search="true" title="Search Origin">
          //   <option data-tokens="ketchup mustard">Hot Dog, Fries and a Soda</option>
          //   <option data-tokens="mustard">Burger, Shake and a Smile</option>
          //   <option data-tokens="frosting">Sugar, Spice and all things nice</option>
          // </select>
          // <input class="form-control mr-sm-2" type="search" ref="friendOrigin" placeholder="Origin" aria-label="Search"></input>
          <button class="btn btn-info success my-2 my-sm-0" type="submit">Add</button>
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
