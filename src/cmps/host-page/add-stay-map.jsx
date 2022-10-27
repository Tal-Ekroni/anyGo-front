
import { Component } from 'react';
import { GoogleApiWrapper } from 'google-maps-react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng, } from 'react-places-autocomplete';
import { TextField } from '@material-ui/core';

class _AddStayMap extends Component {

    state = {
        selectedPlace: '',
        loc: {
            lat: '',
            lng: '',
            address: '',
            country: ''
        }

    }
    handleChange = (address) => {
        this.setState({ selectedPlace: address });
    }
    handleSelect = async (address) => {
        const results = await geocodeByAddress(address)
        const latLng = await getLatLng(results[0])
        this.setState({ selectedPlace: address, loc: { lat: latLng.lat, lng: latLng.lng, address: address } }, () => {
            this.props.handleAddressChange(this.state.loc)
        })
    }

    render() {
        const { selectedPlace } = this.state
        return (
            <section className="add-stay-location-container" >
                <div className="add-form-line flex align-center">
                    <label className="add-line" htmlFor="">Address</label>

                    <PlacesAutocomplete
                        value={selectedPlace}
                        onChange={this.handleChange}
                        onSelect={this.handleSelect}
                    >
                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                            <div>
                                <TextField
                                    value={selectedPlace}
                                    {...getInputProps({
                                        placeholder: 'Search Places ...',
                                        className: 'location-search-input',
                                    })}
                                />
                                <div className="autocomplete-dropdown-container">
                                    {loading && <div>Loading...</div>}
                                    {suggestions.map((suggestion, idx) => {
                                        const className = suggestion.active
                                            ? 'suggestion-item--active'
                                            : 'suggestion-item';
                                        // inline style for demonstration purpose
                                        const style = suggestion.active
                                            ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                            : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                        return (
                                            <div
                                                key={idx}
                                                {...getSuggestionItemProps(suggestion, {
                                                    className,
                                                    style,
                                                })}
                                            >
                                                <span>{suggestion.description}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </PlacesAutocomplete>
                </div>
            </section>
        );
    }
}

export const AddStayMap = GoogleApiWrapper({
    apiKey: ('AIzaSyCUGOKMnw7Uk2ksGmOSmUZKdpOyeWxg27Y')
})(_AddStayMap)