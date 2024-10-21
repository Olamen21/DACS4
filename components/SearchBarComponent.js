import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { SearchBar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const SearchBarComponent = ({ search, setSearch, handleSearch }) => {
  return (
    <View style={styles.headerContainer}>
      <Image style={styles.tinyLogo} source={require('../img/logo.png')} />
      <View style={styles.searchBarContainer}>
        <SearchBar
          placeholder="Search destination"
          onChangeText={setSearch}
          value={search}
          containerStyle={styles.searchBarContainerStyle}
          inputContainerStyle={styles.searchBarInputContainerStyle}
          inputStyle={styles.searchBarInputStyle}
          searchIcon={<Icon name="search" size={17} color="gray" />}
          onSubmitEditing={handleSearch}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tinyLogo: {
    width: 141,
    height: 109,
    marginBottom: 20,
  },
  searchBarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBarContainerStyle: {
    width: '90%',
    backgroundColor: 'transparent', // Đặt nền trong suốt cho toàn container
    borderTopWidth: 0, // Xóa viền trên
    borderBottomWidth: 0, // Xóa viền dưới
  },
  searchBarInputContainerStyle: {
    backgroundColor: '#D5D5D5',
    borderRadius: 30, // Bo tròn góc
    height: 50,
  },
  searchBarInputStyle: {
    paddingLeft: 15,
  },
});

export default SearchBarComponent;