import React, { PropTypes } from 'react';

const TextArea = (props) => {
  let wrapperClass = 'form-group';
  const _inputstyle = 'form-control' || props.inputstyle;
  const _inputdiv = props.inputdiv;
  const _labelstyle = props.labelstyle;

  if (props.error && props.error.length > 0) {
    wrapperClass += ' ' + 'has-error';
  }


  return (
    <fieldset className={wrapperClass}>
      <label className={_labelstyle} htmlFor={props.name}>{props.label}</label>
      <div className={_inputdiv}>
        <textarea type="text"
          name={props.name}
          className={_inputstyle}
          placeholder={props.placeholder}
          value={props.value}
          rows={props.rows}
          onChange={props.onChange} />
        <div className="input">{props.error}</div>
      </div>
    </fieldset>
  );
};

TextArea.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
  inputdiv: PropTypes.string,
  inputstyle: PropTypes.string,
  labelstyle: PropTypes.string,
  rows: PropTypes.string,
};

export default TextArea;
