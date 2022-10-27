import { TextField } from "@material-ui/core";

import React from "react";
import Select from 'react-select';
import { AddStayMap } from "./add-stay-map";

const labelsOptions = [
    { name: 'labels', value: 'Building', label: 'Building' },
    { name: 'labels', value: 'City life', label: 'City life' },
    { name: 'labels', value: 'Parks', label: 'Parks' },
    { name: 'labels', value: 'Resturants', label: 'Resturants' }
];

export class AddStayProfile extends React.Component {
    render() {
        const { handleChange, handleMultiSelectChange, onUploadImg, handleAddressChange } = this.props
        const { labels, name, imgUrls } = this.props.state
        return (
            <div className="add-basic-info-container">
                <div className="add-form-line flex align-center space-between">
                    <label className="add-line" htmlFor="">Give your stay a name!</label>
                    <TextField required type="text" autoComplete="off" value={name} name="name" placeholder="Asset name..." onChange={handleChange} />
                </div>
                <div className="add-form-line flex align-center space-between">
                    <label className="add-line" htmlFor="">Upload images here</label>

                    <TextField type="file" value={imgUrls} name="imgUrls" onChange={onUploadImg} />
                </div>
                <div className="add-form-line flex align-center space-between">
                    <label className="add-line" htmlFor="">Choose your asset lebels</label>
                    <Select
                        required
                        onChange={handleMultiSelectChange}
                        placeholder="Select labels"
                        name="labels"
                        isMulti
                        className="add-stay-select"
                        value={labels}
                        options={labelsOptions}
                    />
                </div>
                <AddStayMap handleAddressChange={handleAddressChange} />
            </div>
        )
    }
}