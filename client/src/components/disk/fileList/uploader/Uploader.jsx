import { useDispatch, useSelector } from 'react-redux';
import './uploader.css';
import UploadFile from './UploadFile';
import {
  hideUploader,
  removeAllUploadFile,
} from '../../../../reducers/uploadReducer';

const Uploader = () => {
  const files = useSelector((state) => state.upload.files);
  const dispatch = useDispatch();
  const isVisible = useSelector((state) => state.upload.isVisible);

  if (files.length === 0) {
    dispatch(hideUploader());
  }

  function checkProgress(array) {
    return array.every((item) => item.progress === 100);
  }

  function hideUploadeHandler() {
    if (checkProgress(files)) {
      dispatch(removeAllUploadFile());
    } else {
      alert(`Files didn't load!`);
    }
    dispatch(hideUploader());
  }

  return isVisible ? (
    <div className="uploader">
      <div className="uploader__header">
        <div className="uploader__title">Загрузка</div>
        <button
          className="uploader__close"
          onClick={() => hideUploadeHandler()}
        >
          X
        </button>
      </div>
      {files.map((file) => (
        <UploadFile key={file.id} file={file} />
      ))}
    </div>
  ) : (
    ''
  );
};

export default Uploader;
