import { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from '../../utils';
import './style.css';

function Product({title, 
                  description, 
                  madeInTitle, 
                  madeInCode, 
                  category, 
                  edition, 
                  price, 
                  onAdd, 
                  id, 
                  countryLabel, 
                  categoryLabel,
                  editionLabel,
                  priceLabel,
                  btnTitle
                }) {
  const cn = bem('Product');
  const callbacks = {
    onAddProduct: e => onAdd(id),
  };
  
  return (
    <div className={cn()}>
      <div className={cn('description')}>{description}</div>
      <div className={cn('country')}>
        <span className={cn('country-label')}>{countryLabel}</span>
        <span className={cn('country-title')}>{madeInTitle}</span>
        <span className={cn('country-code')}>({madeInCode})</span>
      </div>
      <div className={cn('category')}>
        <span className={cn('category-label')}>{categoryLabel}</span>
        <span className={cn('category-title')}>{category}</span>
      </div>
      <div className={cn('edition')}>
        <span className={cn('edition-label')}>{editionLabel}</span>
        <span className={cn('edition-title')}>{edition}</span>
      </div>
      <div className={cn('price')}>
        <span className={cn('price-label')}>{priceLabel}</span>
        <span className={cn('price-title')}>{numberFormat(price)} ₽</span>
      </div>
      <button onClick={callbacks.onAddProduct}>{btnTitle}</button>
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
