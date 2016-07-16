import { default as React, Component } from "react";

import { GoogleMap, OverlayView } from "react-google-maps";

import { default as MarkerClusterer } from "react-google-maps/lib/addons/MarkerClusterer";

const STYLES = {
  mapContainer: {
    height: `100%`,
  },
  overlayView: {
    background: `red`,
    border: `1px solid #ccc`,
    width: 25,
    height: 25,
  },
};

export default class ClusteredOverlayViewBugExample extends Component {
  state = {
    startPosition: 0,
    shiftInterval: null,
  }

  componentWillMount() {
    this.setState({
      shiftInterval: setInterval(this.shiftStartPosition.bind(this), 1000),
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.shiftInterval);
  }

  shiftStartPosition() {
    this.setState({
      startPosition: this.state.startPosition + 1,
    });
  }

  render() {
    return (
      <GoogleMap
        containerProps={{ ...this.props, style: STYLES.mapContainer }}
        defaultZoom={8}
        defaultCenter={{ lat: -34.397, lng: 150.644 }}
      >
        <MarkerClusterer>
          {Array
            .from(new Array(10))
            .map((_, i) => (i + this.state.startPosition) % 100)
            .map(i =>
              <OverlayView
                key={i}
                position={{ lat: -34.397, lng: 150.644 }}
                mapPaneName={OverlayView.MARKER_LAYER}
              >
                <div style={STYLES.overlayView}></div>
              </OverlayView>
            )}
        </MarkerClusterer>

      </GoogleMap>
    );
  }
}
