import React, { useState, useEffect } from "react";
import axios from "axios";

const baseURL = "http://localhost:5000";

const api = axios.create({
  baseURL,
});

const AccountList = () => {
  const [accountData, setAccountData] = useState([]);

  const fetchAccountData = async () => {
    try {
      const response = await api.get("/auth/account_data");
      setAccountData(response.data);
    } catch (error) {
      console.error("Error fetching account data:", error);
    }
  };

  useEffect(() => {
    // Fetch account data from the server when the component mounts
    fetchAccountData();

    // Set up an interval to fetch data every 60 seconds
    const interval = setInterval(() => {
      fetchAccountData();
    }, 60000);

    // Clean up the interval when the component is unmounted or no longer needed
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-between items-center bg-white py-5 px-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {accountData.map((account) => (
          <div key={account.id} className="bg-white shadow-md p-4 rounded-lg">
            <h2 className="text-xl font-semibold">{account.account_name}</h2>
            <p>Account Number: {account.account_number}</p>
            <p>Account Balance: ${account.account_balance}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccountList;
