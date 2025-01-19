import React from 'react';
import { StyleSheet, View } from 'react-native';
import Footer from './Footer';

const AppLayout = ({ children, navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>{children}</View>
      <Footer navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  content: {
    flex: 1,
  },
});

export default AppLayout;
