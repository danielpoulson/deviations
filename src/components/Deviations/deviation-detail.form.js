import React, { Component, PropTypes } from 'react';
import InputText from 'components/Common/form-text-input';
import TextArea from 'components/Common/text-area';
import DateTimePicker from 'components/Common/date-picker';
import Moment from 'moment';
import momentLocalizer from 'react-widgets/lib/localizers/moment';
momentLocalizer(Moment);


const DevDetailForm = ({dev, onSave, onCancel, onChange, onDateChange, errors}) => {

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
        placeholder="Enter Item Description ( Required, Min 5 characters )"
        labelstyle="col-sm-2 control-label"
        inputdiv="col-sm-9"
        error={errors.dvMatName}/>

      <InputText
        name="dvBatchNo"
        label="Batch Number:"
        value={dev.dvBatchNo}
        onChange={onChange}
        placeholder="Enter Batch / Lot ( Required, Min 5 characters )"
        labelstyle="col-sm-2 control-label"
        inputdiv="col-sm-4"
        error={errors.dvBatchNo}/>

      <DateTimePicker
        name="dvDom"
        label="DOM:"
        labelstyle="col-sm-2 control-label"
        inputdiv="col-sm-2"
        value={dev.dvDom}
        onChange={onDateChange.bind(null, "dvDom")}
        error={errors.dvDom}/> 

      <TextArea
        name="dvDescribe"
        label="Describe the Deviation"
        value={dev.dvDescribe}
        rows="6"
        onChange={onChange}
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

      <InputText
        name="dvCust"
        label="Customer:"
        value={dev.dvCust}
        onChange={onChange}
        placeholder="Enter Customer Name ( Required, Min 5 characters )"
        labelstyle="col-sm-2 control-label"
        inputdiv="col-sm-6"
        error={errors.dvCust}/>

      <InputText
        name="dvSupplier"
        label="Supplier:"
        value={dev.dvSupplier}
        onChange={onChange}
        placeholder="Enter Customer Name ( Required, Min 5 characters )"
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
}

DevDetailForm.propTypes = {
    handleSubmit: PropTypes.func,
    onCancel: PropTypes.func,
  };

export default DevDetailForm;
