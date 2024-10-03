import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function ProfileTool({ action, onLogin, onLogout, t }) {
  const cn = bem('ProfileTool');

  return (
    <div className={cn()}>
      <button onClick={action == 'login' ? onLogin : onLogout}>
        {t(action == 'login' ? 'profile.login' : 'profile.logout')}
      </button>
    </div>
  );
}

ProfileTool.propTypes = {
  onLogin: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
  t: PropTypes.func,
};

ProfileTool.defaultProps = {
  action: 'login',
  onLogin: () => {},
  onLogout: () => {},
  t: text => text,
};

export default memo(ProfileTool);
