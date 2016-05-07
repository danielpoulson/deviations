import React, { PropTypes } from 'react';

const TextArea = (props) => {
  let wrapperClass = 'form-group';
  if (props.error && props.error.length > 0) {
    wrapperClass += ' ' + 'has-error';
  }
  const labelClass = `control-label ${props.dpLabelCol}`;

  return (
    <div className={wrapperClass}>
      <label className={labelClass} htmlFor={props.name}>{props.label}</label>
      <div className={props.dpInputCol}>
        <textarea type="text"
          name={props.name}
          className={props.inputstyle}
          placeholder={props.placeholder}
          value={props.value}
          rows={props.rows}
          onChange={props.onChange} />
        <div className="input">{props.error}</div>
      </div>
    </div>
  );
};

TextArea.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
  dpInputCol: PropTypes.string,
  dpLabelCol: PropTypes.string,
  inputstyle: PropTypes.string,
  rows: PropTypes.string,
};

export default TextArea;
