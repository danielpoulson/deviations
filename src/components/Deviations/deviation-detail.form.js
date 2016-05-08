import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import Input from 'components/Common/form-text-input';
import TextArea from 'components/Common/text-area';
import DateTimePicker from 'components/Common/date-picker';
import ComboBox from 'components/Common/combo-box';
import Moment from 'moment';
import momentLocalizer from 'react-widgets/lib/localizers/moment';
momentLocalizer(Moment);
export const fields = ['dvMatNo', 'dvMatName', 'dvBatchNo', 'dvDOM', 'dvDescribe', 'dvCust', 'dvSupplier' ];

const newdata = {  // used to populate "account" reducer when "Load" is clicked

};

const validate = values => {
  const errors = {};

  return errors;
};

@reduxForm({
  form: 'deviation-detail',
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
      fields: { dvMatNo, dvMatName, dvBatchNo, dvDOM, dvDescribe, dvCust, dvSupplier},
      onSubmit,
      status,
      users,
      } = this.props;
    return (
      <form onSubmit={onSubmit}>
        <div className="row">
          <div className="col-sm-12">
            <Input
              name="dvMatNo"
              label="Material Number"
              placeholder="Enter Material No. ( Required, Min 5 character )"
              inputstyle="form-control"
              {...dvMatNo}
            />
            <div className="col-sm-2"></div>
          </div>
          <div className="col-sm-6">
            <Input
              name="dvMatName"
              label="Material Name:"
              placeholder="Enter Item Description ( Required, Min 5 characters )"
              inputstyle="form-control"
              {...dvMatName}
            />
          </div>

          <div className="col-sm-12">
            <Input
              name="dvBatchNo"
              label="Batch Number"
              placeholder="Enter Batch / Lot ( Required, Min 5 characters )"
              inputstyle="form-control"
              {...dvBatchNo}
            />
          </div>
        </div>
        <div className="col-sm-2">
            <DateTimePicker
              label="Date of Manufacture"
              {...dvDOM}
            />
        </div>

        <div className="row">
          <div className="col-sm-12">
            <TextArea
              name="CC_Rat"
              label="Describe the Deviation"
              {...dvDescribe}
              value={dvDescribe.value || ''}
              rows="6"
              inputstyle="form-control"
            />
          </div>
        </div>

        <div className="col-sm-2">
            <DateTimePicker
              label="Date of Deviation"
              {...dvDate}
            />
        </div>
        <div className="row">
          <div className="col-sm-4">
            <Input
              name="dvCust"
              label="Customer"
              placeholder="Enter Customer Name ( Required, Min 5 characters )"
              inputstyle="form-control"
              {...dvCust}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-4">
            <Input
              name="dvSupplier"
              label="Supplier"
              placeholder="Supplier / Manufacturer ( Required, Min 5 characters )"
              inputstyle="form-control"
              {...dvSupplier}
            />
          </div>
        </div>
        <div>
          <button type="submit" className="btn btn-success pull-left" disabled={submitting} >
            {submitting ? <i /> : <i />} Save Change
          </button>
          <button className="btn btn-info dp-margin-10-LR" disabled={submitting} onClick={this.props.onCancel}>
            Cancel
          </button>
        </div>
      </form>
    );
  }
}
