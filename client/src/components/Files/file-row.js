//SYNC 11/03/2017 DP
import React, { PropTypes } from 'react';
import moment from 'moment';
import { getExt } from '../../utils/status';
import DownloadButton from '../../components/Common/download-button';
import BookoutButton from '../../components/Common/bookout-button';


const FileRow = (props) => {

  const file = props.file;
  const fullFileName = `${file.fsSource} - ${file.fsFileName}.${file.fsFileExt}`;

  return (
    <tr>
      <td><i className={getExt(file.fsFileExt)}></i></td>
      <td>{file.fsFileName}</td>
      <td>{file.fsAddedBy}</td>
      <td>{moment(new Date(file.fsAddedAt)).format('DD/MM/YYYY')}</td>
      <td>
        <DownloadButton
          removeFile={props.removeFile}
          fileLoad={fullFileName}
          fileId={file._id}
          export={props.export} />
        </td>
        <td className={props.export}>
          <BookoutButton
            user={props.user}
            fileLoad={fullFileName}
            source={file.fsSource}
            fileId={file._id}
            fsBooked={file.fsBooked}
            createLog={props.createLog}
            deleteFile={props.deleteFile}
            bookoutFile={props.bookoutFile} />
        </td>
    </tr>
  );
};

FileRow.propTypes = {
  file: PropTypes.object,
  removeFile: PropTypes.func.isRequired,
  export: PropTypes.string,
  user: PropTypes.object.isRequired,
  createLog: PropTypes.func.isRequired,
  deleteFile: PropTypes.func.isRequired,
  bookoutFile: PropTypes.func.isRequired
};

export default FileRow;
