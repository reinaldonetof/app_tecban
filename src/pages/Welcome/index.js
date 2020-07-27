import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {colors} from '../../styles/colors';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../../services/api';

export default function Welcome({navigation}) {
  const [accountId, setAccountId] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('token').then(async (val) => {
      console.log('token do welcome', val);
      await api
        .get(`account/accounts?token=${val}`)
        .then((result) => {
          setAccountId(result.data['Data']['Account'][0]['AccountId']);
        })
        .catch((error) => console.log(error));
    });
  }, []);

  const handleChange = (screen) => {
    AsyncStorage.setItem('accountId', accountId).then(() => {
      navigation.navigate('TabNavigator', {
        screen,
      });
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Auxílio Fácil</Text>
      <Text style={[styles.title, {fontSize: 30}]}>O que deseja fazer?</Text>
      <Text style={styles.text}>
        Escolha aqui que tipo de operação deseja fazer hoje?
      </Text>
      <View style={{alignItems: 'center', flex: 1}}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleChange('Conta')}>
          <Text style={styles.textName}>Saldo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleChange('Education')}>
          <Text style={styles.textName}>Dicas Financeiras</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleChange('Mapa')}>
          <Text style={styles.textName}>
            Localize um caixa do banco 24hrs mais próximo
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.whiteGray,
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: {
    marginTop: 20,
    borderRadius: 20,
    height: 70,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: 315,
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: '#ccc',
  },
  textName: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.black,
  },
  title: {
    marginTop: 10,
    fontSize: 48,
    color: colors.primary,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  text: {
    marginTop: 10,
    fontSize: 18,
    color: colors.black,
    alignSelf: 'center',
    textAlign: 'center',
  },
});
