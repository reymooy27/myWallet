/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import { useAppContext } from '../context';
import {deleteTransaction, getDBConnection} from '../database';
import colors from '../lib/colors';

const TransactionDetail = ({type, title, timestamp, amount, id}) => {

  const {transaction, setTransaction} = useAppContext()
  
  const handleDeleteTransaction = async () => {
    const db = await getDBConnection();
    await deleteTransaction(db,id);
    const filteredArray = transaction.filter(trx=> trx.trxid !== id)
    setTransaction(filteredArray)
  };

  return (
    <TouchableOpacity activeOpacity={0.7}>
      <View
        style={{
          width: '100%',
          height: 90,
          backgroundColor: '#fff',
          borderRadius: 15,
          padding: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 10,
          paddingHorizontal: 20,
        }}>
        <View style={{justifyContent: 'center'}}>
          <Text
            style={{
              color: colors.primary,
              fontWeight: 'bold',
              fontSize: 16,
              fontFamily: 'OpenSans-Bold',
              marginBottom: 5,
            }}>
            {title}
          </Text>
          <Text
            style={{
              color: colors.primary,
              fontFamily: 'OpenSans-Regular',
              fontSize: 12,
            }}>
            {new Date(timestamp).toLocaleString()}
          </Text>
        </View>
        <View style={{justifyContent: 'center'}}>
          <Text
            style={{
              fontFamily: 'OpenSans-Bold',
              color: type !== 'CASH_IN' ? 'red' : 'green',
            }}>
            {type !== 'CASH_IN' ? `- Rp.${amount}` : `+Rp.${amount}`}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TransactionDetail;
