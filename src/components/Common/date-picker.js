import React, { PropTypes } from 'react';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';

const DatePicker = (props) => {

  const spanStyle = { color: 'red' };
  let dtStyle = {};

  const wrapperClass = 'form-group';
  if (props.touched && props.error && props.error.length > 0) {
    dtStyle = { border: '2px solid red' };
  }

  const _labelstyle = props.labelstyle;
  const _inputdiv = props.inputdiv;


  return (
    <div className={wrapperClass}>
      <label className={_labelstyle} htmlFor={props.name}>{props.label}</label>
      <div className={_inputdiv}>
        <DateTimePicker
          style={dtStyle}
          format="DD/MM/YY"
          name={props.name}
          time={false}
          onChange={props.onChange}
          value={!props.value ? null : new Date(props.value)} />
        {props.touched && props.error &&
              <div style={spanStyle} className="input">{props.error}</div>
        }
      </div>
    </div>
  );
};

DatePicker.propTypes = {
  inputdiv: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  labelstyle: PropTypes.string,
  value: PropTypes.any,
  touched: PropTypes.bool,
};

export default DatePicker;
