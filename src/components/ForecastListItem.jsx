var React = require('react');
var ForecastListItem = React.createClass({

  propTypes: {
    forecast: React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
      forecast: {
        date: "",
        high: "",
        low: "",
        wind: ""
      }
    }
  },

  render: function() {

    var forecastListItemStyle = {
      padding: "12px 16px",
      position: "relative"
    }
    var forecastListDateStyle = {

    }
    var forecastListHighLowStyle = {
      float: "right"
    }
    var forecastListLowStyle = {
      opacity: 0.3,
      marginLeft: 8
    }
    var iconStyle = {
      position: "absolute",
      top: 10,
      left: 170,
      fontSize: 24,
      opacity: 0.3
    }

    var date = this.props.forecast.date || "--",
        high = this.props.forecast.high || "--",
        low = this.props.forecast.low || "--";

    return (
      <div style={forecastListItemStyle}>
        <span style={forecastListDateStyle}>{date}</span>
        <i className={"owf owf-" + this.props.forecast.icon} style={iconStyle}></i>
        <span style={forecastListHighLowStyle}>{high + "\u00b0"} <span style={forecastListLowStyle}>{low + "\u00b0"}</span></span>
      </div>
    );
  }
});

module.exports = ForecastListItem;
