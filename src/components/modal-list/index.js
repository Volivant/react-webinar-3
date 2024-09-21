import React from "react";
import PropTypes from 'prop-types';
import './style.css';

function ModalList({ isVisible = false, children}) {
  return !isVisible ? null : (
    <div className="modal">
      <div className="modal-dialog">
        {children}
      </div>
    </div>
  )
};

ModalList.propTypes = {
  isVisible: PropTypes.bool,
  children: PropTypes.node,
};

export default React.memo(ModalList);
