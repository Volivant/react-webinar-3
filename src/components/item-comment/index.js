import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import dateTimeFormat from '../../utils/date-time-format';
import './style.css';

function ItemComment(props) {
  const { onAnswer = () => {}, labelAnswer = 'Ответить' } = props;
  const cn = bem('ItemComment');
  const children = props.item.children;
  const showAnswer = props.currentComment === props.item._id ? true : false;

  return (
    <div className={cn()}>
      <div className={cn('single')}>
        <div className={cn('head')}>
          <div className={cn('user')}>{props.item.author.profile.name}</div>
          <div className={cn('date')}>
            {dateTimeFormat(new Date(props.item.dateCreate), "ru", {dateStyle: "long", timeStyle: "short"})}
          </div>
        </div>
        <div className={cn('text')}>{props.item.text}</div>
        <button className={cn('btn')} onClick={() => onAnswer(props.item._id, props.item.author.profile.name)}>{labelAnswer}</button>
        {showAnswer && props.inputComment}
      </div>

      {/* рекурсивно вызываем себя же */}
      {
        children && children.map((i, n) =>
          <ItemComment
            item={i}
            key={n}
            currentComment={props.currentComment}
            inputComment = {props.inputComment}
            onAnswer={onAnswer}
          />)
      }

    </div>
  );
}

ItemComment.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
  onAnswer: PropTypes.func,
  labelAnswer: PropTypes.string,
};

export default memo(ItemComment);
