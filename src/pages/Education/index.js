import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {colors} from '../../styles/colors';

export default function Education() {
  return (
    <View style={styles.container}>
      <Text style={[styles.titleCard, {marginTop: 15}]}>
        EDUCAÇÃO FINANCEIRA
      </Text>
      <View style={styles.card}>
        <Text style={styles.titleCard}>Introdução à Educação Financeira</Text>
        <Text style={styles.textCard}>
          A Educação Financeira não consiste somente em aprender a economizar,
          cortar gastos, poupar e acumular dinheiro. É muito mais que isso.{' '}
          {`\n\n`}É buscar uma melhor qualidade de vida tanto hoje quanto no
          futuro, proporcionando a segurança material necessária para aproveitar
          os prazeres da vida e ao mesmo tempo obter uma garantia para eventuais
          imprevistos. {`\n\n`}fonte:
          http://minhaseconomias.com.br/educacao-financeira
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: 'center',
  },

  card: {
    width: 320,
    backgroundColor: '#FFF',
    borderRadius: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    margin: 30,
  },
  titleCard: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.black,
    marginTop: 10,
    textAlign: 'center',
  },
  textCard: {
    marginTop: 10,
    fontSize: 18,
    color: colors.gray,
    width: 250,
    textAlign: 'justify',
  },
});
