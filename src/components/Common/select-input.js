import React, {PropTypes} from 'react';

const SelectInput = ({name, label, inputdiv, labelstyle, onChange, defaultOption, value, error, options}) => {
  return (
    <div className="form-group">
      <label className={labelstyle} htmlFor={name}>{label}</label>
      <div className={`${inputdiv} styled`}>
        {/* Note, value is set here rather than on the option - docs: https://facebook.github.io/react/docs/forms.html */}
        <select
          name={name}
          value={value}
          onChange={onChange}
          className="form-control">
          <option value="">{defaultOption.text}</option>
          {options.map((option) => {
            return <option key={option.value} value={option.value}>{option.text}</option>;
          })
          }
        </select>

        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </div>
  );
};

SelectInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  defaultOption: PropTypes.string,
  error: PropTypes.string,
  inputdiv: PropTypes.string,
  labelstyle: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object),
  value: PropTypes.string
};

export default SelectInput;