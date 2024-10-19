import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { SearchBar, Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const Home = () => {
  const [search, setSearch] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);

  const updateSearch = (searchText) => {
    setSearch(searchText);
  };

  const handleSearch = () => {
    if (search.trim() !== '' && !recentSearches.includes(search)) {
      setRecentSearches([search, ...recentSearches]); // Thêm tìm kiếm mới vào đầu danh sách
      setSearch(''); // Xóa ô tìm kiếm sau khi thực hiện tìm kiếm
    }
  };

  const handleRecentSearch = (searchTerm) => {
    setSearch(searchTerm); // Cập nhật thanh tìm kiếm khi nhấn vào gợi ý
  };

  const handleRemoveSearch = (searchTerm) => {
    setRecentSearches(recentSearches.filter(item => item !== searchTerm));
  };

  const renderRecentSearchItem = ({ item }) => (
    <View style={styles.recentItem}>
      <TouchableOpacity onPress={() => handleRecentSearch(item)} style={styles.recentTextContainer}>
        <Text style={styles.recentItemText}>{item}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleRemoveSearch(item)} style={styles.removeButton}>
        <Icon name="close" size={16} color="black" />
      </TouchableOpacity>
    </View>
  );


  return (
    <View style={styles.container}>
      <Image
        style={styles.tinyLogo}
        source={require('../img/logo.png')}
      />
      <View style={styles.searchBarContainer}>
        <SearchBar
          placeholder="Search destination"
          onChangeText={updateSearch}
          value={search}
          containerStyle={styles.searchBarContainerStyle} // Custom container style
          inputContainerStyle={styles.searchBarInputContainerStyle} // Custom input container
          inputStyle={styles.searchBarInputStyle} // Custom input style
          searchIcon={<Icon name="search" size={17} color="gray" />}
          onSubmitEditing={handleSearch} // Gọi hàm handleSearch khi nhấn enter
        />
      </View>
      <View style={styles.viewText}>
        <View style={styles.row}>
          <Text style={styles.recentText}>Recent Search</Text>
          <Text style={styles.seeAllText}>See all</Text>
        </View>
        <FlatList
          data={recentSearches}
          renderItem={renderRecentSearchItem}
          keyExtractor={(item) => item}
          horizontal // Hiển thị gợi ý trên một hàng
          showsHorizontalScrollIndicator={false} // Ẩn thanh cuộn ngang
          contentContainerStyle={styles.recentSearchList}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
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
    backgroundColor: '#F3F3F3',
    borderRadius: 30, // Bo tròn góc
    height: 50,
  },
  searchBarInputStyle: {
    paddingLeft: 15,
  },
  viewText: {
    marginTop: 15,
    marginRight: 10,
    marginLeft: 10,
  },
  row: {
    flexDirection: 'row', // Căn chỉnh theo hàng
    justifyContent: 'space-between', // Căn giữa các thành phần
    alignItems: 'center', // Căn giữa theo chiều dọc
  },
  recentText: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  seeAllText: {
    fontSize: 17,
    color: '#13881A',
  },
  recentSearchList: {
    marginTop: 10,
  },
  recentItem: {
    flexDirection: 'row', // Đặt hướng hàng cho các phần tử
    alignItems: 'center', // Canh giữa theo chiều dọc
    backgroundColor: '#F3F3F3',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: 5,
  },
  recentTextContainer: {
    flex: 1, // Chiếm không gian còn lại
  },
  recentItemText: {
    fontSize: 16,
  },
  removeButton: {
    paddingLeft: 10, // Khoảng cách giữa text và dấu "X"
  },
});

export default Home;
