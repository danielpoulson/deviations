import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import FileTable from 'components/Files/file-table';
import FileZone from 'components/Files/file-zone';

/* actions */
import { getFiles, addFile, bookoutFile, deleteFile, removeFile } from 'actions/actions_files';
import { setFiletabCount } from 'actions/actions_main';
import { createLog } from 'actions/actions_changes';

class FileList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onAddFile = this.onAddFile.bind(this);
    this.onCreateLog = this.onCreateLog.bind(this);
    this.onBookoutFile = this.onBookoutFile.bind(this);
    this.onDeleteFile = this.onDeleteFile.bind(this);
    this.onRemoveFile = this.onRemoveFile.bind(this);
  }

  componentWillMount() {
    if (this.props.sourceId) {
      this.props.getFiles(this.props.sourceId);
    }
  }

  componentDidUpdate() {
    this.props.setFiletabCount(this.props.files.length);
  }

  onAddFile(file) {
    this.props.addFile(file);
  }

  onCreateLog(log) {
    this.props.createLog(log);
  }

  onDeleteFile(id) {
    this.props.deleteFile(id);
  }

  onRemoveFile(id) {
    this.props.removeFile(id);
  }

  onBookoutFile(id) {
    this.props.bookoutFile(id);
  }

  render() {
    var tableStyle = {
      marginTop: 20,
      marginLeft: 10
    };

    return (
      <div className={this.props.filesTab}>
        <div className="row">
          <div style={tableStyle} className="col-sm-10">
            <FileTable
              files={this.props.files}
              user={this.props.user}
              export={this.props.export}
              createLog={this.onCreateLog}
              deleteFile={this.onDeleteFile}
              removeFile={this.onRemoveFile}
              bookoutFile={this.onBookoutFile} />
          </div>
          <div className={this.props.export}>
            <div className="col-sm-1">
              <FileZone
                addFile={this.onAddFile}
                user={this.props.user}
                sourceId={this.props.sourceId} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

FileList.propTypes = {
  addFile: PropTypes.func,
  bookoutFile: PropTypes.func,
  createLog: PropTypes.func,
  deleteFile: PropTypes.func,
  export: PropTypes.string,
  files: PropTypes.array,
  filesTab: PropTypes.string,
  getFiles: PropTypes.func,
  removeFile: PropTypes.func,
  setFiletabCount: PropTypes.func,
  sourceId: PropTypes.string,
  user: PropTypes.object,
};

export default connect(state => ({ files: state.files, user: state.main.user }),
  {
    getFiles,
    addFile,
    bookoutFile,
    deleteFile,
    removeFile,
    setFiletabCount,
    createLog
  })(FileList);
