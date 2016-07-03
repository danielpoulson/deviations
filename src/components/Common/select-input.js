import React, {PropTypes} from 'react';
// TODO: (5) @easy error box refine formatting
const SelectInput = ({name, label, inputdiv, labelstyle, onChange, defaultOption, value, error, options}) => {
  const errorStyle = {marginLeft: 25};
  return (
    <div className="">

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
        </div>
        {error && <span className="alert alert-danger" style={errorStyle}>{error}</span>}
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
  value: PropTypes.any
};

export default SelectInput;