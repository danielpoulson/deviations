import React, { PropTypes } from 'react';

const Pagination = (props) => {

  const activePage = props.activePage;
  const count = props.count;
  const numPage = props.numPage;
  const linkStyle = { color: '#71ABFF' };
  let pagnum = 1;

  pagnum = Math.ceil(count / numPage);
  const firstPage = activePage === 0;
  const lastPage = activePage + 1 === pagnum;
  const pagDisplay = `${activePage + 1} of ${pagnum}`;

  return (
    <nav>
      <ul className="list-inline pull-right dpPag" >
        <li className={firstPage ? 'hidden' : 'dpHand'} style={linkStyle} onClick={() => { props.getPage(0);}} >
          <em>First</em>
        </li>
        <li className={firstPage ? 'hidden' : 'dpHand'} onClick={() => { props.getPage(activePage - 1);}} >
          <span className="glyphicon glyphicon-chevron-left" ></span>
        </li>
        <li>{pagDisplay}</li>
        <li className={lastPage ? 'hidden' : 'dpHand'} onClick={()=>{props.getPage(activePage + 1);}} >
          <span className="glyphicon glyphicon-chevron-right" ></span>
        </li>
        <li className={lastPage ? 'hidden' : 'dpHand'} style={linkStyle} onClick={() => {props.getPage(pagnum - 1);}} >
          <em>Last</em>
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
  getPage: PropTypes.func
};

export default Pagination;
