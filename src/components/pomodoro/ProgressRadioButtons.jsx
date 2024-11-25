import { Radio } from "@mui/material";
import PropTypes from 'prop-types';

const ProgressRadioButtons = ({
    actualValue,
    maxValue,
  }) => {
    const radios = Array.from({ length: maxValue }, (_, index) => (
      <Radio
        key={index}
        checked={index < actualValue}
        value={index + 1} 
        name="progress-radio"
        inputProps={{ 'aria-label': `Progress ${index + 1}` }}
        disabled 
        color="primary"
      />
    ));
  
    return <div>{radios}</div>;
  };
  ProgressRadioButtons.propTypes = {
    actualValue: PropTypes.number.isRequired,
    maxValue: PropTypes.number.isRequired,
  };

  export default ProgressRadioButtons;