import React, { PropTypes } from 'react';
import Select from 'react-select';

const SelectBox = (props) => {

  let wrapperClass = 'form-group';
  if (props.error && props.error.length > 0) {
    wrapperClass += ' ' + 'has-error';
  }

  const labelClass = `control-label ${props.dpLabelCol}`;

  return (
    <div className={wrapperClass}>
      <label className={labelClass} htmlFor={props.name}>{props.label}</label>
      <div className={props.dpInputCol}>
        <Select
          valueField="id"
          name={props.name}
          options={props.data}
          onChange={props.onChange}
          value={props.value} />
        <div className="input">{props.error}</div>
      </div>
    </div>
  );
};

SelectBox.propTypes = {
  data: PropTypes.any,
  value: PropTypes.any,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  error: PropTypes.string,
  dpInputCol: PropTypes.string,
  dpLabelCol: PropTypes.string,
};

export default SelectBox;
