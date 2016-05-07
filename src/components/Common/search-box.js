import React, { PropTypes } from 'react';

const SearchBox = ({ searchText, onChange }) => {
  const divStyle = { paddingRight: 15 };
  const spanStyle = {
    background: '#71ABFF',
    color: '#FFFFFF',
    border: '1px solid #71ABFF',
  };
  return (
    <div className="col-sm-6 pull-right input-group " style={divStyle}>
      <input
        type="text"
        className="form-control"
        value={searchText || ''}
        onChange={onChange}
        placeholder="Enter Search Text"
      />
      <span style={spanStyle} className="input-group-addon glyphicon glyphicon-search"></span>
    </div>
  );
};

SearchBox.propTypes = {
  searchText: PropTypes.string,
  onChange: PropTypes.func,
};

export default SearchBox;
