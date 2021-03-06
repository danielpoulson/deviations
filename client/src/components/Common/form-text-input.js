import PropTypes from 'prop-types';
import React from 'react';


class TextInput extends React.Component {
  render() {

    // const spanStyle = { color: 'red' };

    let wrapperClass = 'form-group';
    const _inputstyle = 'form-control' || this.props.inputstyle;
    const _inputdiv = this.props.inputdiv;
    const _labelstyle = this.props.labelstyle;

    if (this.props.error && this.props.error.length > 0) {
      wrapperClass += ' has-error';
    }

    return (
      <fieldset className={wrapperClass}>
        <label className={_labelstyle} htmlFor={this.props.name}>{this.props.label}</label>
        <div className={_inputdiv}>
          <input type={this.props.type ? this.props.type : 'text'}
            name={this.props.name}
            className={_inputstyle}
            placeholder={this.props.placeholder}
            ref={this.props.name}
            value={this.props.value || ''}
            onChange={this.props.onChange} />
          {this.props.error && <div className="alert alert-danger">{this.props.error}</div>}
        </div>
      </fieldset>
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
  inputdiv: PropTypes.string,
  inputstyle: PropTypes.string,
  labelstyle: PropTypes.string,
  touched: PropTypes.bool,
  type: PropTypes.string
};
