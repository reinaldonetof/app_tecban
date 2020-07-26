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

const urlForAuthentication =
  'https://auth1.tecban-sandbox.o3bank.co.uk/auth?client_id=e089644d-8084-4705-ba3b-76d6dd9be143&response_type=code&scope=openid%20accounts&request=eyJhbGciOiJub25lIn0.eyJhdWQiOiJodHRwczovL2F1dGgxLnRlY2Jhbi1zYW5kYm94Lm8zYmFuay5jby51ayIsImV4cCI6MTU5NTc0NDU2My43MzYsImlzcyI6ImUwODk2NDRkLTgwODQtNDcwNS1iYTNiLTc2ZDZkZDliZTE0MyIsInNjb3BlIjoib3BlbmlkIGFjY291bnRzIiwicmVkaXJlY3RfdXJpIjoiaHR0cDovL3d3dy5nb29nbGUuY28udWsiLCJub25jZSI6IjY1NDAzMWUwLWUxOTctNGVhYS1iZTNlLWI2YTNjNmNkOGIwYSIsInN0YXRlIjoiZmJjOTBjM2MtOWMwOC00NTZmLWJmMTAtNzg5MWRhYzcxMDVkIiwiY2xhaW1zIjp7ImlkX3Rva2VuIjp7Im9wZW5iYW5raW5nX2ludGVudF9pZCI6eyJ2YWx1ZSI6ImFhYy1kY2Y0NDc4OS03ZWZjLTRlYTYtOWFiYS1lMDE0ZWY3OTRhODEiLCJlc3NlbnRpYWwiOnRydWV9fX19.';

export default function Login({navigation}) {
  const [tokenReceived, setTokenReceived] = useState('');

  const handleLogin = () => {
    Linking.openURL(urlForAuthentication).then((result) => {});
  };

  useEffect(() => {
    Linking.addEventListener('url', (result) => {
      if (result) {
        console.log(result);
        const reg = new RegExp('code=(.*)[&]');
        const token = reg.exec(result['url']);
        if (token) {
          setTokenReceived(token);
          AsyncStorage.setItem('url', result['url']);
          AsyncStorage.setItem('token', token[1]);
          navigation.navigate('Welcome');
        }
      }
    });
  });

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
        <Text style={styles.title}>Auxílio Fácil</Text>
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
