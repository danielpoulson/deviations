import React, { PropTypes } from 'react';

const TextInputTask = (props) => {
  const spanStyle = { color: 'red' };
  let wrapperClass = 'form-group';

  if (props.touched && props.error && props.error.length > 0) {
    wrapperClass += ' ' + 'has-error';
  }

  const labelClass = `control-label ${props.dpLabelCol}`;

  return (
    <div className = {wrapperClass}>
      <label className = {labelClass} htmlFor = {props.name}>{props.label}</label>
      <div className = {props.dpInputCol}>
        <input
          type = {props.type ? props.type : 'text'}
          name = {props.name}
          className = "form-control"
          placeholder = {props.placeholder}
          value = {props.value || ''}
          onChange = {props.onChange} />
      </div>
      {props.touched && props.error &&
        <div style = {spanStyle} className = {props.dpInputCol}>{props.error}</div>
      }
    </div>
  );
};

TextInputTask.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
  dpInputCol: PropTypes.string,
  dpLabelCol: PropTypes.string,
  touched: PropTypes.bool,
  type: PropTypes.string
};

export default TextInputTask;
