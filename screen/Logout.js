import React from 'react';
import { StyleSheet, Text, View, Modal, Dimensions } from 'react-native';
import Button from '../components/Button';
import COLORS from '../style/Colors';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const LogoutModal = ({ visible, onClose,navigation }) => {
  return (
    <Modal
      visible={visible}
      transparent={true} 
      animationType="fade" 
      onRequestClose={onClose} 
    >
      <View style={styles.overlay}> 
        <View style={styles.modalContent}> 
          <Text style={styles.text}>Are you sure you want to logout?</Text>
          <View style={styles.buttonContainer}>
            <Button
              title="Cancel"
              onPress={onClose}
              style={styles.buttonModal}
            />
            <Button
            title="Logout"
            filled
            style={styles.buttonModal}
            onPress={() => {
              onClose(); // Đóng modal trước khi điều hướng
              navigation.navigate("Login"); // Điều hướng đến màn hình Login
            }}/>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default LogoutModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: 'rgba(0, 0, 0, 0.6)', 
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderWidth: 1,
    borderColor: '#888',
    width: '90%',
    borderRadius: 10,
    alignItems: 'center', 
  },
  text: {
    color: COLORS.black,
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingLeft: windowWidth * 0.03,
    paddingRight: windowWidth * 0.03,
  },
  buttonModal:{
    width:'48%',
    height:windowHeight*0.065
  }
});
