import React from 'react';
import toastr from 'toastr';


export default class DownloadButton extends React.Component {

  onDownload = () => {

    if (window.ActiveXObject || 'ActiveXObject' in window) {
      // Always true if browser is Internet Explorer
      toastr.error('This function does not work with internet explorer. Please contact your administrator', 'Error - Internet Explorer', { timeOut: 5000 });
    } else {

      window.location.href = `/server/upload/${this.props.fileLoad}`;

      if (this.props.export === 'hidden') {
        this.props.removeFile(this.props.fileId);
      }
    }
  };

  render() {
    return (
      <button type="button" className="btn btn-info btn-xs" onClick={this.onDownload}>
        <span className="glyphicon glyphicon-circle-arrow-down"></span>
        Download
      </button>
    );
  }
}

DownloadButton.propTypes = {
  fileLoad: React.PropTypes.any,
  export: React.PropTypes.string,
  removeFile: React.PropTypes.func,
  fileId: React.PropTypes.string,
};
