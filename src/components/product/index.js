import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from '../../utils';
import './style.css';

function Product({title, description, madeInTitle, madeInCode, category, edition, price}) {
  const cn = bem('Product');
  // console.log(description);
  return (
    <div className={cn()}>
      <div className={cn('description')}>{description}</div>
      <div className={cn('country')}>
        <span className={cn('country-label')}>Страна производитель:</span>
        <span className={cn('country-title')}>{madeInTitle}</span>
        <span className={cn('country-code')}>({madeInCode})</span>
      </div>
      <div className={cn('category')}>
        <span className={cn('category-label')}>Категория:</span>
        <span className={cn('category-title')}>{category}</span>
      </div>
      <div className={cn('edition')}>
        <span className={cn('edition-label')}>Год выпуска:</span>
        <span className={cn('edition-title')}>{edition}</span>
      </div>
      <div className={cn('price')}>
        <span className={cn('price-label')}>Цена:</span>
        <span className={cn('price-title')}>{numberFormat(price)} ₽</span>
      </div>
      <button>Добавить</button>
    </div>
  );
}

Product.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  madeInTitle: PropTypes.string,
  madeInCode: PropTypes.string,
  edition: PropTypes.number,
  price: PropTypes.number,
};

export default memo(Product);
