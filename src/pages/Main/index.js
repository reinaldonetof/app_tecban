import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView, Text, Image} from 'react-native';
import {colors} from '../../styles/colors';
import Slider from '@react-native-community/slider';

import Icon from 'react-native-vector-icons/MaterialIcons';

import carteira from '../../assets/carteira.png';
import divider from '../../assets/divider.png';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function Main({route, navigation}) {
  // const [user, setUser] = useState("");
  // const [saldo, setSaldo] = useState('');
  const [valueToInvest, setValueToInvest] = useState(50);
  const [valueToGet, setValueToGet] = useState(50);

  const user = {
    saldo: 400.0,
  };

  const saldo = 400.0;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={{marginTop: 10, marginLeft: 10}} source={carteira} />
        <Text style={styles.titleSaldo}>Meu Saldo</Text>
        <Text style={styles.saldo}>R$ {!!saldo ? saldo.toFixed(2) : 0.0}</Text>
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
              {!!user.saldo && user.saldo > 50
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
              {!!user.saldo && user.saldo > 50
                ? 'R$ ' + valueToGet.toFixed(2)
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
