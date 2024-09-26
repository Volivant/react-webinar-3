import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { Link } from 'react-router-dom';
import { numberFormat, plural } from '../../utils';
import './style.css';

function BasketTool({ sum, amount, onOpen, btnGoto, title }) {
  const cn = bem('BasketTool');
  return (
    <div className={cn()}>
      <div className={cn('home')}>
        <Link to='/'>{title}</Link>
      </div>
      <span className={cn('label')}>В корзине:</span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, {
              one: 'товар',
              few: 'товара',
              many: 'товаров',
            })} / ${numberFormat(sum)} ₽`
          : `пусто`}
      </span>
      <button onClick={onOpen}>{btnGoto}</button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
  btnGoto: PropTypes.string,
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0,
};

export default memo(BasketTool);
