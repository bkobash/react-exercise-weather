var React = require("react");

var ForecastToday = React.createClass({

  propTypes: {
    city: React.PropTypes.string,
    forecast: React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
      city: "",
      forecast: {
        date: "",
        current: "",
        high: "",
        low: "",
        wind: ""
      }
    }
  },

  render: function() {

    var todayStyle = {
      boxSizing: "border-box",
      height: 200,
      padding: 16,
      fontSize: 16,
      overflow: "hidden"
    };

    var cityStyle = {
      font: "500 16px HelveticaNeue-Medium"
    }

    var dataStyle = {
      opacity: this.props.loaded ? 1 : 0,
      transform: this.props.loaded ? "translate3d(0, 0, 0)" : "translate3d(0, 40px, 0)",
      transition: "opacity 0.5s, transform 0.2s"
    }

    var currentStyle = {
      font: "500 64px HelveticaNeue-Medium",
      marginTop: 48
    };

    var iconStyle = {
      verticalAlign: "middle"
    }

    var highLowStyle = {

    };

    var lowStyle = {
      marginLeft: 16,
      opacity: 0.5
    };

    var windStyle = {
      marginLeft: 16,
      opacity: 0.5
    };

    var current = this.props.forecast.current ? this.props.forecast.current + "\u00b0" : "",
        high = this.props.forecast.high ? this.props.forecast.high + "\u00b0" : "",
        low = this.props.forecast.low ? this.props.forecast.low + "\u00b0" : "",
        wind = this.props.forecast.wind ? this.props.forecast.wind + "mph" : "";

    return (
      <div style={todayStyle}>
        <div style={cityStyle}>{this.props.city}</div>
        <div style={dataStyle}>
          <div style={currentStyle}><i className={"owf owf-" + this.props.forecast.icon} style={iconStyle}></i> {current}</div>
          <div style={highLowStyle}>
            {high}
            <span style={lowStyle}>{low}</span>
            <span style={windStyle}>{wind}</span>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = ForecastToday;
