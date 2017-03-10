//SYNC 11/03/2017 DP
import React, { PropTypes } from 'react';
import Dropzone from 'react-dropzone';
import toastr from 'toastr';
import Request from 'superagent';
import {fileRegex} from '../../utils/helpers';

class FileZone extends React.Component {
  constructor(props) {
    super(props);
    this.onDrop = this.onDrop.bind(this);
  }
  // TODO: (5) MED Change function of the filezone drop function to multiply files
  onDrop(files) {
    const sourceId = this.props.sourceId;
    const addFile = this.props.addFile;
    const req = Request.post('/api/files/upload');

    files.forEach((file) => {

      const myRe = fileRegex;
      const _fileName = file.name;
      let _newFileName = '';
      const myArray = myRe.exec(_fileName);

      if (myArray) {
        _newFileName = _fileName;
      } else {
        _newFileName = `${sourceId} - ${file.name}`;
      }

      req.field('sourceId', sourceId);
      req.field('dpUser', this.props.user.username);
      req.field('docName', file.name);
      req.attach(_newFileName, file, file.name);
    });

    req.end((err, res) => addFile(res.body));

    toastr.success('File has been uploaded', 'File Upload', { timeOut: 1000 });
  }

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
  sourceId: PropTypes.string,
  addFile: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired

};

export default FileZone;
