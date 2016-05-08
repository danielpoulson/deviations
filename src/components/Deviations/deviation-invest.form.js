import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import Input from 'components/Common/form-text-input';
import TextArea from 'components/Common/text-area';
import DateTimePicker from 'components/Common/date-picker';
import ComboBox from 'components/Common/combo-box';
import Moment from 'moment';
import momentLocalizer from 'react-widgets/lib/localizers/moment';
momentLocalizer(Moment);
export const fields = [ 'dvUser', 'dvInvest', 'dvOutcome', 'dvCustSend', 'dvCat', 'dvClass'];

const newdata = {  // used to populate "account" reducer when "Load" is clicked

};

const validate = values => {
  const errors = {};

  return errors;
};

@reduxForm({
  form: 'deviation-invest',
  fields,
  validate,
},
  state => ({
    initialValues: state.deviation ? state.deviation : newdata, // will pull state into form's initialValues
  })
)

export default class ChangeForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    users: PropTypes.array.isRequired,
    status: PropTypes.array.isRequired,
  };

  render() {
    const {
      fields: { dvUser, dvInvest, dvOutcome, dvCustSend, dvCat, dvClass },
      onSubmit,
      status,
      outcomes,
      categories,
      classifies,
      users,
      } = this.props;
    return (
      <form onSubmit={onSubmit}>
        <div className="row">
          <div className="col-sm-4">
            <ComboBox
              label="Assigned To"
              data={users}
              defaultValue={users[0]}
              {...dvUser}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <TextArea
              name="dvInvest"
              label="Investigation"
              {...dvInvest}
              value={dvInvest.value || ''}
              rows="6"
              inputstyle="form-control"
            />
          </div>
        </div>
        <div className="Row">
          <div className="col-sm-4">
            <ComboBox
              label="Outcomes"
              data={outcomes}
              {...dvOutcome}
            />
          </div>
        </div>
        <div className="col-sm-2">
            <DateTimePicker
              label="Date sent to customer"
              {...dvCustSend}
            />
        </div>
        <div className="Row">
          <div className="col-sm-4">
            <ComboBox
              label="Categories"
              data={categories}
              {...dvCat}
            />
          </div>
        </div>
        <div className="Row">
          <div className="col-sm-4">
            <ComboBox
              label="Classification"
              data={classifies}
              {...dvClass}
            />
          </div>
        </div>
        <div>
          <button type="submit" className="btn btn-success pull-left" >
            Save Change
          </button>
          <button className="btn btn-info dp-margin-10-LR" onClick={this.props.onCancel}>
            Cancel
          </button>
        </div>
      </form>
    );
  }
}
