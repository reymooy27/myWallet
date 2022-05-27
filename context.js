/* eslint-disable prettier/prettier */
import React, {createContext, useContext,useCallback, useState, useEffect} from 'react';
import { createTable, createTableInitialMoney, getDBConnection, getInitialMoney, getTransactions, updateInitialMoney } from './database';

const AppContext = createContext();

const ContextWraper = ({children}) => {
  const [transaction, setTransaction] = useState([]);
  const [initialMoney, setInitialMoney] = useState(0);

  const [update, setUpdate] = useState(false);

  const loadDataCallback = useCallback(async () => {
    try {
      const db = await getDBConnection()
      await createTable(db)
      await createTableInitialMoney(db)
      const savedTransaction = await getTransactions(db)
      const im = await getInitialMoney(db)
      setInitialMoney(im[0]?.amount)
      setTransaction(savedTransaction)
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    loadDataCallback();

    return ()=> setUpdate(false)
  }, [loadDataCallback, update]);

  const _updateInitialMoney = async (amount,type) => {
    const db = await getDBConnection();
    if (type === 'CASH_IN'){
      setInitialMoney(prev => prev + parseInt(amount,10));
      let res = initialMoney + parseInt(amount,10)
      await updateInitialMoney(db, res);
    }else {
      setInitialMoney(prev => prev - parseInt(amount,10));
      let res = initialMoney - parseInt(amount,10)
      await updateInitialMoney(db, res);
    }
  };


  return (
    <AppContext.Provider
      value={{transaction, setTransaction, initialMoney, setInitialMoney, _updateInitialMoney,update, setUpdate}}>
      {children}
    </AppContext.Provider>
  );
};

export function useAppContext() {
  return useContext(AppContext);
}

export default ContextWraper;
