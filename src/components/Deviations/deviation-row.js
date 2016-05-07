import React, { PropTypes } from 'react';
import moment from 'moment';
import { calculateDay } from 'utils/helpers';

const DeviationRow = (props) => {
  const _dev = props.deviation;
  return (
		<tr onClick = { props.getDeviation.bind(null, props.deviation.dvNo)} >
      <td>{_dev.dvNo}</td>
      <td>{_dev.dvMatNo}</td>
      <td>{_dev.dvMatName}</td>
      <td>{_dev.dvCust}</td>
      <td>{calculateDay(_dev.dvLog[0].dvLogDate, _dev.dvClosed)}</td>
      <td>{_dev.dvAssign}</td>
    </tr>
  );
};

DeviationRow.propTypes = {
  getDeviation: PropTypes.func,
  deviaton: PropTypes.object,
};

export default DeviationRow;
