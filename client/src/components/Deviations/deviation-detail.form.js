import React, { PropTypes } from 'react';
import InputText from '../../components/Common/form-text-input';
import TextArea from '../../components/Common/text-area';
import DateTimePicker from '../../components/Common/date-picker';
import SelectInput from '../../components/Common/select-input';
import Moment from 'moment';
import momentLocalizer from 'react-widgets/lib/localizers/moment';
momentLocalizer(Moment);

const DevDetailForm = ({customer, dev, onSave, onCancel, onChange, onDateChange, errors, settings}) => {
  return (
    <form className="form-horizontal">
      <InputText
          name="dvMatNo"
          label="Material Number"
          value={dev.dvMatNo}
          onChange={onChange}
          placeholder="Enter Material No. ( Required, Min 5 character )"
          labelstyle="col-sm-2 control-label"
          inputdiv="col-sm-4"
          error={errors.dvMatNo}/>

      <InputText
        name="dvMatName"
        label="Material Name:"
        value={dev.dvMatName}
        onChange={onChange}
        placeholder="Enter Item Description ( Required, Min 10 characters )"
        labelstyle="col-sm-2 control-label"
        inputdiv="col-sm-9"
        error={errors.dvMatName}/>

      <InputText
        name="dvBatchNo"
        label="Batch Number:"
        value={dev.dvBatchNo}
        onChange={onChange}
        placeholder="Enter Batch / Lot"
        labelstyle="col-sm-2 control-label"
        inputdiv="col-sm-4"
        error={errors.dvBatchNo}/>

      <DateTimePicker
        name="dvDOM"
        label="DOM:"
        labelstyle="col-sm-2 control-label"
        inputdiv="col-sm-2"
        value={dev.dvDOM}
        onChange={onDateChange.bind(null, "dvDOM")}
        error={errors.dvDOM}/>

      <TextArea
        name="dvDescribe"
        label="Describe the Deviation"
        value={dev.dvDescribe}
        rows="6"
        onChange={onChange}
        placeholder="Describe the deviation ( Required, Min 50 characters )"
        error={errors.dvDescribe}
        labelstyle="col-sm-2 control-label"
        inputdiv="col-sm-9" />

      <DateTimePicker
        name="dvCreated"
        label="Deviation Created"
        labelstyle="col-sm-2 control-label"
        inputdiv="col-sm-2"
        value={dev.dvCreated}
        onChange={onDateChange.bind(null, "dvCreated")}
        error={errors.dvCreated}/>

      {
        settings.app === "fmc" ?
        <SelectInput
          name="dvCust"
          label="Customer:"
          value={dev.dvCust}
          options={customer}
          onChange={onChange}
          defaultOption="FMC - Crop Protection"
          placeholder="Enter Customer Name ( Required, Min 5 characters )"
          labelstyle="col-sm-2 control-label"
          inputdiv="col-sm-6"
          error={errors.dvCust}/>

          :
          <InputText
            name="dvCust"
            label="Customer:"
            value={dev.dvCust}
            onChange={onChange}
            placeholder="Enter Customer Name ( Required, Min 5 characters )"
            labelstyle="col-sm-2 control-label"
            inputdiv="col-sm-6"
            error={errors.dvCust}/>
      }


      <InputText
        name="dvSupplier"
        label="Supplier:"
        value={dev.dvSupplier}
        onChange={onChange}
        placeholder="Enter Supplier Name ( Required, Min 5 characters )"
        labelstyle="col-sm-2 control-label"
        inputdiv="col-sm-6"
        error={errors.dvSupplier}/>

      <div className="pull-right">
        <button className="btn btn-primary" onClick={onSave} >
          Save Deviation
        </button>
        <button className="btn btn-info dp-margin-10-LR" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

DevDetailForm.propTypes = {
    onDateChange: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    dev: React.PropTypes.object.isRequired,
    errors: React.PropTypes.object.isRequired
  };

export default DevDetailForm;
