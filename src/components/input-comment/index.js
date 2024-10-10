import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function InputComment(
  {
    title = 'Новый ответ',
    onSend = () => {},
    onCancel = () => {},
    labelSend='Отправить',
    labelCancel='Отмена',
    defaultText = '',
    id,
    token,
    type = "comment",
    showCancel = true,
  }) {

  const cn = bem('InputComment');
  const [text, setText] = useState('')
  const textChange = (value) => {
    setText(value)
  }

  return (
    <div className={cn()}>
      <label className={cn('label')}>{title}</label>
      <textarea
        className={cn('text')}
        defaultValue={defaultText}
        onChange={(e) => textChange(e.target.value)}
      />
      <div className={cn('btn-group')}>
        <button className={cn('btn')} onClick={() => onSend(id, token, type, text)}>{labelSend}</button>
        {showCancel && <button className={cn('btn')} onClick={() => onCancel(null)}>{labelCancel}</button>}
      </div>
    </div>
  );
}

InputComment.propTypes = {
  title: PropTypes.string,
  onSend: PropTypes.func,
  onCancel: PropTypes.func,
  labelSend: PropTypes.string,
  labelCancel: PropTypes.string,
  defaultText: PropTypes.string,
  id: PropTypes.node,
  token: PropTypes.node,
  type: PropTypes.string,
  showCancel: PropTypes.bool,
};

export default memo(InputComment);
