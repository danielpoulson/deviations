var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseToCsv = require('mongoose-to-csv'); //https://www.npmjs.com/package/mongoose-to-csv

var deviationSchema = new Schema({
    Id: Number,
    dvNo: {type: String, required: '{PATH} is required!'},
    dvMatNo: {type: String, required: '{PATH} is required!'},
    dvMatName: {type: String, required: '{PATH} is required!'},
    dvCust: {type: String, required: '{PATH} is required!'},
    dvBatchNo: {type: String, required: '{PATH} is required!'},
    dvSupplier: {type: String, required: '{PATH} is required!'},
    dvDOM: {type: Date},
    dvDate: {type: Date},
    dvDescribe: {type: String},
    dvAssign: {type: String},
    dvInvest: {type: String},
    dvOutCome: {type:String},
    dvCustSend: {type: Date},
    dvCat: {type: String},
    dvClass: {type: String},
    dvClosed: {type: Number},
    dvLog: [{
        dvLogType : String,
        dvLogBy : String,
        dvLogDate: Date
        }],
    dvCreated : {type: Date, default: Date.now}
});

deviationSchema.plugin(mongooseToCsv, {
    headers: 'DevNo Mat# Material_Name Customer Assigned Created Class',
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
            var dateString = new Date(doc.dvCreated);
            var day = dateString.getDay().toString();
            var mth = dateString.getMonth();
            var yr = dateString.getYear();
            var _date = ('0'+ day ).slice(-2) + '/' + ('0'+ mth ).slice(-2)  + '/' + ('0'+ yr ).slice(-2);

            return _date;
        }
    }
});

var Deviation = mongoose.model('Deviation', deviationSchema);
