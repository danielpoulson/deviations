import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const loggerSchema = new Schema({
	SourceId: {type: String, required: '{PATH} is required!'},
	LogType: {type: String, required: '{PATH} is required!'},
	LogMessage: {type: String, required: '{PATH} is required!'},
	LogBy: {type: String, required: '{PATH} is required!'},
	LogDate: {type: Date, required: '{PATH} is required!'},
});


const Logger = mongoose.model('Logger', loggerSchema);