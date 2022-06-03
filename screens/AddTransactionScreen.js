/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useLayoutEffect, useState,useEffect} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import { useAppContext } from '../context';
import { addTransaction, getDBConnection } from '../database';
import colors from '../lib/colors';

const AddTransactionScreen = ({navigation, route}) => {

  const {transaction, setTransaction, _updateBalance, setUpdate} = useAppContext();

  const {type} = route?.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: null,
      headerTransparent: true,
      headerStyle: {
        backgroundColor: colors.background,
      },
    });
  }, [navigation]);

  const [initialState, setState] = useState({
    amount: '',
    title: '',
    type: type,
    timestamp: Date.now(),
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async ()=>{
  const db = await getDBConnection();
    if (initialState.amount !== '' && initialState.title !== ''){
      setTransaction([...transaction, initialState]);
      await addTransaction(db,
        { amount: parseInt(initialState.amount, 10),
          title: initialState.title,
          type: initialState.type,
          timestamp: initialState.timestamp,
        });
        _updateBalance(initialState.amount,initialState.type);
        setUpdate(true);
      navigation.navigate('HomeScreen');
    }
  };

  useEffect(() => {
    if (initialState.amount !== '' && initialState.title !== ''){
      setIsSubmitting(true);
    } else {
      setIsSubmitting(false);
    }
  }, [initialState]);

  return (
    <View style={{backgroundColor: colors.background, flex: 1}}>
      <View style={{marginTop: 60, marginHorizontal: 20}}>
        <Text style={{fontFamily: 'OpenSans-Bold', fontSize: 16, color: colors.primary}}>Add Transaction</Text>

        <TextInput
          placeholder="Enter amount"
          value={initialState.amount}
          keyboardType="number-pad"
          onChangeText={text => setState({...initialState, amount: text})}
          style={{
            paddingHorizontal: 20,
            borderRadius: 20,
            height: 60,
            backgroundColor: 'white',
            borderColor: 'grey',
            borderWidth: 0.5,
            marginBottom: 10,
            marginTop: 20,
          }}
        />

        <TextInput
          placeholder="Enter comment..."
          value={initialState.title}
          multiline={true}
          numberOfLines={4}
          textAlignVertical="top"
          onChangeText={text => setState({...initialState, title: text})}
          style={{
            paddingHorizontal: 20,
            borderRadius: 20,
            backgroundColor: 'white',
            borderColor: 'grey',
            borderWidth: 0.5,
            marginBottom: 10,
          }}
        />

        <TouchableOpacity
        disabled={!isSubmitting}
          style={{
            width: '100%',
            height: 50,
            backgroundColor: type !== 'CASH_IN' ? colors.red : colors.green,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 20,
            marginVertical: 10,
          }}
          onPress={handleSubmit}>
          <Text style={{color: colors.primary, fontFamily: 'OpenSans-Bold', fontSize: 16}}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddTransactionScreen;
