import React, { useState, useEffect } from 'react';
import './authorization.css';
import Input from '../utils/input/input';
import { useDispatch } from 'react-redux';
import { login } from '../../actions/user';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      dispatch(login(email, password));
    }
  };
  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [email, password]);

  return (
    <div className="authorization">
      <div className="authorization__header">Авторизация</div>
      <Input
        value={email}
        setValue={setEmail}
        type="text"
        placeholder="Введите email..."
      />
      <Input
        value={password}
        setValue={setPassword}
        type="password"
        placeholder="Введите пароль..."
      />
      <button
        className="authorization__btn"
        onClick={() => dispatch(login(email, password))}
        onKeyDown={handleKeyPress}
      >
        Войти
      </button>
    </div>
  );
};

export default Login;
