import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from '../../utils';
import Navigation from '../navigation';
import './style.css';

function BasketTool({ sum, amount, onOpen, btnGoto, title, inBasket, empty }) {
  const cn = bem('BasketTool');
  return (
    <div className={cn()}>
      <Navigation titleHome={title}/>
      <span className={cn('label')}>{inBasket}</span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, {
              one: 'товар',
              few: 'товара',
              many: 'товаров',
            })} / ${numberFormat(sum)} ₽`
          : empty}
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
