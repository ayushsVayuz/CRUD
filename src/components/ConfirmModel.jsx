import React from "react";

const ConfirmModal = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null; 

  return (
    <div className="fixed inset-0 flex items-center justify-center  "> 
      <div className="bg-white p-6 rounded-lg shadow-2xl text-center ">
        <h2 className="text-lg font-semibold">{message}</h2>
        <div className="mt-4 flex justify-center gap-4">
          <button 
            onClick={onConfirm} 
            className="px-4 py-2 bg-green-800 text-white rounded-lg hover:bg-green-900 transition duration-300"
          >
            Yes, Delete
          </button>
          <button 
            onClick={onClose} 
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-800 transition duration-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;