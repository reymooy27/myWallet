/* eslint-disable prettier/prettier */
import {
  enablePromise,
  openDatabase,
  SQLiteDatabase,
} from 'react-native-sqlite-storage';

enablePromise(true);

export const getDBConnection = async () => {
  return openDatabase({name: 'app.db', location: 'default'});
};

export const createTable = async db => {
  // create table if not exists
  const query = 'CREATE TABLE IF NOT EXISTS data (trxid INTEGER PRIMARY KEY AUTOINCREMENT, amount INTEGER, title TEXT NOT NULL, type TEXT NOT NULL, timestamp TEXT NOT NULL);';
  await db.executeSql(query);
};

export const getTransactions = async (db) => {
  try {
    const transactions = [];
    const results = await db.executeSql('SELECT * FROM data');
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        transactions.push(result.rows.item(index));
      }
    });
    return transactions;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get transactions !!!');
  }
};

export const addTransaction = async (db, trx)=>{
  try {
    const query = 'INSERT INTO data (amount, title, type, timestamp) values (?, ?, ?, ?)';
    await db.executeSql(query,[trx.amount,trx.title,trx.type,trx.timestamp]);
  } catch (error) {
    console.log(error);
  }
};

export const deleteTransaction = async (db,rowid)=>{
  try {
    const query = 'DELETE FROM data WHERE trxid = ?;';
    await db.executeSql(query,[rowid]);
  } catch (error) {
    console.log(error);
  }
};

// delete soon
export const dropTable = async (db)=>{
  try {
    await db.executeSql('DROP TABLE initial_money');
  } catch (error) {
    console.log(error);

  }
};

export const createTableInitialMoney = async db => {
try {
  const query = 'CREATE TABLE IF NOT EXISTS initial_money (amount INTEGER);';
  await db.executeSql(query);
} catch (error) {
  console.log(error);
}
};

export const getInitialMoney = async db =>{
  try {
    const transactions = [];
    const results = await db.executeSql('SELECT *, rowid FROM initial_money');
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        transactions.push(result.rows.item(index));
      }
    });
    return transactions;
  } catch (error) {
    console.log(error);
  }
};

export const updateInitialMoney = async (db, amount) =>{
  try {
    const query = 'UPDATE initial_money SET amount = ? WHERE rowid = 1';
    await db.executeSql(query,[amount]);
  } catch (error) {
    console.log(error);

  }

};
