import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import {colors} from '../../styles/colors';

import Ionicon from 'react-native-vector-icons/Ionicons';

import background from '../../assets/backgroundqrcode.png';

import {TouchableOpacity} from 'react-native-gesture-handler';

export default function Qrcode() {
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

      <TouchableOpacity
        onPress={() => {}}
        style={{
          zIndex: 5,
          height: 50,
          width: 50,
          borderRadius: 25,
          backgroundColor: '#6937FA',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '100%',
        }}>
        <Ionicon name="aperture-outline" size={24} color={colors.white} />
      </TouchableOpacity>
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
