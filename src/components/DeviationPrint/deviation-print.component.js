import React, { PropTypes } from 'react';
import TaskList from 'components/Tasks/task-list';
import moment from 'moment';
import { Chemlogo, devdescribe, devColLeft, devColRight, taskTable, reportHeader } from './deviation-print.style';

export default function DeviationPrint (props) {

	return (
		<div>
			<img src="./src/images/RED_SOLID.jpg" className={Chemlogo} />
			<hr/>
			<div className={reportHeader}>Investigation Report  -  <span>{props.dev.dvNo}</span></div>
			<div><strong>Material Name :</strong> {props.dev.dvMatName}</div>
			<table className={`${devColLeft}`}>
				<tbody>
					<tr>
						<td className={`${devColLeft}`}><strong>Material No :</strong> {props.dev.dvMatNo}</td>
						<td className={`${devColRight}`}><strong>Assigned To :</strong> {props.dev.dvAssign}</td>
					</tr>
					<tr>
						<td className={`${devColLeft}`}><strong>Batch # :</strong> {props.dev.dvBatchNo}</td>
						<td className={`${devColRight}`}><strong>DOM:</strong> {moment(props.dev.dvDOM).format('DD/MM/YYYY')}</td>
					</tr>
					<tr>
						<td className={`${devColLeft}`}><strong>Customer :</strong> {props.dev.dvCust}</td>
						<td className={`${devColRight}`}><strong>Supplier :</strong> {props.dev.dvSupplier}</td>
					</tr>
					<tr>
						<td className={`${devColLeft}`}><strong>Outcome :</strong> {props.dev.dvOutCome}</td>
						<td className={`${devColRight}`}><strong>Category :</strong> {props.dev.dvCat}</td>
					</tr>
				</tbody>
			</table>
	   	    <div >
		    	<div className={`${devdescribe}`}><b>Describe the Deviation</b></div>
		    	<div className="">{props.dev.dvDescribe}</div>
		    </div>

	        <div className={`${devdescribe}`}><b>Investigation</b></div>
	        <div >{props.dev.dvInvest}</div>

			<div className="page-break">
			    <div className="row logo-page-break"><img src="./src/images/RED_SOLID.jpg" className={Chemlogo} />
			    </div>
			    <div className={devdescribe}>
			        <div className="h4">Deviation Task and CAPA Actions</div>
			    </div>
			    <div>
			        <TaskList
			            tasklist = {props.task}
			            type = "All" />
			    </div>
			</div>
		</div>
	);
}

DeviationPrint.propTypes = {
}

DeviationPrint.defaultProps = {
}

