const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    dvStatus: {type: String},
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

const Deviation = mongoose.model('Deviation', deviationSchema);
