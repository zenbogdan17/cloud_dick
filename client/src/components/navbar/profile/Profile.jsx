import { useDispatch, useSelector } from 'react-redux';
import {
  deleteAvatar,
  installNickname,
  uploadAvatar,
} from '../../../actions/user';
import './profile.css';
import avatarLogo from '../../assets/img/avatar.svg';
import { API_URL } from '../../../config';
import { useState, useEffect } from 'react';

const Profile = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const avatar = currentUser.avatar
    ? `${API_URL + currentUser.avatar}`
    : avatarLogo;
  const [nickNameInput, setNicknameInput] = useState('');

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      dispatch(installNickname(nickNameInput));
      setNicknameInput('');
    }
  };
  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [nickNameInput]);

  function changeHandler(e) {
    dispatch(uploadAvatar(e.target.files[0]));
  }

  function nicknameHandler() {
    dispatch(installNickname(nickNameInput));
    setNicknameInput('');
  }

  return (
    <div className="profile">
      <div className="profile__column">
        <img className="profile__avatar" src={avatar} alt="avatar" />

        <label className="profile__label">
          {currentUser.nickname !== ' '
            ? currentUser.nickname
            : `You don't have a nickname`}
        </label>
        <div>
          {currentUser.nickname === ' ' ? (
            <>
              <input
                className="profile__input__nickname"
                placeholder="Enter nickname"
                value={nickNameInput}
                onChange={(e) => setNicknameInput(e.target.value)}
              />
              <button
                onClick={nicknameHandler}
                onKeyDown={handleKeyPress}
                className="profile__btn hover"
              >
                Apply
              </button>
            </>
          ) : (
            <button
              onClick={() => dispatch(installNickname(' '))}
              className="profile__btn hover"
            >
              Change nickname
            </button>
          )}
        </div>
      </div>
      <div className="profile__column">
        <label className="profile__label">Upload profile avatar</label>
        <input
          className="profile__input__avatar"
          accept="image/*"
          onChange={(e) => changeHandler(e)}
          type="file"
          placeholder="Загрузіть ататар"
        ></input>
        <label className="profile__label">Delete your avatar</label>
        <button
          className="profile__btn hover"
          onClick={() => dispatch(deleteAvatar())}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Profile;
