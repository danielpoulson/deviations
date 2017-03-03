const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseToCsv = require('mongoose-to-csv'); //https://www.npmjs.com/package/mongoose-to-csv
const moment = require('moment');
const dateFunc = require('../config/date-function');

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
        'Assigned': 'dvAssign',
        'Class': 'dvClass'
    },
    virtuals: {
        'Material_Name': function (doc) {
            const descpt = doc.dvMatName.replace(/,/g, "");
            return descpt;
        },
        'Customer': function (doc) {
            const comp = doc.dvCust.replace(/,/g, "");
            return comp;
        },
        'Created': function (doc) {
            const _date = (typeof doc.dvCreated != 'undefined') ? dateFunc.dpFormatDate(doc.dvCreated) : '';
            return _date;
        },

        'Closed': function (doc) {
            const _date = (typeof doc.dvDateClosed != 'undefined') ? dateFunc.dpFormatDate(doc.vDateClosed) : '';
            return _date;
        },

        'Archive': function(doc) {
            return doc.dvClosed ? 'Closed' : 'Open';
        }
    }
});

const Deviation = mongoose.model('Deviation', deviationSchema);
