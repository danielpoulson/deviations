import React, { PropTypes } from 'react';
import moment from 'moment';
import { calculateDay } from '../../utils/helpers';
import './deviations-list.css';

const DeviationRow = (props) => {
  const _dev = props.deviation;
  const rowStyle = {
    border: 'none'
  };

  let topRow = {};
  let bottomRow = "hidden";



  if(props.detailView) {
    topRow = { fontWeight: 'bold' };
    bottomRow = "";
  }

  return (
    <tbody className="dpHand">
      <tr style={topRow} onClick = {props.getDeviation.bind(null, props.deviation.dvNo)} >
        <td className="dvextract">{_dev.dvNo}</td>
        <td className="dvextract">{_dev.dvMatNo}</td>
        <td className="dvextract">{_dev.dvMatName}</td>
        <td className="dvextract">{_dev.dvCust}</td>
        <td>{calculateDay(_dev.dvCreated, _dev.dvClosed)}</td>
        <td className="dvextract">{_dev.dvAssign}</td>
      </tr>
      <tr  className="bottomRow" onClick = {props.getDeviation.bind(null, props.deviation.dvNo)}>
        <td className="dvextract" style={rowStyle} colSpan="6">{_dev.dvExtract}</td>
      </tr>
    </tbody>
  );
};

DeviationRow.propTypes = {
  getDeviation: PropTypes.func,
  deviation: PropTypes.object,
  detailView: React.PropTypes.bool
};

export default DeviationRow;
