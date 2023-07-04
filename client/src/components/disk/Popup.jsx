import React, { useState, useEffect } from 'react';
import Input from '../utils/input/input';
import { useDispatch, useSelector } from 'react-redux';
import { setPopupDisplay } from '../../reducers/fileReducer';
import { createDir } from '../../actions/file';

const Popup = () => {
  const [dirName, setDirName] = useState('');
  const popupDisplay = useSelector((state) => state.files.popupDisplay);
  const currentDir = useSelector((state) => state.files.currentDir);
  const dispatch = useDispatch();

  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      dispatch(createDir(currentDir, dirName));
      dispatch(setPopupDisplay('none'));
      setDirName('');
    }
  }

  useEffect(
    function () {
      document.addEventListener('keydown', handleKeyPress);
      return () => {
        document.removeEventListener('keydown', handleKeyPress);
      };
    },
    [dirName]
  );

  function createHandler() {
    dispatch(createDir(currentDir, dirName));
    dispatch(setPopupDisplay('none'));
    setDirName('');
  }

  function resetInput() {
    dispatch(setPopupDisplay('none'));
    setDirName('');
  }

  return (
    <div
      className="popup"
      onClick={() => resetInput()}
      style={{ display: popupDisplay }}
    >
      <div
        className="popup__content"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="popup__header">
          <div className="popup__title">Создать новую папку</div>
          <button className="popup__close hover" onClick={() => resetInput()}>
            X
          </button>
        </div>
        <Input
          type="text"
          placeholder="Введите название папки..."
          value={dirName}
          setValue={setDirName}
        />
        <button className="popup__create hover" onClick={() => createHandler()}>
          Создать
        </button>
      </div>
    </div>
  );
};

export default Popup;
