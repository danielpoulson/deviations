import React, { PropTypes } from 'react';
import { fmclogo, Chemlogo } from './deviation-print.style';

export default function DeviationPrint (props) {
	return (
		<div>
			<img src="./src/images/RED_SOLID.jpg" className={Chemlogo} />
			<hr/>
			<div className="report-header">
				<div className="col-md-6">Investigation Report</div>
				<div className="col-md-6">{props.dev.dvNo}</div>
			</div>
			<div className="report-body">
	            <div className="col-md-6"><strong>Material No :</strong> {props.dev.dvMatNo}</div>
	            <div className="col-md-6"><strong>Assigned To :</strong> {props.dev.dvAssign}</div>
	            <div className="col-md-12"><strong>Material Name :</strong> {props.dev.dvMatName}</div>
	         	<div className="col-md-6"><strong>Batch # :</strong> {props.dev.dvBatchNo}</div>
		        <div className="col-md-6"><strong>DOM:</strong> {props.dev.dvDOM}</div>
		      	<div className="col-md-6"><strong>Customer :</strong> {props.dev.dvCust}</div>
		        <div className="col-md-6"><strong>Supplier :</strong> {props.dev.dvSupplier}</div>
        		<div className="col-xs-6"><strong>Outcome :</strong> {props.dev.dvOutCome}</div>
	            <div className="col-xs-6"><strong>Category :</strong> {props.dev.dvCat}</div>
		    </div>

			<div className="container container-fluid report-body">
			    <hr/>
			    <div className="row">
			        <div className="dpheading"><b>Describe the Deviation</b>
			        </div>
			        <div className="report-paragraph">{props.dev.dvDescribe}</div>
			    </div>
			    <div className="row">
			        <div className="dpheading"><b>Investigation</b>
			        </div>
			        <div className="report-paragraph">{props.dev.dvInvest}</div>
			    </div>
			</div>
			<div className="container container-fluid page-break">
			    <div className="row logo-page-break"><img src="./src/images/RED_SOLID.jpg" className={Chemlogo} />
			    </div>
			    <div className="row">
			        <div className="h4">Deviation Task and CAPA Actions</div>
			    </div>
			    <div className="row">
			        <ul>
			            <li>
			                <div className="dptask-text">
			                	<div>Target Date</div>
			                    <div>Assigned To :</div>
			                </div>
			            </li>
			        </ul>
			    </div>
			</div>
		</div>
	);
}

DeviationPrint.propTypes = {
}

DeviationPrint.defaultProps = {
}

