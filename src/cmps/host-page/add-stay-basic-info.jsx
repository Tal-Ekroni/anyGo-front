import { TextareaAutosize } from "@material-ui/core";
import React from "react";
import Select from 'react-select';
const spaceOptions = [
    { name: 'assetSpace', value: 'An entire place', label: 'An entire place' },
    { name: 'assetSpace', value: 'A private room', label: 'A private room' },
    { name: 'assetSpace', value: 'A shared room', label: 'A shared room' },
];

const assetTypeOptions = [
    { name: 'assetType', value: 'Duplex', label: 'Duplex' },
    { name: 'assetType', value: 'Villa', label: 'Villa' },
    { name: 'assetType', value: 'Loft', label: 'Loft' },
    { name: 'assetType', value: 'Farm', label: 'Farm' },
    { name: 'assetType', value: 'Cabin', label: 'Cabin' },
];

const style = {
    margin: '20px 0',
    padding: '20px',
    width: '100%',
    height: ' 150px',
    resize: 'none',
    borderRadius: '13px',
    borderColor: ' #bdbcbc',
    fontFamily: "circular-book",
    fontSize: "1rem"
}
export class AddStayBasicInfo extends React.Component {
    render() {
        const { handleChange, handleSelectChange } = this.props
        const { assetType, assetSpace, summary } = this.props.state
        return (
            <div className="add-basic-info-container">
                <div className="add-form-line flex align-center space-between">
                    <label className="add-line" htmlFor="">What kind of space will guests have?</label>
                    <Select
                        required
                        placeholder="Choose your space type"
                        onChange={(ev) => handleSelectChange(ev)}
                        name="assetSpace"
                        className="add-stay-select"
                        value={assetSpace}
                        options={spaceOptions}
                    />
                </div>
                <div className="add-form-line flex align-center space-between">
                    <label className="add-line" htmlFor="">What is your asset type?</label>
                    <Select
                        required
                        placeholder="Choose your asset type"
                        onChange={(ev) => handleSelectChange(ev)}
                        name="assetType"
                        className="add-stay-select"
                        value={assetType}
                        options={assetTypeOptions}
                    />
                </div>
                <div className="add-desc-line flex column  space-between">
                    <label className="add-line" htmlFor="">Describe your asset</label>
                    <TextareaAutosize
                        required
                        style={style}
                        value={summary}
                        placeholder="Describe your asset..."
                        className="asset-desc-input"
                        onChange={handleChange}
                        name="summary"
                        autoComplete="off" />
                </div>
            </div>
        )
    }
}
