var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseToCsv = require('mongoose-to-csv'); //https://www.npmjs.com/package/mongoose-to-csv

var taskSchema = new Schema({
    ID: Number,
    TKName: {type: String, required: '{PATH} is required!'},
    TKStart: {type: Date, required: '{PATH} is required!'},
    TKTarg: {type: Date, required: '{PATH} is required!'},
    TKChamp: {type: String, required: '{PATH} is required!'},
    TKStat: {type: Number, required: '{PATH} is required!'},
    SourceId: {type: String, required: '{PATH} is required!'},
    TKComment: String,
    TKChampNew: {type: Boolean, default: false}
});

taskSchema.plugin(mongooseToCsv, {
    headers: 'Source Task Owner StartDate TargetDate Status',
    constraints: {
        'Source': 'SourceId',
        'Task': 'TKName',
        'Owner': 'TKChamp',
        'Status': 'TKStat'
    },
    virtuals: {
        'StartDate': function (doc) {
            var dateString = new Date(doc.TKStart);
            var day = dateString.getDay().toString();
            var mth = dateString.getMonth();
            var yr = dateString.getYear();
            var _date = (typeof doc.TKStart != 'undefined')  ? ('0'+ day ).slice(-2) + '/' + ('0'+ mth ).slice(-2)  + '/' + ('0'+ yr ).slice(-2) : '';

            return _date;
        },

        'TargetDate': function (doc) {
            var dateString = new Date(doc.TKTarg);
            var day = dateString.getDay().toString();
            var mth = dateString.getMonth();
            var yr = dateString.getYear();
            var _date = (typeof doc.TKTarg != 'undefined') ? ('0'+ day ).slice(-2) + '/' + ('0'+ mth ).slice(-2)  + '/' + ('0'+ yr ).slice(-2) : '';

            return _date;
        }
    }

});

var Task = mongoose.model('Task', taskSchema);
