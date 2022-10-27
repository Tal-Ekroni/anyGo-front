import React from 'react'
import { connect } from 'react-redux'
import { loadUser, updateUser } from '../store/user.actions'
import { FaPencilAlt, FaUserAlt } from "react-icons/fa";
import { AirBnbBtn } from '../cmps/AirBnb-Btn';
import { TextField } from '@material-ui/core';
// import {} from '../store/user.actions'
class _UserProfile extends React.Component {
    state = {
        user: null,
        editedUser: {
            username: '',
            fullname: '',
            imgUrl: '',
            email: ''
        },
        isEditMode: false,
        isImgModalOpen: false
    }
    async componentDidMount() {
        window.scrollTo(0, 0)
        const { user } = this.props
        if (user) {
            try {
                await this.props.loadUser(user._id)
            } catch (err) {
                console.log('Had Issues', err);
            }
        }
        else {
            this.props.history.push('/')
        }
    }
    componentDidUpdate(prevProps, prevState) {
        const { user } = this.props
        if (prevProps.user !== user) {
            if (!user) this.props.history.push('/')
        }
    }
    onToggleEditMode = () => {
        const { user } = this.props
        const { isEditMode } = this.state
        console.log(user);
        this.setState({ isEditMode: !isEditMode }, () => {
            if (!isEditMode) this.setState(({ editedUser: user }))
            else this.setState(({
                editedUser: {
                    username: '',
                    fullname: '',
                    imgUrl: '',
                    email: ''
                }
            }))
        })
    }
    onToggleImgModal = () => {
        const { isImgModalOpen } = this.state
        this.setState(({ isImgModalOpen: !isImgModalOpen }))
    }
    onDeleteImg = () => {
        this.onToggleImgModal()
        this.setState(prevState => ({ editedUser: { ...prevState.editedUser, imgUrl: '' } }))
    }
    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value
        this.setState(prevState => ({ editedUser: { ...prevState.editedUser, [field]: value } }))
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
                const imgUrl = res.url
                this.setState(prevState => ({ editedUser: { ...prevState.editedUser, imgUrl: imgUrl } }))
            })
            .catch(err => console.error(err))
    }
    onSaveUser = () => {
        const { editedUser } = this.state
        this.onToggleEditMode()
        this.props.updateUser(editedUser)
    }
    render() {
        const { user } = this.props
        const { isEditMode, editedUser, isImgModalOpen } = this.state
        // Add mail
        const { username, fullname, imgUrl, email } = editedUser
        return (
            <main className="profile-page-container main-container">
                {isImgModalOpen && <div className="profile-screen" onClick={this.onToggleImgModal}></div>}
                <div className="page-padding">
                    <h1>Profile</h1>
                    <section className="user-card-container flex align-center justify-center">

                        {user && <div className="user-card">

                            {!isEditMode ? <div className="profile-pic-wrapper flex justify-center align-center">

                                {!user.imgUrl ? <div className="profile-img-container">
                                    <div className="user-icon flex align-center justify-center">
                                        <FaUserAlt />
                                    </div>
                                </div> : <div className="profile-pic-container flex align-center justify-center">
                                    <div className="profile-img-container ">
                                        <img src={isEditMode ? imgUrl : user.imgUrl} alt="" />
                                    </div>
                                </div>}
                            </div> : <div className="profile-pic-wrapper flex justify-center align-center">
                                {!imgUrl ? <div className="profile-img-container">
                                    <div className="user-icon flex align-center justify-center">
                                        <FaUserAlt />
                                    </div>
                                    <div className="edit-pencil-container">
                                        <div className="edit-pencil flex justify-center align-center" >
                                            <FaPencilAlt />
                                        </div>
                                        <input type="file" className="profile-pic-uploader" value={imgUrl} onChange={this.onUploadImg} />
                                    </div>
                                </div> : <div className="profile-pic-container flex align-center justify-center">
                                    <div className="profile-img-container ">

                                        <img src={isEditMode ? imgUrl : user.imgUrl} alt="" />
                                        <div className="edit-pencil-container">
                                            <div className="edit-pencil flex justify-center align-center" onClick={this.onToggleImgModal}>
                                                <FaPencilAlt />
                                            </div>
                                        </div>
                                    </div>
                                </div>}
                            </div>}
                            <div className="user-details-container flex column">
                                <div className="full-name-container">
                                    <div className="user-details-line title-line">
                                        <h4>Full name</h4>
                                    </div>
                                    <div className="user-details-line">
                                        {isEditMode ? <TextField name="fullname" value={fullname} onChange={this.handleChange} required /> : <p>{user.fullname}</p>}
                                    </div>
                                </div>
                                <div className="user-name-container">
                                    <div className="user-details-line title-line">
                                        <h4>User name</h4>
                                    </div>
                                    <div className="user-details-line">
                                        {isEditMode ? <TextField name="username" value={username} onChange={this.handleChange} required /> : <p>{user.username}</p>}
                                    </div>
                                </div>
                                <div className="user-mail-container">
                                    <div className="user-details-line title-line">
                                        <h4>Email</h4>
                                    </div>
                                    <div className="user-details-line">
                                        {isEditMode ? <TextField name="email" value={email} onChange={this.handleChange} required /> : <p>{user.email}</p>}
                                    </div>
                                </div>
                                {/* <div className="user-details-line"></div> */}
                            </div>
                            <div className="edit-user-btn-container flex justify-center align-center">
                                {isEditMode ? <div className="edit-btns-container flex align-center justify-center">
                                    <button className="user-edit-btn cancel" onClick={this.onToggleEditMode}>Cancel</button>
                                    <button className="user-edit-btn save" onClick={this.onSaveUser}>Save</button>
                                </div> : <AirBnbBtn btnAction={this.onToggleEditMode} btnInnerTxt="Edit User" />}
                            </div>
                            {isImgModalOpen && <div className="pic-edit-popup-container">
                                <div className="pic-edit-popup flex column justify-center">
                                    <div className="pic-popup-line" onClick={this.onDeleteImg}>
                                        <p>Delete photo</p>
                                    </div>
                                    <div className="pic-popup-line">
                                        <div>
                                            <p>Upload new photo</p>
                                        </div>
                                        <input type="file" onClick={this.onToggleImgModal} onChange={this.onUploadImg} />
                                    </div>
                                </div>
                            </div>}
                        </div>}
                    </section>

                </div>
            </main>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.userModule.user,
    }
}
const mapDispatchToProps = {
    loadUser,
    updateUser
}


export const UserProfile = connect(mapStateToProps, mapDispatchToProps)(_UserProfile)