import { useStoreFinancialManager } from "@store/GlobalStore";
import { LiquidityAfterTransactions } from "@transactions/LiquidityAfterTransactions";
import { SalaryForm } from "@transactions/SalaryForm";
import { TransactionCharts } from "@transactions/TransactionCharts";
import { TransactionManagerForm } from "@transactions/TransactionManagerForm";
import { TransactionTable } from "@transactions/TransactionTable";
import { useEffect, useState } from "react";
import { Header } from "./layout/Header";

export const App = () => {
  const [salaryFormSubmitted, setSalaryFormSubmitted] = useState<boolean>(false);
  const [dataEntered, setDataEntered] = useState<boolean>(false);
  const { isDarkMode, transactions } = useStoreFinancialManager();

  const shouldShowSalaryForm = transactions.length === 0 && !salaryFormSubmitted;


  useEffect(() => {
    document.body.classList.toggle('dark-theme', isDarkMode);
    document.body.classList.toggle('light-theme', !isDarkMode);
    if (transactions.length > 0) {
      setDataEntered(true);
    }
  }, [isDarkMode, transactions]);

  const handleSalaryFormSubmit = () => {
    setSalaryFormSubmitted(true);
    handleDataEntry();
  }

  const handleDataEntry = () => {
    setDataEntered(true)
  }
  const shouldShowDataComponents = dataEntered && transactions.length > 0

  return (
    <>
      <Header />
      {shouldShowSalaryForm ? (
        <SalaryForm onSubmit={handleSalaryFormSubmit} />
      ) : (
        <>
          <TransactionManagerForm onSubmit={handleDataEntry} />
          {shouldShowDataComponents && (
            <section className="px-8">
              <LiquidityAfterTransactions />
              <TransactionTable />
              <TransactionCharts />
            </section>
          )}
        </>
      )}
    </>
  );
};