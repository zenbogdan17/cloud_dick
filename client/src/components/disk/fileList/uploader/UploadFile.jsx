import { useDispatch } from 'react-redux';
import './uploader.css';
import { removeUploadFile } from '../../../../reducers/uploadReducer';

const UploadFile = ({ file }) => {
  const dispatch = useDispatch();
  return (
    <div className="upload-file">
      <div className="upload-file__header">
        <div className="uploader-file__name">
          {file.name.length > 25 ? file.name.slice(0, 25) + '...' : file.name}
        </div>

        <button
          className="upload-file__remove"
          onClick={() => dispatch(removeUploadFile(file.id))}
        >
          X
        </button>
      </div>
      <div className="upload-file__progress-bar">
        <div
          className="upload-file__upload-bar"
          style={{ width: file.progress + '%' }}
        ></div>
        <div className="upload-file__percent ">{file.progress}%</div>
      </div>
    </div>
  );
};

export default UploadFile;
