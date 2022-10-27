import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FastfoodTwoTone, FireplaceOutlined, BeachAccess, OutdoorGrill, Kitchen, KingBed, Deck, LocalLaundryService, Pool, Bathtub, RoomService, Speaker, SportsEsports } from '@material-ui/icons';
import { Balcony, Checkroom, CoffeeMaker, Crib, Iron } from '@mui/icons-material';
import {
    FaSnowflake, FaBlender, FaCar, FaHotTub, FaPaw, FaSmoking, FaSmokingBan, FaTv, FaWifi,
    FaLock, FaThermometerHalf, FaDoorClosed, FaWineGlassAlt, FaSwimmingPool, FaAccessibleIcon
} from 'react-icons/fa';

export const utilService = {
    makeId,
    makeLorem,
    getRandomIntInclusive,
    delay,
    toTimestamp,
    timeToShow,
    getAmenitiesIcons
}

function makeId(length = 6) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return txt;
}

function makeLorem(size = 100) {
    var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn'];
    var txt = '';
    while (size > 0) {
        size--;
        txt += words[Math.floor(Math.random() * words.length)] + ' ';
    }
    return txt;
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

function delay(ms = 1500) {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}


function toTimestamp(strDate) {
    var datum = Date.parse(strDate);
    return datum / 1000;
}
function timeToShow(date) {
    var timeStamp = (typeof date === 'string') ? Date.parse(date) : date;
    var time = new Date(timeStamp);
    var day = "0" + time.getDate();
    var month = "0" + (time.getMonth() + 1);
    var year = "0" + time.getFullYear();
    var formattedTime = day.substr(-2) + '/' + month.substr(-2) + '/' + year.substr(-2);
    return formattedTime
}
function getAmenitiesIcons(amenity) {
    switch (amenity) {
        case 'TV':
            return <FaTv />
        case 'Wifi':
            return <FaWifi />
        case 'Kitchen':
            return <FastfoodTwoTone />
        case 'Smoking allowed':
            return <FaSmoking />
        case 'Hot tub':
            return <FaHotTub />
        case 'Pets allowed':
            return <FaPaw />
        case 'No smoking':
            return <FaSmokingBan />
        case 'Cooking basics':
            return <FaBlender />
        case 'Air conditioning':
            return <FaSnowflake />
        case 'Heating':
            return <FaThermometerHalf />
        case 'Pool':
            return <Pool />
        case 'Indoor fireplace':
            return <FireplaceOutlined />
        case 'Refrigerator':
            return < Kitchen />
        case 'Refrigerator':
            return <FontAwesomeIcon icon="refrigerator" />
        case 'Dishwasher':
            return <LocalLaundryService />
        case 'Backyard':
            return <Deck />
        case 'BBQ grill':
            return <OutdoorGrill />
        case 'Crib':
            return <Crib />
        case 'Private entrance':
            return <FaDoorClosed />
        case 'Lockbox':
            return <FaLock />
        case 'Beachfront':
            return <BeachAccess />
        case 'Hangers':
            return < Checkroom />
        case 'Wine glasses':
            return <FaWineGlassAlt />
        case 'Free parking':
            return <FaCar />
        case 'Accessible':
            return <FaAccessibleIcon />
        case 'King size bed':
            return <KingBed />
        case 'Bathub':
            return <Bathtub />
        case 'Balcony':
            return <Balcony />
        case 'Iron':
            return <Iron />
        case 'Room service':
            return <RoomService />
        case 'Coffee machine':
            return <CoffeeMaker />
        case 'Laundry machine':
            return <LocalLaundryService />
        case 'Speakers':
            return < Speaker />
        case 'Gaming console':
            return < SportsEsports />
        default:
            break;

    }
}