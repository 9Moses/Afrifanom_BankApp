import React from "react";
import Header from "../header/header";
import AccountList from "../accounts/details";
import DepositForm from "../accounts/deposit";
import WithdrawalForm from "../accounts/withdrawal";
import AddForm from "../accounts/add_account";

const ClientDashboard = () => {
  return (
    <div>
      <Header />
      <AccountList />
      <AddForm />
      <DepositForm />
      <WithdrawalForm />
    </div>
  );
};

export default ClientDashboard;
