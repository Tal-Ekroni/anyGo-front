
import { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

class _StayMap extends Component {

    state = {
        center: {
            lat: '',
            lng: ''
        },
        loc: {
            lat: '',
            lng: '',
            address: '',
            country: ''
        }
    }
    componentDidMount() {
        const loc = this.props.location
        this.setState({ center: { lng: loc.lng, lat: loc.lat }, loc })
    }
    onMapClicked = (props, map, ev) => {
        this.setState({ center: { lat: ev.latLng.lat(), lng: ev.latLng.lng() } })
    }

    onMarkerClicked = () => {
        this.setState({ isInfoWindowOn: true })
    }

    onInfoWindowClose = () => {
        this.setState({ isInfoWindowOn: false })
    }
    render() {
        const { lat, lng } = this.state.loc

        const style = {
            width: '100%',
            height: '400px',
            position: "relative",
            margin: "0 auto"
        }
        return (
            <section className="main-map-container">
                <div className="map-title-container">
                    <h1 className="map-title">Where you’ll be</h1>
                </div>
                <div className="map-container">
                    {lat && <Map
                        className="stay-map"
                        containerStyle={style}
                        google={this.props.google}
                        zoom={15}
                        initialCenter={this.state.center}
                        onClick={this.onMapClicked}
                        center={this.state.center}
                    >
                        <Marker
                            position={{ lat, lng }}
                            name={'Current location'}
                        />

                        <InfoWindow
                            onClose={this.onInfoWindowClose}
                            position={this.state.center}
                            visible={this.state.isInfoWindowOn}
                        >
                            <div>
                                <h1>Hello</h1>
                            </div>
                        </InfoWindow>
                    </Map>}
                    <div>
                        {this.state.loc.address && <h1 className="address-title">{this.state.loc.address.split(',')[0]} , {this.state.loc.address.split(',')[1]}</h1>}
                    </div>
                </div>
            </section>
        );
    }
}

export const StayMap = GoogleApiWrapper({
    apiKey: ('AIzaSyCUGOKMnw7Uk2ksGmOSmUZKdpOyeWxg27Y')
})(_StayMap)