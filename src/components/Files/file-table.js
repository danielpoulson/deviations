import React, { PropTypes } from 'react';
import FileRow from './file-row';

const FileTable = (props) => {

  const _files = props.files;
  const hidden = props.export;
  let files = [];

  if (Object.keys(_files).length > 0) {
    files = _files.map((file) => <FileRow key={file._id} file={file}
      user={props.user}
      export={hidden}
      createLog={props.createLog}
      deleteFile={props.deleteFile}
      removeFile={props.removeFile}
      bookoutFile={props.bookoutFile} />);
  }

  return (
		<div className="panel panel-success">
			<table className="table table-hover project-table dp_point">
				<thead>
					<tr className="print-table-head">
						<th>Type</th>
						<th>File Name</th>
						<th>User</th>
						<th>Date</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody className="panel-body">{files}</tbody>
			</table>
		</div>

	);
};

FileTable.propTypes = {
  user: PropTypes.object,
  export: PropTypes.string,
  files: PropTypes.array.isRequired,
  createLog: PropTypes.func.isRequired,
  deleteFile: PropTypes.func.isRequired,
  removeFile: PropTypes.func.isRequired,
  bookoutFile: PropTypes.func.isRequired
};

export default FileTable;
