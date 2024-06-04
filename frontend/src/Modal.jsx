import React, { useEffect } from 'react';
import './Modal.css';

function Modal({ isOpen, onClose, children }) {
    useEffect(() => {
      const handleKeyDown = (event) => {
        if (event.key === 'Escape') {
          onClose();
        }
      };
  
      document.addEventListener('keydown', handleKeyDown);
  
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }, [onClose]);
  
    if (!isOpen) return null;
  
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <button className="modal-close" onClick={onClose}>&times;</button>
          {children}
        </div>
      </div>
    );
  }
  
  export default Modal;