import React from "react";
import { toast } from "react-toastify";

const SignOutToast = ({ onClose, onSignOut }) => (
  <div>
    <div>Are you sure you want to sign out?</div>
    <div className="p-4">
      <button
        className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        onClick={() => {
          onSignOut();
          toast.dismiss();
        }}
      >
        Sign Out
      </button>
      <button
        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        onClick={() => {
          onClose();
          toast.dismiss();
        }}
      >
        Cancel
      </button>
    </div>
  </div>
);

export default SignOutToast;
