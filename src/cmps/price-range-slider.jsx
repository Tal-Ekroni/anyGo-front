import * as React from 'react';
import PropTypes from 'prop-types';
import Slider, { SliderThumb } from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';

function ValueLabelComponent(props) {
  const { children, value } = props;

  return (
    <Tooltip enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

ValueLabelComponent.propTypes = {
  children: PropTypes.element.isRequired,
  value: PropTypes.number.isRequired,
};





const AirbnbSlider = styled(Slider)(({ theme }) => ({
  color: '#3a8589',
  height: 3,
  padding: '13px 0',
  '& .MuiSlider-thumb': {
    height: 27,
    width: 27,
    backgroundColor: '#fff',
    border: '1px solid currentColor',
    '&:hover': {
      boxShadow: '0 0 0 8px rgba(58, 133, 137, 0.16)',
    },
    '& .airbnb-bar': {
      height: 9,
      width: 1,
      backgroundColor: 'currentColor',
      marginLeft: 1,
      marginRight: 1,
    },
  },
  '& .MuiSlider-track': {
    height: 3,
  },
  '& .MuiSlider-rail': {
    color: theme.palette.mode === 'dark' ? '#bfbfbf' : '#d8d8d8',
    opacity: theme.palette.mode === 'dark' ? undefined : 1,
    height: 3,
  },
}));

function AirbnbThumbComponent(props) {
  const { children, ...other } = props;
  return (
    <SliderThumb {...other}>
      {children}
      <span className="airbnb-bar" />
      <span className="airbnb-bar" />
      <span className="airbnb-bar" />
    </SliderThumb>
  );
}

AirbnbThumbComponent.propTypes = {
  children: PropTypes.node,
};

export default function PriceRangeSlider({ onSetPageFilter, allStaysPriceAvg }) {
  const [value, setValue] = React.useState([20, 600])
  const handleChange = (event, newValue) => {
    setValue(newValue)
    onSetPageFilter('priceRange', newValue)
  }

  return (
    <div className="price-range-container flex ">
      <Box sx={{ width: 320 }}>
        <p className="stays-price-avg">{`The average nightly price is  $${allStaysPriceAvg.toFixed(0) ? allStaysPriceAvg.toFixed(0) : ''}`}</p>
        <Box sx={{ m: 3 }} />
        <div className="price-slider-container flex justify-center align-center">

          <AirbnbSlider
            components={{ Thumb: AirbnbThumbComponent }}
            getAriaLabel={(index) => (index === 0 ? 'Minimum price' : 'Maximum price')}
            defaultValue={[20, 600]}
            onChange={handleChange}
            max={600}
          />
        </div>
        <div className="picks-container ">
          <div className="min-price flex column ">
            <span className="price-range-span" htmlFor="minPrice">Min price</span>
            <div>
              <span className="price-range-span">$</span>
              <input className="min-input" type="number" value={value[0]} />
            </div>
          </div>
          <div className="max-price flex column ">
            <span className="price-range-span" htmlFor="maxPrice">Max price</span>
            <div>
              <span className="price-range-span">$</span>
              <input className="max-input" type="number" value={value[1]} />
            </div>
          </div>
        </div>
      </Box>
    </div>
  );
}
