import React, {Component} from 'react';
import $ from 'jquery';
import './FriendForm.css'
export default class FriendForm extends Component {

    constructor(props) {
      super(props);
      this.onSubmit = this.onSubmit.bind(this);
      this.state = {places: []};
      console.log(this.state.places);
    }

    sortByCity(property) {
      return function(a, b) {
        if (a[property] > b[property]) return 1;
        else if (a[property] < b[property]) return -1;
        return 0;
      }
    }

    initPlaces() {
      fetch("https://www.skyscanner.net/g/chiron/api/v1/places/geo/v1.0", {
        method: 'GET',
        headers: {
          'api-key': 'skyscanner-hackupc2019'
        }
      }).then(response => response.json())
      .then((responseData) => {
        var citiesArray = [];
        responseData["Continents"].forEach(function(country) {
          country["Countries"].forEach(function(cities) {
            cities["Cities"].forEach(function(city) { 
              var jsonTemp = {};
              jsonTemp["Name"] = city["Name"];
              jsonTemp["Country"] = cities["Name"];
              
              var jsonCityAirports=[];
              city["Airports"].forEach(function(airport) {
                jsonCityAirports.push({name: airport["Name"], location: airport["Location"]});
              });

              jsonTemp["Airports"] = jsonCityAirports;
              citiesArray.push(jsonTemp);
            });
          });
        });
        citiesArray.sort(this.sortByCity("Name"));
        console.log(citiesArray);

        var result;
        var select = $('<div class="dropdown" title="Search Origin" style="display: block !important;"></div>');
        var dropdown = $('<button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Dropdown button</button>');
        var options = $('<div class="dropdown-menu scrollable-menu" aria-labelledby="dropdownMenuButton"></div');

        citiesArray.forEach(function(city){
          options.append($('<a class="dropdown-item" href="#"> <b>'+city['Name']+"</b><p>"+city['Country']+"</p></a>"));
        });

        select.append(dropdown);
        select.append(options);
        $('#selectDropdown').append(select);
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
          <div id="selectDropdown"></div>
          <button class="btn btn-info success my-2 my-sm-0" type="submit">Add</button>
        </form>
      );
    }
  }
