var React = require("react");
var WeatherPanel = require("./WeatherPanel.jsx");

var WeatherPanelCollection = React.createClass({

  render: function() {
    return(
      <div>
        <WeatherPanel city="San Francisco, CA" color="#400090" autoLoad={true} />
        <WeatherPanel city="London, UK" color="#333333" />
        <WeatherPanel city="New York, NY" color="#ff6600" />
        <WeatherPanel city="Tokyo, JP" color="#38a2ed" />
        <WeatherPanel city="Camarillo, CA" color="#98b04f" />
        <WeatherPanel city="Paris, FR" color="#e35080" />
        <WeatherPanel city="Mumbai, IN" color="#e4bf46" />
        <WeatherPanel city="Sydney, AU" color="#67767d" />
      </div>
    );
  }

});

module.exports = WeatherPanelCollection;
