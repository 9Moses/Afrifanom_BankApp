import React from "react";
import SignOutToast from "../notification/alert";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const history = useNavigate();
  const handleSignOut = () => {
    localStorage.removeItem("username"); // Clear the authentication token from local storage

    // Redirect to the login page or another appropriate page
    history("/");

    // Show a toast message to confirm sign-out (optional)
    toast.dismiss(); // Close the toast
    toast.success("You have been signed out.", { autoClose: 2000 }); // Show a success message
  };

  const showSignOutToast = () => {
    toast(<SignOutToast onClose={toast.dismiss} onSignOut={handleSignOut} />, {
      autoClose: false,
    });
  };
  return (
    <header className="flex justify-between items-center bg-white py-5 px-20 shadow-md">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold">Back Teller Application</h1>
      </div>
      <div className="flex items-center">
        <span className="mx-2 border border-gray-300 h-10 inline-block"></span>
        <button
          onClick={showSignOutToast}
          className="border border-blue-500 text-blue-500 px-4 py-2 rounded-md hover:bg-yellow-400 hover:text-white"
        >
          Sign Out
        </button>
      </div>
    </header>
  );
};

export default Header;
