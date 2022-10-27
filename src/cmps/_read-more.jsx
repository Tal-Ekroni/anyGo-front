import {  CloseRounded } from '@material-ui/icons';
import { Balcony, Checkroom, CoffeeMaker, Crib, Iron } from '@mui/icons-material';
export const ReadMore = ({ txt = '', size = 'short', onToogleReadModal }) => {
    const onClosePopup = () => {
        onToogleReadModal()
    }
    return (
        <div className={`popup-container ${size}`}>
            <div className="close-btn-container flex ">
                <button className="close-btn flex align-center justify-center" onClick={() => { onClosePopup() }}><CloseRounded className="close-icon"/></button>
            </div>
            <article className="popup-txt-container">
                <p>{txt}</p>
            </article>
        </div>
    )
}