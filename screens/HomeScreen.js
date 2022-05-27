/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {useLayoutEffect} from 'react';
import {View, TouchableOpacity, Text,FlatList} from 'react-native';
import TransactionDetail from '../components/TransactionDetail';
import { useAppContext } from '../context';
import {dropTable, getDBConnection } from '../database';
import colors from '../lib/colors';

const Homescreen = ({navigation}) => {

  const {transaction, initialMoney} = useAppContext();

  const renderItem = ({item}) => <TransactionDetail id={item.trxid}
                                                    title={item.title}
                                                    type={item.type}
                                                    amount={item.amount}
                                                    timestamp={item?.timestamp}
                                                    />;


// delete soon
  const drop = async ()=>{
    const db = await getDBConnection();
    await dropTable(db);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: null,
      headerTransparent:true,
      headerStyle:{
        backgroundColor: colors.background,
      },
      headerRight: ()=> (
        <TouchableOpacity>
          <Text>AAAA</Text>
        </TouchableOpacity>
      ),
      headerLeft: ()=> (
        <TouchableOpacity onPress={drop}>
          <Text>DROP TABLE</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View
      style={{
        flex: 1,
        height: '100%',
        width: '100%',
        backgroundColor: colors.background,
      }}>
      {/* My balance */}
      <View
        style={{
          height: 80,
          marginHorizontal: 20,
          alignItems: 'flex-start',
          marginTop: 60,
        }}>
        <View>
          <Text
            style={{
              color: colors.primary,
              fontSize: 18,
              fontFamily: 'OpenSans-Bold',
            }}>
            My Balance
          </Text>
        </View>
        <View>
          <Text
            style={{
              color: colors.primary,
              fontSize: 28,
              fontFamily: 'Sequel100Black',
            }}>
            {initialMoney}
          </Text>
        </View>
      </View>

      <View>
        <Text>PLUS</Text>
      </View>

      {/* Transaction History */}
      <View style={{marginTop: 10, marginHorizontal: 20, flex: 1}}>
        <View style={{marginBottom: 10}}>
          <Text style={{color: colors.primary, fontFamily: 'OpenSans-Bold'}}>
            Transaction History
          </Text>
        </View>

        {/* Transaction Details */}
        <View style={{marginBottom: 70}}>
          {transaction.length < 1 ?
            <View style={{width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
              <Text style={{fontFamily: 'OpenSans-Bold', fontSize: 16, color: colors.primary}}>No transaction history</Text>
            </View>
            :
          <FlatList
            data={transaction}
            renderItem={renderItem}
            keyExtractor={item => `${item.trxid}`}
          />
          }
        </View>
      </View>

      {/* Bottom tab */}
      <View
        style={{
          flexDirection: 'row',
          position: 'absolute',
          bottom: 0,
          left: 0,
        }}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={()=> navigation.navigate('AddTransactionScreen',{type: 'CASH_IN'})}
          style={{backgroundColor: colors.green, height: 40, width: '50%',justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontFamily: 'OpenSans-Bold', color: colors.primary}}>Cash In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={()=> navigation.navigate('AddTransactionScreen', {type: 'CASH_OUT'})}
          style={{backgroundColor: colors.red, height: 40, width: '50%',justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontFamily: 'OpenSans-Bold', color: colors.primary}}>Cash Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Homescreen;
