import React, { useState, useEffect } from 'react';
import './authorization.css';
import Input from '../utils/input/input';
import { registration } from '../../actions/user';

const Registration = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      registration(email, password);
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
      <div className="authorization__header">Регистрация</div>
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
        onClick={() => registration(email, password)}
        onKeyDown={handleKeyPress}
      >
        Зарегистрироваться
      </button>
    </div>
  );
};

export default Registration;
