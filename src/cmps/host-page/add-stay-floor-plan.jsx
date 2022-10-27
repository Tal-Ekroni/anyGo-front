import { TextField } from "@material-ui/core";

import React from "react";
import Select from 'react-select';

const ameintiesOptions = [
    { name: 'amenities', value: 'TV', label: 'TV' },
    { name: 'amenities', value: 'Wifi', label: 'Wifi' },
    { name: 'amenities', value: 'Kitchen', label: 'Kitchen' },
    { name: 'amenities', value: 'Smoking allowed', label: 'Smoking allowedarm' },
    { name: 'amenities', value: 'Cooking basics', label: 'Cooking basics' },


];
export class AddStayFloorPlan extends React.Component {
    render() {
        const { handleChange, handleMultiSelectChange } = this.props
        const { amenities, price, capacity } = this.props.state
        return (
            <div className="add-basic-info-container">

                <div className="add-form-line flex align-center space-between">
                    <label className="add-line" htmlFor="">Asset price per night</label>
                    <TextField required type="number" value={price} name="price" placeholder="Asset price per night..." onChange={handleChange} />
                </div>

                <div className="add-form-line flex align-center space-between">
                    <label className="add-line" htmlFor="">What is your host capacity?</label>
                    <TextField required type="number" value={capacity} name="capacity" placeholder="Asset capacity..." onChange={handleChange} />
                </div>

                <div className="add-form-line flex align-center space-between">
                    <label className="add-line" htmlFor="">Choose your asset amenities</label>
                    <Select
                    required
                        onChange={handleMultiSelectChange}
                        placeholder="Select amenities"
                        name="amenities"
                        isMulti
                        className="add-stay-select"
                        value={amenities}
                        options={ameintiesOptions}
                    />
                </div>
            </div>
        )
    }
}