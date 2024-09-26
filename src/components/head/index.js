import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Head({ title, lang, onChangeLang }) {
  const callbacks = {
    onChangeLang: e => {
      e.stopPropagation();
      onChangeLang(lang);
    },
  }; 

  return (
    <div className="Head">
      <h1>{title}</h1>
      
      <button className='Head-lang' onClick={callbacks.onChangeLang}>{lang}</button>
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
  onChangeLang: PropTypes.func,
};

export default memo(Head);
