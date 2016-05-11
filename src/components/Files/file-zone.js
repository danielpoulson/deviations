import React, { PropTypes } from 'react';
import Dropzone from 'react-dropzone';
import toastr from 'toastr';
import Request from 'superagent';

class FileZone extends React.Component {
  // TODO: MED 2 Change function of the filezone drop function to multiply files
  onDrop = (files) => {
    const dvNo = this.props.dvNo;
    const addFile = this.props.addFile;
    const req = Request.post('/server/upload');

    files.forEach((file) => {

      const myRe = /C{2}\d{6}\s[-]\s/;
      const _fileName = file.name;
      let _newFileName = '';
      const myArray = myRe.exec(_fileName);

      if (myArray) {
        _newFileName = _fileName;
      } else {
        _newFileName = `${dvNo} - ${file.name}`;
      }

      req.field('dvNo', dvNo);
      req.field('dpUser', this.props.user.username);
      req.field('docName', file.name);
      req.attach(_newFileName, file, file.name);
    });

    req.end((err, res) => addFile(res.body));

    toastr.success('File has been uploaded', 'File Upload', { timeOut: 1000 });
  };

  render() {

    return (
        <div className="margin-20-top">
          <Dropzone className="drop-zone" multiple={false} onDrop={this.onDrop}>
            <div>File Drop or click to select single file (upload).</div>
          </Dropzone>
        </div>
    );
  }
}

FileZone.propTypes = {
  dvNo: PropTypes.string,
  addFile: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,

};

export default FileZone;
