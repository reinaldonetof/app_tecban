import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Linking,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import MainImg from '../../assets/mainImg.png';
import {colors} from '../../styles/colors';

import api from '../../services/api';

export default function Login({navigation}) {
  const [tokenReceived, setTokenReceived] = useState('');

  const handleLogin = async () => {
    await api
      .get('account/auth')
      .then((response) => {
        const link = response.data.link;
        Linking.openURL(link);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    Linking.addEventListener('url', async (result) => {
      if (result) {
        const reg = new RegExp('code=(.*)[&]');
        const token = reg.exec(result['url']);
        if (token[1]) {
          await api
            .post(`account/confirmAuth?code=${token[1]}`)
            .then((result) => {
              if (result.data.scope === 'openid payments') {
                // const accessToken = result.data.access_token;
                // paymentFast(accessToken);
              } else {
                setTokenReceived(token[1]);
                const accessToken = result.data.access_token;
                AsyncStorage.setItem('token', accessToken).then(() =>
                  navigation.navigate('Welcome'),
                );
              }
            });
        }
      }
    });
  }, []);

  const paymentFast = async (fastToken) => {
    await api
      .post(`payment?token=${fastToken}`)
      .then(() => navigation.navigate('TabNavigator'));
  };

  const ButtonProfile = (props) => {
    return (
      <TouchableOpacity style={styles.button} onPress={() => handleLogin()}>
        <Text style={styles.textName}>
          Acessar minha {`\n`}carteira digital
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView style={{flex: 1}}>
        <Image source={MainImg} style={{marginTop: -20, marginLeft: -20}} />
        <Text style={styles.title}>Saque Simples</Text>
        <Text style={styles.text}>
          O jeito simples de movimentar seu dinheiro, investir e sacar. Sem
          burocracia. Em todos os caixas eletrônicos dos bancos 24h
        </Text>
        <View style={{alignItems: 'flex-end', flex: 1}}>
          <ButtonProfile />
        </View>
      </ScrollView>
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
    marginRight: -80,
    height: 70,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: 280,
    flexDirection: 'row',
    backgroundColor: colors.greenBlue,
  },
  textName: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.white,
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
    color: colors.gray,
    alignSelf: 'center',
    textAlign: 'center',
  },
});
