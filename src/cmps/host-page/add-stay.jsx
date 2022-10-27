import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router';
import { onAddStay } from '../../store/stay.actions'
import { AddStayMap } from './add-stay-map';
import { TextField } from '@material-ui/core';
import { TextareaAutosize } from "@material-ui/core";
import Select from 'react-select';
import noImg from '../../assets/img/no-img.png'
class _AddStay extends React.Component {
    state = {
        newStay: {
            name: '',
            assetType: '',
            assetSpace: '',
            summary: '',
            uniqueStay: false,
            imgUrls: [],
            price: '',
            capacity: '',
            amenities: [],
            labels: [],
            loc: {
                country: '',
                countryCode: '',
                address: '',
                lat: '',
                lng: ''
            },
            host: '',
            reviews: []
        },
        ameintiesOptions: [
            { name: 'TV', isChecked: false },
            { name: 'Wifi', isChecked: false },
            { name: 'Kitchen', isChecked: false },
            { name: 'Smoking allowed', isChecked: false },
            { name: 'Hot tub', isChecked: false },
            { name: 'Pets allowed', isChecked: false },
            { name: 'No smoking', isChecked: false },
            { name: 'Cooking basics', isChecked: false },
            { name: 'Air conditioning', isChecked: false },
            { name: 'Heating', isChecked: false },
            { name: 'Pool', isChecked: false },
            { name: 'Indoor fireplace', isChecked: false },
            { name: 'Refrigerator', isChecked: false },
            { name: 'Dishwasher', isChecked: false },
            { name: 'Backyard', isChecked: false },
            { name: 'BBQ grill', isChecked: false },
            { name: 'Crib', isChecked: false },
            { name: 'Private entrance', isChecked: false },
            { name: 'Lockbox', isChecked: false },
            { name: 'Beachfront', isChecked: false },
            { name: 'Hangers', isChecked: false },
            { name: 'Wine glasses', isChecked: false },
            { name: 'Free parking', isChecked: false },
            { name: 'Accessible', isChecked: false },
            { name: 'King size bed', isChecked: false },
            { name: 'Bathub', isChecked: false },
            { name: 'Balcony', isChecked: false },
            { name: 'Iron', isChecked: false },
            { name: 'Room service', isChecked: false },
            { name: 'Coffee machine', isChecked: false },
            { name: 'Laundry machine', isChecked: false },
            { name: 'Speakers', isChecked: false },
            { name: 'Gaming console', isChecked: false }
        ]
    }
    handleChange = ({ target }) => {
        const field = target.name;
        const value = target.type === 'number' ? +target.value : target.value;
        this.setState(prevState => ({ ...prevState, newStay: { ...this.state.newStay, [field]: value } }))
    }
    handleAmenityChange = (name) => {
        const { amenities } = this.state.newStay
        const { ameintiesOptions } = this.state
        const nameIdx = ameintiesOptions.findIndex(amenity => amenity.name === name)
        const checked = !ameintiesOptions[nameIdx].isChecked
        const updatedAmeintiesOpts = ameintiesOptions.map(amenity => (amenity.name === name) ? { name, isChecked: checked } : amenity)
        if (checked) amenities.push(name)
        else {
            const idx = amenities.findIndex(amenity => amenity === name)
            amenities.splice(idx, 1)
        }
        this.setState(prevState => ({ ...prevState, newStay: { ...this.state.newStay, amenities }, ameintiesOptions: updatedAmeintiesOpts }))
    }
    handleAddressChange = (address) => {
        this.setState(prevState => ({ ...prevState, newStay: { ...this.state.newStay, loc: address } }))
    }
    handleSelectChange = (target) => {
        const field = target.name
        const value = target.value
        this.setState(prevState => ({ ...prevState, newStay: { ...this.state.newStay, [field]: value } }))
    }

