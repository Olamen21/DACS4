import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { SearchBar, Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const Home = () => {
  const [search, setSearch]                       = useState('');
  const [recentSearches, setRecentSearches]       = useState([]);
  const [showAllRecent, setShowAllRecent]         = useState(false);
  const [showAllTravelTips, setShowAllTravelTips] = useState(false);

  const destination = [
    {id: '1', name: 'Đà Nẵng', image: require('../img/cauvang-1654247842-9403-1654247849.jpg'), hotels: '178 Hotels'},
    {id: '2', name: 'Hội An', image: require('../img/Hoi-An-VnExpress-5851-16488048-4863-2250-1654057244.jpg'), hotels: '165 Hotels'},
    {id: '3', name: 'Đà Nẵng', image: require('../img/cauvang-1654247842-9403-1654247849.jpg'), hotels: '178 Hotels'},
    {id: '4', name: 'Đà Nẵng', image: require('../img/cauvang-1654247842-9403-1654247849.jpg'), hotels: '178 Hotels'},
    {id: '5', name: 'Đà Nẵng', image: require('../img/cauvang-1654247842-9403-1654247849.jpg'), hotels: '178 Hotels'},
  ];

  const travelTips = [
    { id: '1', title: 'How to Pack Efficiently for a Trip', image: require('../img/maxresdefault.jpg'), summary: 'Learn how to pack everything you need without overpacking.' },
    { id: '2', title: 'How to Pack Efficiently for a Trip', image: require('../img/maxresdefault.jpg'), summary: 'Learn how to pack everything you need without overpacking.' },
    { id: '3', title: 'How to Pack Efficiently for a Trip', image: require('../img/maxresdefault.jpg'), summary: 'Learn how to pack everything you need without overpacking.' },
    { id: '4', title: 'How to Pack Efficiently for a Trip', image: require('../img/maxresdefault.jpg'), summary: 'Learn how to pack everything you need without overpacking.' },
    { id: '5', title: 'How to Pack Efficiently for a Trip', image: require('../img/maxresdefault.jpg'), summary: 'Learn how to pack everything you need without overpacking.' },
  ];

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

  const toggleShowAllRecent = () => {
    setShowAllRecent(!showAllRecent);
  };

  const toggleShowAllTravelTips = () => {
    setShowAllTravelTips(!showAllTravelTips);
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

  const renderDestinationItem = ({item}) => (
    <View style={styles.destinationItem}>
      <Image source={item.image} style={styles.destinationImage}/>
      <View style={styles.textContainer}>
        <Text style={styles.destinationName}>{item.name}</Text>
        <Text style={styles.destinationHotels}>{item.hotels}</Text>
      </View>
    </View>
  );

  const renderTravelTipItem = ({item}) => (
    <View style={styles.travelTipItem}>
      <Image source={item.image} style={styles.travelTipImages} />
      <View style={styles.travelTipTextContainer}>
        <Text style={styles.travelTipTitle}>{item.title}</Text>
        <Text style={styles.travelTipSummary}>{item.summary}</Text>
      </View>
    </View>
  );


  return (
    <View style={styles.container}>
      <Image
        //logo
        style={styles.tinyLogo}
        source={require('../img/logo.png')}
      />
      <View style={styles.searchBarContainer}>
        <SearchBar
          //Thanh tìm kiếm
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
          <TouchableOpacity onPress={toggleShowAllRecent}>
            <Text style={styles.seeAllText}>{showAllRecent ? 'See less' : 'See all'}</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={recentSearches}
          renderItem={renderRecentSearchItem}
          keyExtractor={(item) => item}
          horizontal={!showAllRecent}
          showsHorizontalScrollIndicator={false} // Ẩn thanh cuộn ngang
          contentContainerStyle={styles.recentSearchList}
        />
      </View>
      <View style={styles.wannaGo}>
        <Text style={styles.recentText}>Where do you wanna go?</Text>
        <FlatList
          data={destination}
          renderItem={renderDestinationItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false} //Ẩn thanh cuộn ngang
          contentContainerStyle={styles.destinationList}
        />
      </View>

      {/* Travel Tips Section */}
      <View style={styles.viewTravelTips}>
        <View style={styles.row}>
          <Text style={styles.recentText}>Travel Tips</Text>
          <TouchableOpacity onPress={toggleShowAllTravelTips}>
            <Text style={styles.seeAllText}>{showAllTravelTips ? 'See less' : 'See all'}</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={showAllTravelTips ? travelTips : travelTips.slice(0.3)}
          renderItem={renderTravelTipItem}
          keyExtractor={(item) => item.id}
          horizontal={!showAllTravelTips}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.travelTipList}
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
  wannaGo: {
    marginTop: 10,
    marginRight: 10,
    marginLeft: 10,
  },
  destinationList: {
    marginTop: 10,
  },
  destinationItem: {
    alignItems: 'center',
    marginHorizontal: 5,
    position: 'relative', //Giữ các thành phần bên trong theo vị trí tương đối
  },
  destinationImage: {
    width: 161,
    height: 80,
    borderRadius: 10,
  },
  textContainer: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
  },
  destinationName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'rgba(0,0,0,0.75)', //Đổ bóng chữ để dễ đọc hơn
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
  destinationHotels: {
    fontSize: 14,
    color: 'white',
    textShadowColor: 'rgba(0,0,0,0.75)', //Đổ bóng chữ để dễ đọc hơn
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
  viewTravelTips: {
    marginTop: 10,
    marginRight: 10,
    marginLeft: 10,
  },
  travelTipList: {
    marginTop: 10,
  },
  travelTipItem: {
    alignItems: 'center',
    marginHorizontal: 5,
  },
  travelTipImage: {
    width: 150,
    height: 100,
    borderRadius: 10,
  },
  travelTipTextContainer: {
    marginTop: 5,
    alignItems: 'center',
  },
  travelTipTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  travelTipSummary: {
    fontSize: 14,
    color: 'gray',
  }
});

export default Home;
