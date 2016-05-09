import React from 'react';
import DeviationRow from './deviation-row';
import classNames from 'classnames';

const DeviationList = (props) => {

  const _devs = props.devlist;

  const th1Class = classNames({
    'fa fa-sort-asc': props.colSelected === 'dv_No',
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

  if (_devs !== undefined) {

    var deviations = _devs.map((dev) => <DeviationRow key={dev.dvNo} deviation={dev}
      getDeviation = {props.getDeviation}
    />);
  }

  return (
      <div>
        <div className="panel panel-success">
          <table className="table table-hover phange-table dp_point">
            <thead className="print-table-head">
              <tr className="dpHand">
                <th className="col-sm-1" onClick={props.sortByClick.bind(null, 'dvNo')}>
                  Dev# <span className={th1Class}></span>
                </th>
                <th className="col-sm-2" onClick={props.sortByClick.bind(null, 'dvMatNo')}>
                  Item Id <span className={th1Class}></span>
                </th>
                <th className="col-sm-4" onClick={props.sortByClick.bind(null, 'dvMatName')}>
                    Item Description <span className={th1Class}></span>
                </th>
                <th className="col-sm-2" onClick={props.sortByClick.bind(null, 'dvCust')}>
                    Customer <span className={th2Class}></span>
                </th>
                <th className="col-sm-1" onClick={props.sortByClick.bind(null, 'dvLog')}>
                    Days <span className={th3Class}></span>
                </th>
                <th className="col-sm-2" onClick={props.sortByClick.bind(null, 'dvAssign')}>
                    Assigned <span className={th4Class}></span>
                </th>
              </tr>
            </thead>
          <tbody className="dpHand">{deviations}</tbody>
        </table>
      </div>
    </div>
  );
};

DeviationList.propTypes = {
  devlist: React.PropTypes.array,
  setMain: React.PropTypes.func,
  getDeviation: React.PropTypes.func,
  sortByClick: React.PropTypes.func,
  colSelected: React.PropTypes.string,
};

export default DeviationList;
