import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView, Text, Image, Slider} from 'react-native';
import {colors} from '../../styles/colors';

import carteira from '../../assets/carteira.png';
import divider from '../../assets/divider.png';

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
            style={{width: 250, marginTop: 30, height: 30}}
            minimumValue={50}
            maximumValue={saldo}
            value={valueToInvest}
            onValueChange={(val) =>
              val < 50 ? setValueToInvest(50) : setValueToInvest(val)
            }
          />
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.investir}>
              {!!user.saldo && user.saldo > 50
                ? 'R$ ' + valueToInvest.toFixed(2)
                : 'Saldo Insuficiente'}
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
    margin: 30,
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
    margin: 30,
    color: colors.black,
    fontWeight: 'bold',
  },
});
