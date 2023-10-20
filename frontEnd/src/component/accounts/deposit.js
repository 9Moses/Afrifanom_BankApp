import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const baseURL = "http://localhost:5000";

const api = axios.create({
  baseURL,
});

const DepositForm = () => {
  const [accountName, setAccountName] = useState("");
  const [amount, setAmount] = useState("");

  const handleDeposit = async (e) => {
    e.preventDefault();
    if (accountName === "" || amount === "") {
      toast.error("Input Field Required.", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000,
        hideProgressBar: true,
      });
      return;
    }

    try {
      const response = await api.post("/auth/deposit", {
        account_name: accountName,
        account_balance: parseInt(amount),
      });
      toast.success("Deposit successful", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000,
        hideProgressBar: true,
      });
      setAccountName("");
      setAmount("");
      console.log(response.data.message);
    } catch (error) {
      console.error("Error depositing amount:", error);
    }
  };

  return (
    <div className="flex justify-between items-center py-5 px-20">
      <form className="grid gap-6 mb-6 md:grid-cols-3 p-6 bg-white shadow-md rounded-md">
        <div className="mb-4">
          <label htmlFor="accountName" className="block font-medium mb-1">
            Account Name
          </label>
          <input
            type="text"
            id="accountName"
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="amount" className="block font-medium mb-1">
            Amount
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          onClick={handleDeposit}
          className="w-full bg-blue-500 text-white font-medium py-2 rounded hover:bg-blue-600"
        >
          Deposit
        </button>
      </form>
    </div>
  );
};

export default DepositForm;
