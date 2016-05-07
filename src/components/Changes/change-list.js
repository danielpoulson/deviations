import React from 'react';
import ChangeRow from './change-row';
import classNames from 'classnames';

const ChangeList = (props) => {

  const _changes = props.changelist;

  const th1Class = classNames({
    'fa fa-sort-asc': props.colSelected === 'CC_No',
  });

  const th2Class = classNames({
    'fa fa-sort-asc': props.colSelected === 'CC_Champ',
  });

  const th3Class = classNames({
    'fa fa-sort-asc': props.colSelected === 'CC_TDate',
  });

  const th4Class = classNames({
    'fa fa-sort-asc': props.colSelected === 'CC_Stat',
  });

  if (_changes !== undefined) {

    var changes = _changes.map((change) => <ChangeRow key={change.CC_No} change={change}
      getChange = {props.getChange}
    />);
  }

  return (
      <div>
          <div className="panel panel-success">
              <table className="table table-hover phange-table dp_point">
                  <thead className="print-table-head">
                      <tr className="dpHand">
                          <th className="col-sm-8" onClick={props.sortByClick.bind(null, 'CC_No')}>
                              Change Number and Title <span className={th1Class}></span>
                          </th>
                          <th className="col-sm-2" onClick={props.sortByClick.bind(null, 'CC_Champ')}>
                              Owner <span className={th2Class}></span>
                          </th>
                          <th className="col-sm-1" onClick={props.sortByClick.bind(null, 'CC_TDate')}>
                              Target <span className={th3Class}></span>
                          </th>
                          <th className="col-sm-1" onClick={props.sortByClick.bind(null, 'CC_Stat')}>
                              Status <span className={th4Class}></span>
                          </th>
                      </tr>
                  </thead>
                  <tbody className="dpHand">{changes}</tbody>
              </table>
              </div>
      </div>
  );
};

ChangeList.propTypes = {
  changelist: React.PropTypes.array,
  setMain: React.PropTypes.func,
  getChange: React.PropTypes.func,
  sortByClick: React.PropTypes.func,
  colSelected: React.PropTypes.string,
};

export default ChangeList;
