var React = require('react');
var ForecastToday = require('./ForecastToday.jsx');
var ForecastListItem = require('./ForecastListItem.jsx');
var HTTP = require("../services/httpservice");

var List = React.createClass({

  propTypes: {
    city: React.PropTypes.string,
    color: React.PropTypes.string,
    autoLoad: React.PropTypes.bool
  },

  getDefaultProps: function() {
    return {
      city: "San Francisco",
      color: "#000000",
      autoLoad: false
    }
  },

  getInitialState: function() {
    return {
      loaded: false,
      weatherData: [],
      city: "",
      country: "",
      currentForecast: {},
      fiveDayForecast: []
    }
  },

  // componentWillMount() : component is now ready, state can be populated with data
  componentWillMount: function() {

    if (this.props.autoLoad) {
      this.loadPanel();
    }

  },

  updateDays: function() {

    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var formattedDays = [];

    function generateDayData(d) {

      var day = {};
      var date = new Date(d.dt * 1000);

      day.date = date.getDate() + " " + months[date.getMonth()];
      day.time = date.getHours() + ":" + date.getMinutes();
      day.icon = d.weather[0].id;
      day.current = Math.floor(d.temp.day);
      day.high = Math.floor(d.temp.max);
      day.low = Math.floor(d.temp.min);
      day.wind = Math.floor(d.speed);

      return day;
    }

    for (var i = 1; i < 6; i++) {
      formattedDays.push(generateDayData(this.state.weatherData[i]));
    }
    this.setState({
      currentForecast: generateDayData(this.state.weatherData[0]),
      fiveDayForecast: formattedDays
    });
  },

  loadPanel: function() {
    var requestUri = "/forecast/daily?q=";
    requestUri += encodeURIComponent(this.props.city);
    requestUri += "&mode=json&units=imperial&appid=44db6a862fba0b067b1930da0d769e98"
    HTTP.get(requestUri)
      .then(function(data) { //JSON from httpservice.js gets passed in as data
        this.setState({
          city: data.city.name,
          country: data.city.country,
          weatherData: data.list,
          loaded: true
        });
        this.updateDays();
      }.bind(this)); // have to add bind() to make sure scope for this.setState() is correct
  },

  createForecastListItem: function(obj, index) {
    return (
      <ForecastListItem key={index} forecast={obj} />
    );
  },

  render: function() {

    var weatherPanelStyle = {
      width: 300,
      height: 440,
      float: "left",
      margin: "24px 0 0 24px",
      backgroundColor: this.props.color,
      color: "white",
      borderRadius: 6,
      overflow: "hidden",
      font: "500 14px HelveticaNeue-Medium, HelveticaNeue, Helvetica-Neue, Helvetica, sans-serif"
    };

    var fiveDayForecastStyle = {
      transform: this.state.loaded ? "translate3d(0, 0, 0)" : "translate3d(0, 240px, 0)",
      transition: "transform 0.2s",
      padding: "12px 0",
      height: 240,
      boxSizing: "border-box",
      color: "#333333",
      backgroundColor: "#f6f6f6"
    };

    var loadStyle = {
      display: this.state.loaded ? "none" : "block",
      height: 240,
      textAlign: "center"
    }

    var loadButtonStyle = {
      background: "none",
      border: "solid 1px rgba(255, 255, 255, 0.5)",
      padding: "8px 16px",
      borderRadius: 4,
      cursor: "pointer"
    }

    return (
      <div style={weatherPanelStyle}>
        <ForecastToday city={this.props.city} forecast={this.state.currentForecast} color={this.props.color} loaded={this.state.loaded} />
        <div onClick={this.loadPanel} style={loadStyle}><a style={loadButtonStyle}>Load</a></div>
        <div style={fiveDayForecastStyle}>
          {this.state.fiveDayForecast.map(this.createForecastListItem)}
        </div>
      </div>
    );

  }

});

module.exports = List;
