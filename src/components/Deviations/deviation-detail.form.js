import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import Input from 'components/Common/form-text-input';
import TextArea from 'components/Common/text-area';
import DateTimePicker from 'components/Common/date-picker';
import Moment from 'moment';
import momentLocalizer from 'react-widgets/lib/localizers/moment';
momentLocalizer(Moment);
export const fields = ['dvMatNo', 'dvMatName', 'dvBatchNo', 'dvDOM', 'dvDescribe', 'dvCreated', 'dvCust', 'dvSupplier' ];

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
    handleSubmit: PropTypes.func,
    onCancel: PropTypes.func,
  };

  render() {
    const {
      fields: { dvMatNo, dvMatName, dvBatchNo, dvDOM, dvDescribe, dvCreated, dvCust, dvSupplier},
      handleSubmit,
      onCancel,
      } = this.props;
    return (
      <form onSubmit={handleSubmit} className="form-horizontal">
          
        <Input
          name="dvMatNo"
          label="Material Number"
          placeholder="Enter Material No. ( Required, Min 5 character )"
          labelstyle="col-sm-2 control-label"
          inputdiv="col-sm-4"
          {...dvMatNo}
        />

        <Input
          name="dvMatName"
          label="Material Name:"
          labelstyle="col-sm-2 control-label"
          placeholder="Enter Item Description ( Required, Min 5 characters )"
          inputdiv="col-sm-9"
          {...dvMatName}
        />

        <Input
          name="dvBatchNo"
          label="Batch Number"
          labelstyle="col-sm-2 control-label"
          placeholder="Enter Batch / Lot ( Required, Min 5 characters )"
          inputdiv="col-sm-4"
          {...dvBatchNo}
        />

        <DateTimePicker
          name="dvDom"
          label="Date of Manufacture"
          labelstyle="col-sm-2 control-label"
          inputdiv="col-sm-2"
          {...dvDOM}
        />

        <TextArea
          name="CC_Rat"
          label="Describe the Deviation"
          labelstyle="col-sm-2 control-label"
          inputdiv="col-sm-9"
          value={dvDescribe.value || ''}
          rows="6"
          {...dvDescribe}
        />

        <DateTimePicker
          name="dvCreated"
          label="Date of Deviation"
          labelstyle="col-sm-2 control-label"
          inputdiv="col-sm-2"
          {...dvCreated}
        />

        <Input
          name="dvCust"
          label="Customer"
          labelstyle="col-sm-2 control-label"
          placeholder="Enter Customer Name ( Required, Min 5 characters )"
          inputdiv="col-sm-6"
          {...dvCust}
        />

        <Input
          name="dvSupplier"
          label="Supplier"
          labelstyle="col-sm-2 control-label"
          placeholder="Supplier / Manufacturer ( Required, Min 5 characters )"
          inputdiv="col-sm-6"
          {...dvSupplier}
        />

        <div className="pull-right">
          <button type="submit" className="btn btn-primary" >
            Save Deviation
          </button>
          <button className="btn btn-default dp-margin-10-LR" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    );
  }
}
