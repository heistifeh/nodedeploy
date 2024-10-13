import React from 'react';
import './Modal.css'; // Make sure to create a corresponding CSS file for styles

const Modal = ({ closeModal }) => {
    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <button className="close-button" onClick={closeModal}>&times;</button>
                <h2>Verification Success!</h2>
                <p>This is a simple modal. You can place any content here, such as text, forms, or images.</p>
                <button className="modal-button" onClick={closeModal}>Close</button>
            </div>
        </div>
    );
};

export default Modal;
