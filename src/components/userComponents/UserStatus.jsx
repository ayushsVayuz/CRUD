import React, { useState } from "react";

const UserStatus = ({ id, status, updateStatus }) => {

  const [loading, setLoading] = useState(false);

  /**
   * Handles the status toggle change.
   * Updates the user's status and shows a loading spinner.
   * 
   * @param {Event} event - The change event from the checkbox.
   */
  const handleChange = async (event) => {
    const newStatus = event.target.checked;
    setLoading(true);

    try {
      await updateStatus({ id, newStatus });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      {loading ? (
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="w-5 h-5 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <input
          type="checkbox"
          className="cursor-pointer accent-blue-600 w-5 h-5"
          onChange={handleChange}
          checked={status}
        />
      )}
    </div>
  );
};

export default UserStatus;