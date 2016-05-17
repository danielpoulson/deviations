import React, { Component } from 'react';
import { connect } from 'react-redux';
import DeviationPrint from 'components/DeviationPrint/deviation-print.component';

class DeviationPrintContainer extends Component {
	render() {
		return (
			<div>
				<DeviationPrint dev = {this.props.deviation} />
			</div>
		);
	}
}

export default connect(state => ({
  deviation: state.deviation
}))(DeviationPrintContainer);
