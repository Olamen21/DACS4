import React from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const RecentSearchesComponent = ({ recentSearches, setRecentSearches, showAllRecent, toggleShowAllRecent }) => {
  const handleRemoveSearch = (searchTerm) => {
    setRecentSearches(recentSearches.filter(item => item !== searchTerm));
  };

  const renderRecentSearchItem = ({ item }) => (
    <View style={styles.recentItem}>
      <TouchableOpacity style={styles.recentTextContainer}>
        <Text style={styles.recentItemText}>{item}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleRemoveSearch(item)} style={styles.removeButton}>
        <Icon name="close" size={16} color="black" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.viewText}>
      <View style={styles.row}>
        <Text style={styles.recentText}>Recent Search</Text>
        <TouchableOpacity onPress={toggleShowAllRecent}>
          <Text style={styles.seeAllText}>{showAllRecent ? 'See less' : 'See all'}</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={recentSearches}
        renderItem={renderRecentSearchItem}
        keyExtractor={(item) => item}
        horizontal={!showAllRecent}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.recentSearchList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
    backgroundColor: '#D5D5D5',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: 5,
    marginTop: 5,
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

export default RecentSearchesComponent;
