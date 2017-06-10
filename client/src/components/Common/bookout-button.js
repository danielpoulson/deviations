import PropTypes from 'prop-types';
import React from 'react';

export default class BookoutButton extends React.Component {
  constructor(props) {
    super(props);

    this.onBookout = this.onBookout.bind(this);
    this.deleteFile = this.deleteFile.bind(this);
  }

  onBookout() {
      // TODO (4) If download does not complete donot delete from server.

    const _log = {
      SourceId: this.props.source,
      LogType: 'FILE',
      LogMessage: `File booked out - ${this.props.fileLoad}`,
      LogBy: this.props.user.fullname,
      LogDate: new Date()
    };

    window.location.href = `/api/files/upload/${this.props.fileLoad}`;

    this.props.createLog(_log);
    this.props.bookoutFile(this.props.fileId, this.props.user.fullname);

  }

  deleteFile() {
    if (this.props.user.role !== 'admin') {
      return;
    }

    const _log = {
      SourceId: this.props.source,
      LogType: 'FILE',
      LogMessage: `**** File Deleted **** - ${this.props.fileLoad}`,
      LogBy: this.props.user.fullname,
      LogDate: new Date()
    };

    this.props.createLog(_log);
    this.props.deleteFile(this.props.fileId);
  }

  render() {

    let text = null;
    let action = {};
    let classButton = '';
    let classSpan = '';

    if (this.props.fsBooked > 0) {
      if (this.props.user.role === 'admin') {

        text = 'Delete';
        action = this.deleteFile;
        classButton = 'btn btn-danger btn-xs';
        classSpan = 'glyphicon glyphicon-trash';

      } else {
        text = 'Booked Out';
        classButton = 'btn btn-danger btn-xs';
        classSpan = 'fa fa-hand-paper-o';
      }

    } else {
      text = 'Book out';
      action = this.onBookout;
      classButton = 'btn btn-warning btn-xs';
      classSpan = 'glyphicon glyphicon-book';
    }
    return <button onClick={action} className={classButton}><span className={classSpan}></span> {text} </button>;
  }

}

BookoutButton.propTypes = {
  fsBooked: PropTypes.number,
  user: PropTypes.object,
  source: PropTypes.string,
  fileId: PropTypes.string,
  bookoutFile: PropTypes.func,
  fileLoad: PropTypes.string,
  createLog: PropTypes.func,
  deleteFile: PropTypes.func
};
