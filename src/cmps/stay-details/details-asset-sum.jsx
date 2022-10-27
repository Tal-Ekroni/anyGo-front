import { FaHome, FaBroom, FaDoorClosed, FaKey } from 'react-icons/fa'

export function AssetSum(stay) {
    return (<section className="asset-sum-container">

        <div className="asset-sum">
            <div className="asset-sum-item flex">
                <div className="sum-icon-container">
                    <p className="sum-icon" ><FaHome /></p>
                </div>
                <div className="sum-txt">
                    <h4>Entire Home</h4>
                    <p>You’ll have the apartment to yourself.</p>
                </div>
            </div>
            <div className="asset-sum-item flex">
                <div className="sum-icon-container">
                    <p className="sum-icon" ><FaBroom className="sum-icon" /></p>
                </div>
                <div className="sum-txt">
                    <h4>Enhanced Clean Home</h4>
                    <p>This host committed to Airbnb's 5-step enhanced cleaning process.</p>
                </div>
            </div>
            <div className="asset-sum-item flex">
                <div className="sum-icon-container">
                    <p className="sum-icon" ><FaDoorClosed className="sum-icon" /></p>
                </div>
                <div className="sum-txt">
                    <h4>Self check-in</h4>
                    <p>Check yourself in with the lockbox.</p>
                </div>
            </div>
            <div className="asset-sum-item flex">
                <div className="sum-icon-container">
                    <p className="sum-icon" ><FaKey className="sum-icon" /></p>
                </div>
                <div className="sum-txt">
                    <h4>Great check-in experience</h4>
                    <p>95% of recent guests gave the check-in process a 5-star rating.</p>
                </div>
            </div>
        </div>
    </section>)
}

// <div className="asset-sum-item flex">
// <div className="sum-icon-container">
//     {/* <p className="sum-icon" ></p><FaHome  className="sum-icon" /> */}
//     <p className="sum-icon"><HomeOutlinedIcon/></p>

    
// </div>
// <div className="sum-txt">
//     <h4>Entire Home</h4>
//     <p>You’ll have the apartment to yourself.</p>
// </div>
// </div>
// <div className="asset-sum-item flex">
// <div className="sum-icon-container">
//     <p className="sum-icon"><LocationOnOutlined  /></p>
    
// </div>
// <div className="sum-txt">
//     <h4>Enhanced Clean Home</h4>
//     <p>This host committed to Airbnb's 5-step enhanced cleaning process.</p>
// </div>
// </div>
// <div className="asset-sum-item flex">
// <div className="sum-icon-container">
//     <p className="sum-icon"><DoorBackOutlined  /> </p>
    
// </div>
// <div className="sum-txt">
//     <h4>Self check-in</h4>
//     <p>Check yourself in with the lockbox.</p>
// </div>
// </div>
// <div className="asset-sum-item flex">
// <div className="sum-icon-container">
// <p className="sum-icon"><VpnKeyOutlined  /> </p>

// </div>
// <div className="sum-txt">
//     <h4>Great check-in experience</h4>
//     <p>95% of recent guests gave the check-in process a 5-star rating.</p>
// </div>
// </div>