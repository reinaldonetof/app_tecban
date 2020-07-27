import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView, Text, Image} from 'react-native';
import {colors} from '../../styles/colors';
import AsyncStorage from '@react-native-community/async-storage';

import Ionicon from 'react-native-vector-icons/Ionicons';

import divider from '../../assets/divider.png';
import icon from '../../assets/icon.png';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useFocusEffect} from '@react-navigation/native';

export default function Main({route, navigation}) {
  const [token, setToken] = useState('');
  const [accountId, setAccountId] = useState('');
  const [saldo, setSaldo] = useState(20);

  useFocusEffect(
    React.useCallback(() => {
      if (token && accountId) {
        handleGetSaldo(accountId, token);
      }
    }, []),
  );

  useEffect(() => {
    AsyncStorage.getItem('token').then((val) => {
      setToken(val);
      const fastToken = val;
      AsyncStorage.getItem('accountId').then(async (value) => {
        setAccountId(value);
        handleGetSaldo(value, fastToken);
      });
    });
  }, []);

  const handleGetSaldo = async (val, fastToken) => {
    await api
      .get(`account/${val}/balance?token=${fastToken}`)
      .then((result) => {
        const amount = result.data['Data']['Balance'][0]['Amount']['Amount'];
        console.log(result.data['Data']['Balance'][0]['Amount']['Amount']);
        setSaldo(Number(amount));
      })
      .catch((error) => console.log(error));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={{
            marginTop: 10,
            marginLeft: 10,
            flexDirection: 'row',
            alignItems: 'center',
          }}
          onPress={() => navigation.goBack()}>
          <Ionicon name="chevron-back-outline" size={24} color={colors.white} />
          <Text style={{fontSize: 16, color: colors.white}}>Conta</Text>
        </TouchableOpacity>
        <Text style={styles.titleSaldo}>Meu Saldo</Text>
        <Text style={styles.saldo}>R$ {!!saldo ? saldo.toFixed(2) : 0.0}</Text>

        <View style={{marginTop: 20, flexDirection: 'row'}}>
          <Text
            style={{
              fontSize: 18,
              color: 'rgba(0,0,0,0.5)',
              fontWeight: 'bold',
              marginRight: 30,
            }}>
            Abril
          </Text>
          <Text
            style={{
              fontSize: 18,
              color: 'rgba(0,0,0,0.5)',
              fontWeight: 'bold',
              marginRight: 30,
            }}>
            Maio
          </Text>
          <Text
            style={{
              fontSize: 22,
              color: colors.white,
              fontWeight: 'bold',
              marginRight: 30,
              backgroundColor: 'rgba(255,255,255,0.5)',
              height: 30,
              width: 70,
              textAlign: 'center',
              borderRadius: 15,
            }}>
            Junho
          </Text>
          <Text
            style={{
              fontSize: 18,
              color: 'rgba(0,0,0,0.5)',
              fontWeight: 'bold',
              marginRight: 30,
            }}>
            Julho
          </Text>
          <Text
            style={{
              fontSize: 18,
              color: 'rgba(0,0,0,0.5)',
              fontWeight: 'bold',
              marginRight: 30,
            }}>
            Agosto
          </Text>
        </View>
        <Text
          style={[
            styles.titleSaldo,
            {marginTop: 0, marginLeft: 0, textAlign: 'center'},
          ]}>
          Meu Extrato de Saque
        </Text>
      </View>
      <ScrollView style={{flex: 1}}>
        <View style={styles.card}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: '90%',
              justifyContent: 'flex-start',
            }}>
            <Text style={styles.titleCard}>25</Text>
            <Text style={{fontSize: 16, color: colors.black, marginRight: 60}}>
              Sábado
            </Text>
          </View>
          <Image style={{marginTop: 10}} source={divider} />

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '90%',
              marginTop: 10,
            }}>
            <Image source={icon} />
            <Text style={[styles.titleCard, {fontSize: 16, marginRight: 10}]}>
              saque no caixa 24hrs
            </Text>

            <Text style={[styles.titleCard, {fontSize: 14, color: '#546E7A'}]}>
              R$ 200,00
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.whiteGray,
    alignItems: 'center',
  },
  header: {
    height: 220,
    width: '100%',
    backgroundColor: colors.greenBlue,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  titleSaldo: {
    fontSize: 22,
    color: colors.white,
    fontWeight: 'bold',
    marginLeft: 30,
    marginTop: 30,
  },
  card: {
    height: 200,
    width: 320,
    backgroundColor: '#FFF',
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 10,
  },
  titleCard: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.black,
    marginTop: 10,
  },
  saldo: {
    fontSize: 32,
    marginLeft: 30,
    color: colors.white,
    fontWeight: 'bold',
  },
  investir: {
    fontSize: 24,
    color: colors.black,
    fontWeight: 'bold',
  },
  buttonConfirm: {
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    width: '80%',
    justifyContent: 'space-between',
  },
});
