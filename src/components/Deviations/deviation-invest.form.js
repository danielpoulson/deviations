import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import Input from 'components/Common/form-text-input';
import TextArea from 'components/Common/text-area';
import DateTimePicker from 'components/Common/date-picker';
import ComboBox from 'components/Common/combo-box';
import Moment from 'moment';
import momentLocalizer from 'react-widgets/lib/localizers/moment';
momentLocalizer(Moment);
export const fields = [ 'dvAssign', 'dvInvest', 'dvOutCome', 'dvCustSend', 'dvCat', 'dvClass'];

const newdata = {  // used to populate "account" reducer when "Load" is clicked

};

const validate = values => {
  const errors = {};

  return errors;
};

@reduxForm({
  form: 'devform',
  fields,
  destroyOnUnmount: false,
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
      fields: { dvAssign, dvInvest, dvOutCome, dvCustSend, dvCat, dvClass },
      handleSubmit,
      status,
      outcomes,
      categories,
      classifies,
      users,
      } = this.props;
    return (
      <form onSubmit={handleSubmit} className="form-horizontal">

        <ComboBox
          label="Assigned To"
          data={users}
          defaultValue={users[0]}
          labelstyle="col-sm-2 control-label"
          inputdiv="col-sm-3"
          {...dvAssign}
        />

        <TextArea
          name="dvInvest"
          label="Investigation"
          value={dvInvest.value || ''}
          rows="6"
          labelstyle="col-sm-2 control-label"
          inputdiv="col-sm-10"
          {...dvInvest}
        />

        <ComboBox
          label="Outcomes"
          data={outcomes}
          labelstyle="col-sm-2 control-label"
          inputdiv="col-sm-3"
          {...dvOutCome}
        />

        <DateTimePicker
          label="Date sent to customer"
          labelstyle="col-sm-2 control-label"
          inputdiv="col-sm-2"
          {...dvCustSend}
        />

        <ComboBox
          label="Categories"
          data={categories}
          labelstyle="col-sm-2 control-label"
          inputdiv="col-sm-3"
          {...dvCat}
        />

        <ComboBox
          label="Classification"
          data={classifies}
          labelstyle="col-sm-2 control-label"
          inputdiv="col-sm-3"
          {...dvClass}
        />

        <div className="pull-right">
          <button type="submit" className="btn btn-primary" >
            Save Investigation
          </button>
          <button className="btn btn-default dp-margin-10-LR" onClick={this.props.onCancel}>
            Cancel
          </button>
        </div>
      </form>
    );
  }
}
