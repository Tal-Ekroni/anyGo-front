import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { AddStayBasicInfo } from './add-stay-basic-info';
import { AddStayFloorPlan } from './add-stay-floor-plan';
import { AddStayProfile } from './add-stay-profile';
import { onAddStay } from '../../store/stay.actions'

class _AddStay extends React.Component {
    state = {
        newStay: {
            name: '',
            assetType: '',
            assetSpace: '',
            summary: '',
            uniqueStay: false,
            imgUrls: [],
            price: null,
            capacity: null,
            amenities: [],
            labels: [],
            loc: {
                country: null,
                countryCode: null,
                address: null,
                lat: null,
                lng: null
            },
            reviews: []
        },
        selectedTab: 'get-start'

    }
    componentDidMount() {
        this.setState({
            newStay: {
                name: '',
                assetType: '',
                assetSpace: '',
                summary: '',
                uniqueStay: false,
                imgUrls: [],
                price: null,
                capacity: null,
                amenities: [],
                loc: {
                    country: null,
                    countryCode: null,
                    address: null,
                    lat: null,
                    lng: null
                },
                reviews: []
            },
            selectedTab: 'get-start'
        })

    }
    handleChange = ({ target }) => {
        const field = target.name;
        const value = target.type === 'number' ? +target.value : target.value;
        this.setState(prevState => ({ ...prevState, newStay: { ...this.state.newStay, [field]: value } }))
    }
    handleAddressChange = (address) => {
        this.setState(prevState => ({ ...prevState, newStay: { ...this.state.newStay, loc: address } }))
    }
    handleSelectChange = (target) => {
        const field = target.name
        const value = target.value
        this.setState(prevState => ({ ...prevState, newStay: { ...this.state.newStay, [field]: value } }))
    }
    handleMultiSelectChange = (target) => {
        var lastName = null
        if (target.length > 0) {
            const field = target[0].name
            lastName = field
            const labels = target.map(label => {
                return label.value;
            }) || [];
            this.setState({ newStay: { ...this.state.newStay, [field]: labels } }, () => {
            });
        } else {
            this.setState({ newStay: { ...this.state.newStay, [lastName]: [] } }, () => {
            });
        }

        // this.setState(prevState => ({ ...prevState, newStay: { ...this.state.newStay, [field]: value } }))
    }
    onAddsStay = (ev) => {
        ev.preventDefault()
        const { newStay } = this.state
        const { _id, fullname, imgUrl } = this.props.user
        newStay.host = { fullname, _id, imgUrl }
        this.props.onAddStay(newStay)
        
        this.setState(prevState => ({
            ...prevState, newStay: {
                name: '',
                assetType: '',
                assetSpace: '',
                summary: '',
                uniqueStay: false,
                imgUrls: [],
                price: null,
                capacity: null,
                amenities: [],
                labels: [],
                loc: {
                    country: null,
                    countryCode: null,
                    address: null,
                    lat: null,
                    lng: null
                },
                host: '',
                reviews: []
            }
        }))
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

    onChangeTab = (ev, value) => {
        this.setState({ selectedTab: value })
    }
    onNextPage = () => {
        const { selectedTab } = this.state
        const tabs = ['get-start', 'floor-plan', 'stay-profile', 'finish-page']
        const idx = tabs.findIndex(tab => tab === selectedTab)
        this.setState(prevState => ({ ...prevState, selectedTab: tabs[idx + 1] }))
    }
    render() {
        const { selectedTab } = this.state
        return (
            <div className="add-stay-container">
                <div>
                    <h1>Add stay!</h1>
                </div>
                <section className="host-tabs-container">
                    <Tabs
                        centered
                        color="#6f019c"

                        value={selectedTab}
                        onChange={this.onChangeTab}
                        textColor="secondary"
                        indicatorColor="secondary"
                        aria-label="secondary tabs example"
                    >
                        <Tab value="get-start" label="Let's start!" />
                        <Tab value="floor-plan" label="Floor plan" />
                        <Tab value="stay-profile" label="Stay profile" />
                        <Tab value="finish-page" label="Finish your page" />
                    </Tabs>
                </section>

                <div className="add-form-container flex" onSubmit={this.onAddsStay}>
                    <form className="add-form flex column space-between">
                        <div className="add-curr-tab-title">
                            {selectedTab === 'get-start' && <h1>Let's start with some basic info!</h1>}
                            {selectedTab === 'floor-plan' && <h1>Stay floor plan</h1>}
                            {selectedTab === 'stay-profile' && <h1>Stay Profile</h1>}
                            {selectedTab === 'finish-page' && <h1>Finish your page</h1>}
                        </div>
                        {selectedTab === 'get-start' && <AddStayBasicInfo handleChange={this.handleChange} handleSelectChange={this.handleSelectChange} state={this.state} />}
                        {selectedTab === 'floor-plan' && <AddStayFloorPlan handleChange={this.handleChange} handleMultiSelectChange={this.handleMultiSelectChange} state={this.state} />}
                        {selectedTab === 'stay-profile' && <AddStayProfile handleAddressChange={this.handleAddressChange} onUploadImg={this.onUploadImg} handleChange={this.handleChange} handleMultiSelectChange={this.handleMultiSelectChange} state={this.state} />}
                        {selectedTab === 'finish-page' && <AddStayProfile handleAddressChange={this.handleAddressChange} onUploadImg={this.onUploadImg} handleChange={this.handleChange} handleMultiSelectChange={this.handleMultiSelectChange} state={this.state} />}

                        {selectedTab === 'finish-page' ? <button
                            onClick={this.onAddsStay}
                            className=" add-page-btn add-stay-btn"
                            variant={'contained'}
                            type="button" 
                        >
                            Add Stay
                        </button> : <button onClick={this.onNextPage}
                            className=" add-page-btn next-page-btn"
                            variant={'contained'}
                            type="button"
                        >
                            Next Page
                        </button>}
                    </form>

                </div>
            </div>
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