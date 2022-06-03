/* eslint-disable prettier/prettier */
import React, {createContext, useContext,useCallback, useState, useEffect} from 'react';
import { createTable, createTableInitialMoney, getDBConnection, getInitialMoney, getTransactions, updateInitialMoney } from './database';

const AppContext = createContext();

const ContextWraper = ({children}) => {
  const [transaction, setTransaction] = useState([]);
  const [balance, setBalance] = useState(0);

  const [update, setUpdate] = useState(false);

  const loadDataCallback = useCallback(async () => {
    try {
      const db = await getDBConnection()
      await createTable(db)
      await createTableInitialMoney(db)
      const savedTransaction = await getTransactions(db)
      const im = await getInitialMoney(db)
      setBalance(im[0]?.amount)
      setTransaction(savedTransaction)
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    loadDataCallback();

    return ()=> setUpdate(false)
  }, [loadDataCallback, update]);

  const _updateBalance = async (amount,type) => {
    const db = await getDBConnection();
    if (type === 'CASH_IN'){
      setBalance(prev => prev + parseInt(amount,10));
      let res = balance + parseInt(amount,10)
      await updateInitialMoney(db, res);
    }else {
      setBalance(prev => prev - parseInt(amount,10));
      let res = balance - parseInt(amount,10)
      await updateInitialMoney(db, res);
    }
  };


  return (
    <AppContext.Provider
      value={{transaction, setTransaction, balance, setBalance, _updateBalance,update, setUpdate}}>
      {children}
    </AppContext.Provider>
  );
};

export function useAppContext() {
  return useContext(AppContext);
}

export default ContextWraper;
