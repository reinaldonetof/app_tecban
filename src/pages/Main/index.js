import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView, Text, Image} from 'react-native';
import {colors} from '../../styles/colors';
import Slider from '@react-native-community/slider';

import Icon from 'react-native-vector-icons/MaterialIcons';

import carteira from '../../assets/carteira.png';
import divider from '../../assets/divider.png';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../../services/api';
import {useFocusEffect} from '@react-navigation/native';

export default function Main({route, navigation}) {
  const [token, setToken] = useState('');
  const [accountId, setAccountId] = useState('');
  const [saldo, setSaldo] = useState(20);
  const [valueToInvest, setValueToInvest] = useState(50);
  const [valueToGet, setValueToGet] = useState(50);

  useFocusEffect(
    React.useCallback(() => {
      if (token && accountId) {
        handleGetSaldo(accountId);
      }
    }, []),
  );

  useEffect(() => {
    AsyncStorage.getItem('token').then((val) => {
      setToken(val);
      AsyncStorage.getItem('accountId').then(async (value) => {
        setAccountId(value);
        console.log('accountId', accountId, 'token', token);
        handleGetSaldo(value);
      });
    });
  }, []);

  const handleGetSaldo = async (val) => {
    await api
      .get(`account/${val}/balance?token=${token}`)
      .then((result) => {
        const amount = result.data['Data']['Balance'][0]['Amount']['Amount'];
        console.log(result.data['Data']['Balance'][0]['Amount']['Amount']);
        setSaldo(Number(amount));
      })
      .catch((error) => console.log(error));
  };

  const handleGetMoney = () => {
    navigation.navigate('Qrcode');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Wallet')}>
          <Image style={{marginTop: 10, marginLeft: 10}} source={carteira} />
        </TouchableOpacity>
        <Text style={styles.titleSaldo}>Meu Saldo</Text>
        <Text style={styles.saldo}>R$ {!!saldo ? saldo : 0.0}</Text>
      </View>
      <ScrollView style={{flex: 1}}>
        <View style={styles.card}>
          <Text style={styles.titleCard}>Deseja investir quanto?</Text>
          <Image style={{marginTop: 10}} source={divider} />

          <Slider
            style={{width: 200, marginTop: 30, height: 30}}
            minimumValue={50}
            maximumValue={saldo}
            value={valueToInvest}
            onValueChange={(val) =>
              val < 50 ? setValueToInvest(50) : setValueToInvest(val)
            }
          />
          <View style={styles.textButton}>
            <Text style={styles.investir}>
              {!!saldo && saldo > 50
                ? 'R$ ' + valueToInvest.toFixed(2)
                : 'Saldo Insuficiente'}
            </Text>
            <TouchableOpacity
              disabled={saldo < 50}
              onPress={() => {}}
              style={[
                styles.buttonConfirm,
                saldo < 50 ? {backgroundColor: '#ccc'} : null,
              ]}>
              <Icon name="check" size={24} color={colors.white} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.card}>
          <Text style={styles.titleCard}>Deseja Sacar quanto?</Text>
          <Image style={{marginTop: 10}} source={divider} />

          <Slider
            style={{width: 200, marginTop: 30, height: 30}}
            minimumValue={50}
            maximumValue={saldo}
            value={valueToGet}
            onValueChange={(val) =>
              val < 50 ? setValueToGet(50) : setValueToGet(val)
            }
          />
          <View style={styles.textButton}>
            <Text style={styles.investir}>
              {!!saldo && saldo > 50
                ? 'R$ ' + valueToGet.toFixed(2)
                : 'Saldo Insuficiente'}
            </Text>
            <TouchableOpacity
              disabled={saldo < 50}
              onPress={() => handleGetMoney()}
              style={[
                styles.buttonConfirm,
                saldo < 50 ? {backgroundColor: '#ccc'} : null,
              ]}>
              <Icon name="check" size={24} color={colors.white} />
            </TouchableOpacity>
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
    height: 180,
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
    borderWidth: 1,
    borderColor: 'black',
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
