import React, { Component, PropTypes } from 'react';
import Input from '../../components/Common/form-text-input';
import TextArea from '../../components/Common/text-area';
import DateTimePicker from '../../components/Common/date-picker';
import SelectInput from '../../components/Common/select-input';
import Moment from 'moment';
import momentLocalizer from 'react-widgets/lib/localizers/moment';
momentLocalizer(Moment);


const DevInvestForm = ({dev, onSave, onCloseDev, onPrintDev, status, outcomes,
   onChange, onCancel, onDateChange, errors, categories, classifies, users}) => { 

  return (
    <form className="form form-horizontal" >
      <div className="pull-right">
        <button className="btn btn-warning dp-margin-10-LR" onClick={onCloseDev} >Close Deviation</button>
        <button className="btn btn-info" onClick={onPrintDev}>Print Deviation</button>
      </div>

      <SelectInput
        name="dvAssign"
        label="Assigned to:"
        labelstyle="col-sm-2 control-label"
        inputdiv="col-sm-3"
        value={dev.dvAssign}
        defaultOption="Assign To Owner"
        options={users}
        onChange={onChange}
        error={errors.dvAssign}/>


      <TextArea
        name="dvInvest"
        label="Investigation"
        value={dev.dvInvest || ''}
        rows="6"
        onChange={onChange}
        error={errors.dvInvest}
        labelstyle="col-sm-2 control-label"
        inputdiv="col-sm-10" />

    <SelectInput
        name="dvOutCome"
        label="Outcomes:"
        labelstyle="col-sm-2 control-label"
        inputdiv="col-sm-3"
        value={dev.dvOutCome}
        defaultOption="Assign an outcome"
        options={outcomes}
        onChange={onChange}
        error={errors.dvOutCome}/>

      <DateTimePicker
        name="dvCustSend"
        label="Date sent to customer"
        labelstyle="col-sm-2 control-label"
        inputdiv="col-sm-2"
        value={dev.dvCustSend}
        onChange={onDateChange.bind(null, "dvCustSend")}
        error={errors.dvCustSend}/>

    <SelectInput
        name="dvCat"
        label="Categories:"
        labelstyle="col-sm-2 control-label"
        inputdiv="col-sm-3"
        value={dev.dvCat}
        defaultOption="Assign categories"
        options={categories}
        onChange={onChange}
        error={errors.dvCat}/> 

    <SelectInput
        name="dvClass"
        label="Classification:"
        labelstyle="col-sm-2 control-label"
        inputdiv="col-sm-3"
        value={dev.dvClass}
        defaultOption="Assign a Classification"
        options={classifies}
        onChange={onChange}
        error={errors.dvClass}/>

      <div className="pull-right">
        <button className="btn btn-primary" onClick={onSave} >
          Save Investigation
        </button>
        <button className="btn btn-default dp-margin-10-LR" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

DevInvestForm.propTypes = {
    dev: React.PropTypes.object.isRequired,
    categories: React.PropTypes.array.isRequired,
    classifies: React.PropTypes.array.isRequired,
    outcomes: React.PropTypes.array.isRequired,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onDateChange: PropTypes.func.isRequired,
    onCloseDev: PropTypes.func.isRequired,
    onPrintDev: PropTypes.func.isRequired,
    users: PropTypes.array.isRequired,
    status: PropTypes.array.isRequired,
    errors: PropTypes.object.isRequired
};

export default DevInvestForm;
