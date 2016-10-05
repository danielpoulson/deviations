import React, { Component } from 'react';
import { connect } from 'react-redux';
import DeviationPrint from '../../components/DeviationPrint/deviation-print.component';

class DeviationPrintContainer extends Component {
	render() {
		return (
			<div>
				<DeviationPrint dev={this.props.deviation} task={this.props.task} />
			</div>
		);
	}
}

DeviationPrintContainer.propTypes = {
	deviation: React.PropTypes.object,
	task: React.PropTypes.array
};

export default connect(state => ({
  deviation: state.deviation,
  task: state.tasks.ctlist
}))(DeviationPrintContainer);
