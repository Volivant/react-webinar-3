import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from '../../utils';
import './style.css';

function ProfileCard({ user, t }) {
  const cn = bem('ProfileCard');
  return (
    <div className={cn()}>
      <div className={cn('title')}>Профиль</div>
      <div className={cn('prop')}>
        <div className={cn('label')}>Имя:</div>
        <div className={cn('value')}>{user.username}</div>
      </div>
      <div className={cn('prop')}>
        <div className={cn('label')}>Телефон:</div>
        <div className={cn('value')}>{user.profile?.phone}</div>
      </div>
      <div className={cn('prop')}>
        <div className={cn('label')}>email:</div>
        <div className={cn('value')}>{user.email}</div>
      </div>
    </div>
  );
}

ProfileCard.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
  t: PropTypes.func,
};

ProfileCard.defaultProps = {
  t: text => text,
};

export default memo(ProfileCard);
