import React from 'react';
import './file.css';
import dirLogo from '../../../assets/img/dir.svg';
import fileLogo from '../../../assets/img/file.svg';
import { useDispatch, useSelector } from 'react-redux';
import { pushToStack, setCurrentDir } from '../../../../reducers/fileReducer';
import { deleteFile, downloadFile } from '../../../../actions/file';

const File = ({ file }) => {
  const dispatch = useDispatch();

  const currentDir = useSelector((state) => state.files.currentDir);
  const fileView = useSelector((state) => state.files.view);

  if (file.type === 'dir') {
    console.log(file);
  }
  function formatFileSize(size) {
    if (size < 1024) {
      return `${size} bytes`;
    } else if (size < 1024 * 1024) {
      return `${(size / 1024).toFixed(2)} KB`;
    } else if (size < 1024 * 1024 * 1024) {
      return `${(size / (1024 * 1024)).toFixed(2)} MB`;
    } else {
      return `${(size / (1024 * 1024 * 1024)).toFixed(2)} GB`;
    }
  }
  function openDirHandler(file) {
    if (file.type === 'dir') {
      dispatch(pushToStack(currentDir));
      dispatch(setCurrentDir(file._id));
    }
  }

  function downloadClickHandler(e) {
    e.stopPropagation();
    downloadFile(file);
  }

  function deleteClickHandler(e) {
    e.stopPropagation();
    dispatch(deleteFile(file));
  }

  if (fileView === 'plate') {
    return (
      <div className="file-plate" onClick={() => openDirHandler(file)}>
        <img
          src={file.type === 'dir' ? dirLogo : fileLogo}
          alt=""
          className="file-plate__img"
        />
        <div className="file-plate__name">
          {file.name.length > 15 ? file.name.slice(0, 15) + '...' : file.name}
        </div>
        <div className="file-plate__btns">
          {file.type !== 'dir' && (
            <button
              onClick={(e) => downloadClickHandler(e)}
              className="file-plate__btn file-plate__download"
            >
              download
            </button>
          )}
          <button
            onClick={(e) => deleteClickHandler(e)}
            className="file-plate__btn file-plate__delete"
          >
            delete
          </button>
        </div>
      </div>
    );
  }

  if (fileView === 'list') {
    return (
      <div className="file" onClick={() => openDirHandler(file)}>
        <img
          src={file.type === 'dir' ? dirLogo : fileLogo}
          alt=""
          className="file__img"
        />
        <div className="file__name">{file.name}</div>
        <div className="file__date">{file.date.slice(0, 10)}</div>
        <div className="file__size">{formatFileSize(file.size)}</div>
        {file.type !== 'dir' && (
          <button
            onClick={(e) => downloadClickHandler(e)}
            className="file__btn file__download"
          >
            download
          </button>
        )}
        <button
          onClick={(e) => deleteClickHandler(e)}
          className="file__btn file__delete"
        >
          delete
        </button>
      </div>
    );
  }
};

export default File;
