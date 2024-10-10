import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function RequestLogin(props) {
  const {
    onLogin = () => {},
    onCancel = () => {},
    labelLogin = 'Войдите',
    labelCancel = 'Отмена',
    requestText = ', чтобы иметь возможность ответить. ',
    showCancel = true
  } = props;
  const cn = bem('RequestLogin');

  return (
    <div className={cn()}>
      <button className={cn('LoginBtn')} onClick={onLogin}>{labelLogin}</button>
      <span>{requestText}</span>
      {showCancel && <button className={cn('CancelBtn')} onClick={ () => onCancel(null) }>{labelCancel}</button>}
    </div>
  );
}

RequestLogin.propTypes = {
  labelLogin: PropTypes.string,
  labelCancel: PropTypes.string,
  requestText: PropTypes.string,
  onLogin: PropTypes.func,
  onCancel: PropTypes.func,
};

export default memo(RequestLogin);
