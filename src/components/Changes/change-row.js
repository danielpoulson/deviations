import React, {
  PropTypes
} from 'react';
import moment from 'moment';
import {
  getStatCC
} from 'utils/status';

const ChangeRow = (props) => {
  const _change = props.change;
  return (
		<tr onClick = { props.getChange.bind(null, props.change.CC_No)} >
			<td> {_change.CC_No} - {_change.CC_Descpt} </td>
			<td> {_change.CC_Champ} </td>
			<td> {moment(_change.CC_TDate).format('DD/MM/YYYY')} </td>
			<td className = "colaligncenter" ><i className = {getStatCC(_change.CC_Stat)} ></i></td>
    </tr>
  );
};

ChangeRow.propTypes = {
  getChange: PropTypes.func,
  change: PropTypes.object,
};

export default ChangeRow;
