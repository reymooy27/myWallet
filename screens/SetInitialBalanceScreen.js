/* eslint-disable prettier/prettier */
import React, {useLayoutEffect,useState} from 'react';
import {View, Text,TouchableOpacity,TextInput} from 'react-native';
import { useAppContext } from '../context';
import { getDBConnection, updateInitialMoney } from '../database';
import colors from '../lib/colors';

const SetInitialBalanceScreen = ({navigation}) => {

  const {setBalance} = useAppContext();

  const [_balance, _setBalance] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Set Balance',
      headerTitleAlign: 'center',
      headerTransparent:true,
      headerStyle:{
        backgroundColor: colors.background,
      },
      headerTitleStyle:{
        fontSize: 16,
      },
    });
  }, [navigation]);

  const handleSubmit = async ()=>{
    if (_balance !== ''){
      setBalance(_balance )
      const db = await getDBConnection();
      const bl = parseInt(_balance,10);
      await updateInitialMoney(db, bl);
      navigation.navigate('HomeScreen')
    }
  };

  return (
    <View style={{
        flex: 1,
        height: '100%',
        width: '100%',
        backgroundColor: colors.background}}>
          <View style={{
            marginTop: 60,
            marginHorizontal: 20,
          }}>
            <TextInput
              placeholder="Enter amount"
              value={_balance}
              keyboardType="number-pad"
              onChangeText={text =>_setBalance(text) }
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

            <TouchableOpacity
              style={{
                width: '100%',
                height: 50,
                backgroundColor: colors.green,
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


export default SetInitialBalanceScreen;
