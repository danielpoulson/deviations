import React, { PropTypes } from 'react';
import moment from 'moment';
import { scrollable } from './deviations-list.scss';

const DeviationLog = (props) => {

  const _log = props.log;
  let logs = [];
  const spanStyle = { color: 'blue', paddingRight: 10 };
  const butGroup = { padding: 10 };
  const listStyleLi = { padding: 5 }

  if (_log !== null && Object.keys(_log).length !== 0) {
    const sortlogs = _log.sort(function (a, b) {
      if (a.LogDate > b.LogDate) {
        return 1;
      }
      if (a.LogDate < b.LogDate) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });

    logs = sortlogs.map((log) => <li style={listStyleLi} key={log._id}>
                        {log.LogType} - {log.LogMessage} - {log.LogBy} <small>({moment(new Date(log.LogDate)).format('DD/MM/YY, h:mm a')})</small>
                      </li>);

  }

  return (
    <div className={props.logTab}>
          <div className="col-sm-12 margin-10-top">
              <ul className={scrollable}>{logs}</ul>
          </div>
      </div>

  );

};

DeviationLog.propTypes = {
  log: PropTypes.array,
  logTab: PropTypes.string,
  onApprove: PropTypes.func,
  onFinal: PropTypes.func,
  onCancel: PropTypes.func,
};

export default DeviationLog;
