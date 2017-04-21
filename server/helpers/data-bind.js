'use strict';
const deviations = require('../controllers/deviations');
const tasks = require('../controllers/tasks');
const utils = require('../config/utils');
const reporter = require('./reports');

let reportName = '';
let _status = '';

function createTaskReport(filename, search, regExSearch, status){
    reportName = filename;
    _status = status;
    const p = deviations.getReportData(5);
    p.then(data => getCombinedData(data));

}

function getCombinedData(data) {
    const devData = data;
    const _tasks = tasks.getReportData(5);
    const fields = ['SourceId', 'Deviation_Title', 'Task_Name', 'Start', 'Target', 'Champion', 'Status'];

    _tasks.then( data => {

        const reformattedArray = data.map( obj => {
            const Task_Name = obj.TKName.replace(/,/g, "");
            const Start = (typeof obj.TKStart != 'undefined') ? utils.dpFormatDate(obj.TKStart) : '';
            const Target = (typeof obj.TKTarg != 'undefined') ? utils.dpFormatDate(obj.TKTarg) : '';
            const Champion = obj.TKChamp;
            const Status = getStatus(obj.TKStat);
            const SourceId = obj.SourceId.replace(/,/g, "");

            const _tasks = devData.find(dev => dev.dvNo === obj.SourceId);

            if (typeof _tasks === 'object') {
                const Deviation_Title = _tasks.dvMatName;
                return {Task_Name, Deviation_Title, Target, Start, Champion, Status, SourceId};
            }

        });

        reporter.printToCSV(reformattedArray, reportName, fields);

    });

    _tasks.catch(err => utils.handleError(err));

}

function getStatus(status) {
    switch (status) {
        case 1 :
            return "Not Started (New)";
        case 2 :
            return 'On Track';
        case 3 :
            return 'In Concern';
        case 4 :
            return 'Behind Schedule';
        case 5 :
            return 'Completed';
        default :
            return "Not Set";
    }
}

exports.createTaskReport = createTaskReport;
