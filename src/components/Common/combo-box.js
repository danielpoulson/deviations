import React, { PropTypes } from 'react';
import Combobox from 'react-widgets/lib/Combobox';


const ComboBox = (props) => {
  const spanStyle = { color: 'red' };
  let dtStyle = {};
  const wrapperClass = 'form-group';
  if (props.touched && props.error && props.error.length > 0) {
    dtStyle = { border: '2px solid red' };
  }

  const labelClass = `control-label ${props.dpLabelCol}`;

  return (
    <div className={wrapperClass}>
      <label className={labelClass} htmlFor={props.name}>{props.label}</label>
      <div className={props.dpInputCol}>
        <Combobox
          style={dtStyle}
          valueField="id"
          textField="name"
          data={props.data}
          value={props.value}
          onChange={props.onChange}
          defaultValue={props.defaultValue} />
          {props.touched && props.error &&
                <div style={spanStyle} className="input">{props.error}</div>
          }
      </div>
    </div>
  );
};

ComboBox.propTypes = {
  data: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  error: PropTypes.string,
  dpLabelCol: PropTypes.string,
  dpInputCol: PropTypes.string,
  defaultValue: PropTypes.any,
  value: PropTypes.any,
  touched: PropTypes.bool,
};

export default ComboBox;
