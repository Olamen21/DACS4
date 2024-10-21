import React, { useState } from 'react';
import {  View              ,
          StyleSheet        ,
          FlatList          ,
          TouchableOpacity  ,
          Image
        } from 'react-native';
import {  SearchBarComponent      ,
          RecentSearchesComponent ,
          DestinationListComponent,
          TravelTipsComponent     ,
        } from '../components';


const Home = () => {
  const [search, setSearch] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);
  const [showAllRecent, setShowAllRecent] = useState(false);
  const [showAllTravelTips, setShowAllTravelTips] = useState(false);

  const handleSearch = () => {
    if (search.trim() !== '' && !recentSearches.includes(search)) {
      setRecentSearches([search, ...recentSearches]); // Add new search to the beginning of the list
      setSearch(''); // Clear search input after submitting
    }
  };

  const toggleShowAllRecent = () => {
    setShowAllRecent(!showAllRecent);
  };

  const toggleShowAllTravelTips = () => {
    setShowAllTravelTips(!showAllTravelTips);
  };

  const handleChatbotPress = () => {
    alert("Chatbot is pressed");
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={[ { key: 'header' }         ,
                { key: 'recentSearch' }   ,
                { key: 'whereToGo' }      ,
                { key: 'travelTips' }     ]} // Placeholder keys
        renderItem={({ item }) => {
          switch (item.key) {
            case 'header':
              return <SearchBarComponent
                        search={search}
                        setSearch={setSearch}
                        handleSearch={handleSearch}
                      />;
            case 'recentSearch':
              return (
                <RecentSearchesComponent
                  recentSearches={recentSearches}
                  setRecentSearches={setRecentSearches}
                  showAllRecent={showAllRecent}
                  toggleShowAllRecent={toggleShowAllRecent}
                />
              );
            case 'whereToGo':
              return (
                <DestinationListComponent/>
              );
            case 'travelTips':
              return (
                <TravelTipsComponent
                  showAllTravelTips={showAllTravelTips}
                  toggleShowAllTravelTips={toggleShowAllTravelTips}
                />
              );
            default:
              return null;
          }
        }}
        keyExtractor={(item) => item.key}
        contentContainerStyle={styles.flatListContent}
      />

      {/* Chatbot */}
      <TouchableOpacity style={styles.chatBotIconContainer} onPress={handleChatbotPress}>
        <Image source={require('../img/chatbot.png')} style={styles.imgChatBot}/>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container : {
    margin  : 10  ,
    flex    : 1   ,
  },
  chatBotIconContainer  : {
    position            : 'absolute',
    bottom              : 20        ,
    right               : 20        ,
    width               : 70        ,
    height              : 70        ,
    justifyContent      : 'center'  ,
    alignContent        : 'center'  ,
  },
  imgChatBot: {
    width   : 70,
    height  : 70,
  },
});

export default Home;