    onAddsStay = (ev) => {
        ev.preventDefault()
        const { newStay } = this.state
        const { _id, fullname, imgUrl } = this.props.user
        newStay.assetType = `${newStay.assetSpace.split(' ')[1]} ${newStay.assetType}`
        newStay.host = { fullname, _id, imgUrl }
        this.props.onAddStay(newStay)
        this.setState({
            newStay: {
                name: '',
                assetType: '',
                assetSpace: '',
                summary: '',
                uniqueStay: false,
                imgUrls: [noImg, noImg, noImg, noImg, noImg],
                price: '',
                capacity: '',
                amenities: [],
                labels: [],
                loc: {
                    country: '',
                    countryCode: '',
                    address: '',
                    lat: '',
                    lng: ''
                },
                host: '',
                reviews: []
            }
        })
        this.props.history.push('/explore')
    }

    onUploadImg = (ev) => {
        const CLOUD_NAME = 'dkbfdybze'
        const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
        const file = ev.target.files[0]
        const formData = new FormData()
        formData.append("file", file)
        formData.append("upload_preset", "ewa9mksh")
        return fetch(UPLOAD_URL, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(res => {
                const state = this.state
                const ImgUrl = res.url
                state.newStay.imgUrls.push(ImgUrl)
                this.setState((state))
            })
            .catch(err => console.error(err))
    }

    getBtnDivs = () => {
        let divStr = []
        for (let i = 0; i < 100; i++) {
            divStr.push(<div key={i + 1} className="cell" ></div >)
        }
        return divStr
    }

    render() {
        const { imgUrls, name, assetSpace, assetType, capacity, summary, price } = this.state.newStay
        const { ameintiesOptions } = this.state
        const spaceOptions = [
            { name: 'assetSpace', value: 'An Entire place', label: 'An Entire place' },
            { name: 'assetSpace', value: 'A Private room', label: 'A Private room' },
            { name: 'assetSpace', value: 'A Shared room', label: 'A Shared room' },
        ];

        const assetTypeOptions = [
            { name: 'assetType', value: 'Duplex', label: 'Duplex' },
            { name: 'assetType', value: 'Villa', label: 'Villa' },
            { name: 'assetType', value: 'Loft', label: 'Loft' },
            { name: 'assetType', value: 'Farm', label: 'Farm' },
            { name: 'assetType', value: 'Cabin', label: 'Cabin' },
            { name: 'assetType', value: 'Home', label: 'Home' },
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
        if (!imgUrls) return (<div>Loading</div>)
        return (
            <section className="add-stay-container">
                <div className="add-stay-form-container flex" onSubmit={this.onAddsStay}>
                    <form className="add-stay-form">
                        <section className="add-basic-info-container flex align-center">
                            <div className="add-form-line flex align-center">
                                <label className="add-line">Name</label>
                                <TextField className="stay-name-input" required type="text" autoComplete="off" value={name} name="name" placeholder="Asset name..." onChange={this.handleChange} />
                            </div>
                            <div className="add-stay-location-wrapper">
                                <AddStayMap handleAddressChange={this.handleAddressChange} />
                            </div>
                            <div className="add-form-line flex align-center">
                                <label className="add-line">Price</label>
                                <TextField required type="number" value={price} name="price" placeholder="Price" onChange={this.handleChange} />
                                <label className="add-line">/per night</label>
                            </div>
                        </section>
                        <section className="add-stay-imgs-container flex">
                            <div className="add-stay-imgs flex">
                                <div className="primary-img square-ratio" >

                                    {imgUrls[0] ? <img src={imgUrls[0]} alt="" /> : <div>
                                        <div className="upload-img-txt flex align-center">
                                            <label>Upload image</label>
                                        </div>
                                        <input type="file" placeholder="Upload Image" name="imgUrls" onChange={this.onUploadImg} />
                                    </div>}

                                </div>
                                <div className="add-small-imgs-container flex column space-between">
                                    <div className="new-stay-img square-ratio">
                                        {imgUrls[1] ? <img src={imgUrls[1]} alt="" /> : <div>
                                            <div className="upload-img-txt flex align-center">
                                                <label>Upload image</label>
                                            </div>
                                            <input type="file" placeholder="Upload Image" name="imgUrls" onChange={this.onUploadImg} />
                                        </div>}
                                    </div>
                                    <div className="new-stay-img square-ratio">
                                        {imgUrls[2] ? <img src={imgUrls[2]} alt="" /> : <div>
                                            <div className="upload-img-txt flex align-center">
                                                <label >Upload image</label>
                                            </div>
                                            <input type="file" placeholder="Upload Image" name="imgUrls" onChange={this.onUploadImg} />
                                        </div>}
                                    </div>
                                </div>
                                <div className="add-small-imgs-container flex column space-between">
                                    <div className="new-stay-img square-ratio">
                                        {imgUrls[3] ? <img src={imgUrls[3]} alt="" /> : <div>
                                            <div className="upload-img-txt flex align-center">
                                                <label>Upload image</label>
                                            </div>
                                            <input type="file" placeholder="Upload Image" name="imgUrls" onChange={this.onUploadImg} />
                                        </div>}
                                    </div>
                                    <div className="new-stay-img square-ratio">
                                        {imgUrls[4] ? <img src={imgUrls[4]} alt="" /> : <div>
                                            <div className="upload-img-txt flex align-center">
                                                <label>Upload image</label>
                                            </div>
                                            <input type="file" placeholder="Upload Image" name="imgUrls" onChange={this.onUploadImg} />
                                        </div>}
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section className="add-stay-details-container flex space-between">
                            <div className="add-form-line flex align-center">
                                <label className="add-line">Capacity</label>
                                <TextField required type="number" value={capacity} name="capacity" placeholder="Capacity..." onChange={this.handleChange} />
                            </div>
                            <div className="add-form-line flex align-center">
                                <label className="add-line">What is your asset space?</label>
                                <Select
                                    required
                                    placeholder="Space type"
                                    onChange={this.handleSelectChange}
                                    name="assetSpace"
                                    className="add-stay-select"
                                    value={assetSpace}
                                    options={spaceOptions}
                                />
                            </div>
                            <div className="add-form-line flex align-center">
                                <label className="add-line">What is your asset type?</label>
                                <Select
                                    required
                                    placeholder="Asset type"
                                    onChange={this.handleSelectChange}
                                    name="assetType"
                                    className="add-stay-select"
                                    value={assetType}
                                    options={assetTypeOptions}
                                />
                            </div>
                        </section>
                        <section className="add-stay-summary">
                            <div className="add-desc-line flex column">
                                <label className="add-line">Describe your asset</label>
                                <TextareaAutosize
                                    required
                                    style={style}
                                    value={summary}
                                    placeholder="Describe your asset..."
                                    className="asset-desc-input"
                                    onChange={this.handleChange}
                                    name="summary"
                                    autoComplete="off" />
                            </div>
                        </section>
                        <section className="add-amenities-container flex align-center">
                            <ul className="amenities-list flex column align-center">
                                {ameintiesOptions.map((amenity, idx) => {
                                    if (idx <= 31) {
                                        return <li key={idx} className="add-amenities-line flex align-center" onClick={() => this.handleAmenityChange(amenity.name)}>
                                            <label variant="h5">{amenity.name}</label>
                                            <input type="checkbox" checked={amenity.isChecked} />
                                        </li>
                                    }
                                })}
                            </ul>
                        </section>
                        <section className="add-stay-btn-container flex">
                            <div className="checkout-btn-container " onClick={this.onAddsStay}>
                                {this.getBtnDivs()}
                                <div className="content">
                                    <button className="checkout-btn" ><span>Add stay</span> </button>
                                </div>
                            </div>
                        </section>
                    </form>
                </div>
            </section>
        )
    }
}
function mapStateToProps(state) {
    return {
        user: state.userModule.user,
        stays: state.stayModule.stays
    }
}

const mapDispatchToProps = {
    onAddStay
}

export const AddStay = withRouter(connect(mapStateToProps, mapDispatchToProps)(_AddStay))