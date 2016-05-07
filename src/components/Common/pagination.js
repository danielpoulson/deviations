import React, { PropTypes } from 'react';

const Pagination = (props) => {
  const activePage = props.activePage;
  const count = props.count;
  const numPage = props.numPage;
  let pag = 1;

  pag = Math.ceil(count / numPage);
  const firstPage = activePage === 0;
  const lastPage = activePage + 1 === pag;


  return (
    <nav>
      <ul className = "list-inline pull-right dpPag" >
        <li className = {firstPage ? 'hidden' : 'dpHand'} onClick = {props.getPage.bind(null, activePage - 1)} >
          <span className = "glyphicon glyphicon-chevron-left" ></span></li>
        <li>{activePage + 1} of {pag}</li>
        <li className = {lastPage ? 'hidden' : 'dpHand'} onClick = {props.getPage.bind(null, activePage + 1)} >
          <span className = "glyphicon glyphicon-chevron-right" ></span>
        </li>
        <li>Records {count}</li>
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  activePage: PropTypes.number,
  count: PropTypes.number,
  numPage: PropTypes.number,
  getPage: PropTypes.func,
};

export default Pagination;
