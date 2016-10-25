const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseToCsv = require('mongoose-to-csv'); //https://www.npmjs.com/package/mongoose-to-csv
const moment = require('moment');

const deviationSchema = new Schema({
    Id: Number,
    dvNo: {type: String, required: '{PATH} is required!'},
    dvMatNo: {type: String, required: '{PATH} is required!'},
    dvMatName: {type: String, required: '{PATH} is required!'},
    dvExtract: {type: String},
    dvCust: {type: String, required: '{PATH} is required!'},
    dvBatchNo: {type: String, required: '{PATH} is required!'},
    dvSupplier: {type: String, required: '{PATH} is required!'},
    dvDOM: {type: Date},
    dvDescribe: {type: String},
    dvAssign: {type: String},
    dvInvest: {type: String},
    dvOutCome: {type:String},
    dvCustSend: {type: Date},
    dvCat: {type: String},
    dvClass: {type: String},
    dvClosed: {type: Number},
    dvDateClosed: {type: Date},
    dvLog: [{
        dvLogType : String,
        dvLogBy : String,
        dvLogDate: Date
        }],
    dvCreated : {type: Date, default: Date.now}
});

deviationSchema.plugin(mongooseToCsv, {
    headers: 'DevNo Mat# Material_Name Customer Assigned Created Closed Class Archive',
    constraints: {
        'DevNo': 'dvNo',
        'Mat#': 'dvMatNo',
        'Material_Name': 'dvMatName',
        'Customer': 'dvCust',
        'Assigned': 'dvAssign',
        'Class': 'dvClass'
    },
    virtuals: {
        'Created': function (doc) {
            const _createdDate = doc.dvCreated ? moment(doc.dvCreated).format("DD/MM/YY") : "";
            return _createdDate;
        },

        'Closed': function (doc) {
            const _closedDate = doc.dvDateClosed ? moment(doc.dvDateClosed).format("DD/MM/YY") : "";
            return _closedDate;
        },

        'Archive': function(doc) {
            return doc.dvClosed ? 'Closed' : 'Open';
        }
    }
});

const Deviation = mongoose.model('Deviation', deviationSchema);
