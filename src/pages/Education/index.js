import React from "react";
import { View, StyleSheet } from "react-native";
import { colors } from "../../styles/colors";

const Education = () => {
  return <View style={styles.container} />;
};

export default Education;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
});
