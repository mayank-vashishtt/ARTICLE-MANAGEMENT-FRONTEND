import React from 'react';
import './Modal.css';  // Styling for the modal

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          &times; {/* Close button */}
        </button>
        {children} {/* Render any passed content inside the modal */}
      </div>
    </div>
  );
}

export default Modal;