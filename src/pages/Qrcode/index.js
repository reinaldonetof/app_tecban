import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import {colors} from '../../styles/colors';

import Ionicon from 'react-native-vector-icons/Ionicons';

import qrcode from '../../assets/qrcode.png';

import {TouchableOpacity} from 'react-native-gesture-handler';

export default function Qrcode() {
  const handleTakeOut = () => {
    alert('Aguarde enquanto o caixa processa o pedido');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={{
            marginTop: 25,
            marginLeft: 10,
            flexDirection: 'row',
            alignItems: 'center',
          }}
          onPress={() => navigation.goBack()}>
          <Ionicon name="chevron-back-outline" size={24} color={colors.black} />
        </TouchableOpacity>
      </View>

      <View style={{zIndex: 5, marginTop: 10}}>
        <Text
          style={{
            textAlign: 'center',
            color: colors.black,
            fontSize: 18,
            fontWeight: '700',
            width: 200,
          }}>
          Leia o QRCode exibido na tela do caixa do Banco 24h
        </Text>
      </View>

      <View style={{zIndex: 5, marginTop: 350}}>
        <TouchableOpacity
          onPress={() => handleTakeOut()}
          style={{
            height: 50,
            width: 50,
            borderRadius: 25,
            backgroundColor: '#6937FA',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Ionicon name="aperture-outline" size={24} color={colors.white} />
        </TouchableOpacity>
      </View>

      <Image source={qrcode} style={{position: 'absolute', top: 0, left: 0}} />
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
    height: 80,
    width: '100%',
    backgroundColor: colors.white,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    zIndex: 5,
  },
});
