import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import Input from 'components/Common/form-text-input';
import TextArea from 'components/Common/text-area';
import DateTimePicker from 'components/Common/date-picker';
import ComboBox from 'components/Common/combo-box';
import Moment from 'moment';
import momentLocalizer from 'react-widgets/lib/localizers/moment';
momentLocalizer(Moment);
export const fields = [];

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
      fields: { CC_Descpt, CC_Code, CC_Multi, CC_ASS, CC_Champ, CC_Comp, CC_TDate, CC_CDate, CC_Pry, CC_Stat, CC_Curt, CC_Prop, CC_Rat },
      onSubmit,
      status,
      users,
      } = this.props;
    return (
      <form onSubmit={onSubmit}>
        <div className="row">
          <div className="col-sm-12">
            <Input
              name="CC_Descpt"
              label="Change Title"
              placeholder="Enter the title of your change request (Required)"
              inputstyle="form-control"
              {...CC_Descpt}
            />
          </div>
          <div className="col-sm-6">
            <Input
              name="CC_Code"
              label="Code / Item"
              placeholder="Enter an item code (Required)"
              inputstyle="form-control"
              {...CC_Code}
            />
          </div>

          <div className="col-sm-6">
            <Input
              name="CC_Multi"
              label="Multipy Products?"
              placeholder="Does this CC affect multiply products?"
              inputstyle="form-control"
              {...CC_Multi}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-4">
            <Input
              name="CC_ASS"
              label="Associated"
              placeholder="Associated CC or Dev?"
              inputstyle="form-control"
              {...CC_ASS}
            />
          </div>
          <div className="col-sm-4">
            <ComboBox
              label="Champion"
              data={users}
              defaultValue={users[0]}
              {...CC_Champ}
            />
          </div>
          <div className="col-sm-4">
            <Input
              name="CC_Comp"
              label="Company"
              placeholder="Company impacted (Required)"
              inputstyle="form-control"
              {...CC_Comp}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-2">
            <DateTimePicker
              label="Target Date"
              onChange={this.handleStartDateChange}
              {...CC_TDate}
            />
          </div>
          <div className="col-sm-2">
            <DateTimePicker
              label="Complete Date"
              onChange={this.handleStartDateChange}
              {...CC_CDate}
            />
          </div>
          <div className="col-sm-1">
            <Input
              name="CC_Pry"
              label="Priority"
              {...CC_Pry}
              inputstyle="form-control"
            />
          </div>
          <div className="col-sm-4">
            <ComboBox
              label="Complete Date"
              onChange={this.handleStartDateChange}
              data={status}
              {...CC_Stat}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <TextArea
              name="CC_Curt"
              label="Current Situation"
              rows="4"
              inputstyle="form-control"
              {...CC_Curt}
              value={CC_Curt.value || ''}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <TextArea
              name="CC_Prop"
              label="Proposed Situation"
              {...CC_Prop}
              value={CC_Prop.value || ''}
              rows="4"
              inputstyle="form-control"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <TextArea
              name="CC_Rat"
              label="Justification and Rational"
              {...CC_Rat}
              value={CC_Rat.value || ''}
              rows="4"
              inputstyle="form-control"
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
