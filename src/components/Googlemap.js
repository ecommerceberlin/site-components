import React from 'react';
import GoogleMapReact from 'google-map-react';

import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  wrapper: {
    position: 'relative'
  },
  container: {
    position: 'absolute',
    height: 700,
    width: '100%',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 1
  }
});

const AnyReactComponent = ({ text }) => (
  <div style={{ width: 50, height: 40, backgroundColor: 'blue' }}>{text}</div>
);

function createMapOptions(maps) {
  // next props are exposed at maps
  // "Animation", "ControlPosition", "MapTypeControlStyle", "MapTypeId",
  // "NavigationControlStyle", "ScaleControlStyle", "StrokePosition", "SymbolPath", "ZoomControlStyle",
  // "DirectionsStatus", "DirectionsTravelMode", "DirectionsUnitSystem", "DistanceMatrixStatus",
  // "DistanceMatrixElementStatus", "ElevationStatus", "GeocoderLocationType", "GeocoderStatus", "KmlLayerStatus",
  // "MaxZoomStatus", "StreetViewStatus", "TransitMode", "TransitRoutePreference", "TravelMode", "UnitSystem"
  return {
    zoomControlOptions: {
      position: maps.ControlPosition.RIGHT_CENTER,
      style: maps.ZoomControlStyle.SMALL
    },
    mapTypeControlOptions: {
      position: maps.ControlPosition.TOP_RIGHT
    },

    zoom: 15,
    scrollwheel: false,
    panControl: false,
    mapTypeControl: false,
    streetViewControl: false
  };
}

class Googlemap extends React.Component {
  static defaultProps = {
    center: { lat: 59.95, lng: 30.33 },
    zoom: 11
  };

  render() {
    const { center, zoom, classes } = this.props;

    return (
      <div className={classes.wrapper}>
        <div className={classes.container}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: 'AIzaSyAd6YeKzDrUfS3IO2KAlxbHGpXAqdfGI3k'
            }}
            defaultCenter={center}
            defaultZoom={zoom}
            options={createMapOptions}
          >
            <AnyReactComponent
              lat={59.955413}
              lng={30.337844}
              text={'dupa jasiu'}
            />
          </GoogleMapReact>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Googlemap);

/*



	function initialize(){

		var featureOpts = [
			{
				stylers: [
					{ saturation: -20 },
					{ lightness: 40 },
					{ visibility: 'simplified' },
					{ gamma: 0.8 },
					{ weight: 0.4 }
				]
			},
			{
				elementType: 'labels',
				stylers: [
					{ visibility: 'on' }
				]
			},
			{
				featureType: 'water',
				stylers: [
					{ color: '#dee8ff' }
				]
			}
		];

		var mapOptions = {


			center: new google.maps.LatLng(50.059828, 19.999628),

			mapTypeControlOptions: {
				mapTypeIds: [google.maps.MapTypeId.ROADMAP, MY_MAPTYPE_ID]
			},
			mapTypeId: MY_MAPTYPE_ID
		};

		map = new google.maps.Map(document.getElementById('canvas-map'),mapOptions);


		var image = '/static/ventcamp/img/pmarker.png'; ///static/ventcamp/img/pmarker.png

		var myLatLng = new google.maps.LatLng(50.059828, 20.009628);
		var beachMarker = new google.maps.Marker({
			position: myLatLng,
			map: map,
			icon: image
		});
		var styledMapOptions = {
			name: 'Custom Style'
		};

		var customMapType = new google.maps.StyledMapType(featureOpts, styledMapOptions);

		map.mapTypes.set(MY_MAPTYPE_ID, customMapType);
	}

	google.maps.event.addDomListener(window, 'load', initialize);



*/
