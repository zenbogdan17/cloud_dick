import React from 'react';
import './fileList.css';
import { useSelector } from 'react-redux';
import File from './file/File';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const FileList = () => {
  const files = useSelector((state) => state.files.files);
  const fileView = useSelector((state) => state.files.view);

  if (fileView === 'plate') {
    return (
      <>
        <div className="fileplate">
          {files.map((file) => (
            <File key={file._id} file={file} />
          ))}
        </div>
        {files.length === 0 ? <div className="filelist__empty">Пусто</div> : ''}
      </>
    );
  }

  if (fileView === 'list') {
    return (
      <div className="filelist">
        <div className="filelist__header">
          <div className="filelist__name">Название</div>
          <div className="filelist__date">Дата</div>
          <div className="filelist__size">Размер</div>
        </div>
        <TransitionGroup>
          {files.map((file) => (
            <CSSTransition
              key={file._id}
              timeout={500}
              classNames={'file'}
              exit={false}
            >
              <File file={file} />
            </CSSTransition>
          ))}
        </TransitionGroup>
        {files.length === 0 ? <div className="filelist__empty">Пусто</div> : ''}
      </div>
    );
  }
};

export default FileList;
