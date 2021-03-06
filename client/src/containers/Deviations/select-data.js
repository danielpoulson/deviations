const customer = [
  { value: 'FMC - Crop Protection', text: 'FMC - Crop Protection'},
  { value: 'FMC - Specialty', text: 'FMC - Specialty'},
  { value: 'FMC - Other', text: 'FMC - Other'},
  { value: 'Other', text: 'Other'}
];

const status = [
        { value: 1, text: 'Review' },
        { value: 2, text: 'Approved' },
        { value: 3, text: 'On-hold' },
        { value: 4, text: 'Closed' },
        { value: 5, text: 'Cancelled' }
    ];

const outcomes = [
  { value: 'Accept', text: 'Accept'},
  { value: 'Rework', text: 'Rework'},
  { value: 'Repair', text: 'Repair'},
  { value: 'Reject', text: 'Reject'},
  { value: '', text: ''}
];

const categories = [
  { value: 'Bulk', text: 'Bulk'},
  { value: 'Finished Goods', text: 'Finished Goods'},
  { value: 'Packaging / Labels', text: 'Packaging / Labels'},
  { value: 'Raw Materials', text: 'Raw Materials'},
  { value: 'Customer Complaint', text: 'Customer Complaint'},
  { value: 'other', text: 'other'},
  { value: '', text: ''}
];

const classifies = [
  { value: 'Contamination', text: 'Contamination'},
  { value: 'Documentation', text: 'Documentation'},
  { value: 'Formulation Difficulty', text: 'Formulation Difficulty'},
  { value: 'Leakers', text: 'Leakers'},
  { value: 'Not Assigned', text: 'Not Assigned'},
  { value: 'Out of Specification', text: 'Out of Specification'},
  { value: 'Operator Error', text: 'Operator Error'},
  { value: 'Procedure', text: 'Procedure'},
  { value: 'Transport Issue', text: 'Transport Issue'},
  { value: 'Stock Discrepancy', text: 'Stock Discrepancy'},
  { value: 'Other', text: 'Other'},
  { value: 'Packaging / Labels', text: 'Packaging / Labels'},
  { value: 'Raw Materials', text: 'Raw Materials'},
  { value: '', text: ''}
];

export {
  customer as customerData,
  status as statusData,
  outcomes as outcomesData,
  categories as categoriesData,
  classifies as classifiesData
};
