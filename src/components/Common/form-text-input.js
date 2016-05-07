import React, { PropTypes } from 'react';

class TextInput extends React.Component {
  render() {

    const spanStyle = { color: 'red' };

    const wrapperClass = 'form-group';
    if (this.props.touched && this.props.error && this.props.error.length > 0) {
      `${wrapperClass} has-error`;
    }

    return (
      <div className={wrapperClass}>
        <label className="control-label" htmlFor={this.props.name}>{this.props.label}</label>
        <div className="fields">
          <input type={this.props.type ? this.props.type : 'text' }
            name={this.props.name}
            className={this.props.inputstyle}
            placeholder={this.props.placeholder}
            ref={this.props.name}
            value={this.props.value || ''}
            onChange={this.props.onChange} />
          {this.props.touched && this.props.error && <div style={spanStyle} className="input">{this.props.error}</div> }
        </div>
      </div>
    );

  }
}

export default TextInput;

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
  inputstyle: PropTypes.string,
  touched: PropTypes.bool,
  type: PropTypes.string,
};
