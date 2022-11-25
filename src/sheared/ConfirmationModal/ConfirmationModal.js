import React from 'react';

const ConfirmationModal = ({title, message,clooseModal,handleDeleteProduct,modalData}) => {
    return (
        <div>
            <input type="checkbox" id="confirmation-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{title}</h3>
                    <p className="py-4">{message}</p>
                    <div className="modal-action">
                        <label onClick={clooseModal} htmlFor="confirmation-modal" className="btn">cancel</label>
                        <label onClick={() => handleDeleteProduct(modalData)} htmlFor="confirmation-modal" className="btn">Delete</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;