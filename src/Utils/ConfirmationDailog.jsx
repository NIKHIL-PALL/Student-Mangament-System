

import React from 'react';

const ConfirmationDialog = ({ onConfirm, onCancel }) => {
  // <div className="confirmation-dialog">
  //   <p>Do you want to delete?</p>
  //   <button onClick={onConfirm}>Yes</button>
  //   <button onClick={onCancel}>No</button>
  // </div>
  return (
    <React.Fragment>
    <div className="modal show d-block" tabIndex="-1" role="dialog">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header justify-content-between">
          <h5 className="modal-title">Confirm Delete</h5>
          <button type="button" className="close" aria-label="Close" onClick={onCancel}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <p>Do you want to delete this item?</p>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={onCancel}>No</button>
          <button type="button" className="btn btn-danger" onClick={onConfirm}>Yes</button>
        </div>
      </div>
    </div>
  </div>
  </React.Fragment>
  );
};

export default ConfirmationDialog;
