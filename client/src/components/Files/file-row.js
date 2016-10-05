import React, { PropTypes } from 'react';
import moment from 'moment';
import { getExt } from '../../utils/status';
import DownloadButton from '../../components/Common/download-button';
import BookoutButton from '../../components/Common/bookout-button';


const FileRow = (props) => {

  const file = props.file;
  const myRe = /DV\d{6}\s[-]\s/;
  const hasDVprefix = myRe.exec(file.fsFileName);
  let fullFileName = '';

  // This is adding in as older file names are prefix with the devition number
  // This prevents the deviation number to be added twice.
  if(hasDVprefix) {
      fullFileName = `${file.fsFileName}.${file.fsFileExt}`;
  } else {
      fullFileName = `${file.fsDevNo} - ${file.fsFileName}.${file.fsFileExt}`;
  }

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
            source={file.fsDevNo}
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
