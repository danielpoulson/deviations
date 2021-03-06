import PropTypes from 'prop-types';
import React from 'react';
import DeviationRow from './deviation-row';
import classNames from 'classnames';
import './deviations-list.css';

const DeviationList = (props) => {

  const _devs = props.devlist;
  let deviations = [];

  const th1Class = classNames({
    'fa fa-sort-asc': props.colSelected === 'dvNo'
  });

  const th2Class = classNames({
    'fa fa-sort-asc': props.colSelected === 'dvMatNo'
  });

  const th3Class = classNames({
    'fa fa-sort-asc': props.colSelected === 'dvMatName'
  });

  const th4Class = classNames({
    'fa fa-sort-asc': props.colSelected === 'dvCust'
  });

  const th5Class = classNames({
    'fa fa-sort-asc': props.colSelected === 'dvLog'
  });

  const th6Class = classNames({
    'fa fa-sort-asc': props.colSelected === 'dvAssign'
  });

  if (_devs !== undefined) {

    deviations = _devs.map((dev) => <DeviationRow key={dev.dvNo} deviation={dev}
      getDeviation={props.getDeviation} detailView={props.detailView}
    />);
  }

  return (
      <div>
        <div className="panel panel-success">
          <table className="table table-hover devtable">
            <thead className="print-table-head">
              <tr className="dpHand">
                <th className="col-sm-1" onClick={props.sortByClick.bind(null, 'dvNo')}>
                  Dev# <span className={th1Class}></span>
                </th>
                <th className="col-sm-2" onClick={props.sortByClick.bind(null, 'dvMatNo')}>
                  Item Id <span className={th2Class}></span>
                </th>
                <th className="col-sm-4" onClick={props.sortByClick.bind(null, 'dvMatName')}>
                    Item Description <span className={th3Class}></span>
                </th>
                <th className="col-sm-2" onClick={props.sortByClick.bind(null, 'dvCust')}>
                    Customer <span className={th4Class}></span>
                </th>
                <th className="col-sm-1" onClick={props.sortByClick.bind(null, 'dvLog')}>
                    Days <span className={th5Class}></span>
                </th>
                <th className="col-sm-2" onClick={props.sortByClick.bind(null, 'dvAssign')}>
                    Assigned <span className={th6Class}></span>
                </th>
              </tr>
            </thead>
          {deviations}
        </table>
      </div>
    </div>
  );
};

DeviationList.propTypes = {
  devlist: PropTypes.array,
  setMain: PropTypes.func,
  getDeviation: PropTypes.func,
  sortByClick: PropTypes.func,
  colSelected: PropTypes.string,
  detailView: PropTypes.bool
};

export default DeviationList;
