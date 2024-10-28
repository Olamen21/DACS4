import React from 'react';
import { View,
          Text,
          FlatList,
          StyleSheet,
          TouchableOpacity,
          Image } from 'react-native';
import COLORS from '../style/Colors';

const travelTips = [
  { id: '1', title: 'How to Pack Efficiently for a Trip'  , image: require('../img/maxresdefault.jpg'), summary: 'Learn how to pack everything you need without overpacking.'   },
  { id: '2', title: 'Best Places to Visit in Vietnam'     , image: require('../img/maxresdefault.jpg'), summary: 'Explore the top destinations in Vietnam.'                     },
  { id: '3', title: 'Travel Safety Tips'                  , image: require('../img/maxresdefault.jpg'), summary: 'Stay safe while traveling with these tips.'                   },
  { id: '4', title: 'Budget Travel Tips'                  , image: require('../img/maxresdefault.jpg'), summary: 'Save money while traveling with these budget tips.'           },
  { id: '5', title: 'How to Find Great Deals on Hotels'   , image: require('../img/maxresdefault.jpg'), summary: 'Get the best hotel deals for your next trip.'                 },
];

const TravelTipsComponent = ({ showAllTravelTips, toggleShowAllTravelTips }) => {
  const renderTipItem = ({ item }) => (
    <TouchableOpacity style={styles.travelTipCard}>
      <Image source={item.image} style={styles.travelTipImage} />
      <View style={styles.travelTipContent}>
        <Text style={styles.travelTipTitle}>{item.title}</Text>
        <Text style={styles.travelTipSummary}>{item.summary}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.viewTravelTips}>
      <View style={styles.row}>
        <Text style={styles.recentText}>Travel Tips</Text>
        <TouchableOpacity onPress={toggleShowAllTravelTips}>
          <Text style={styles.seeAllText}>{showAllTravelTips ? 'See less' : 'See all'}</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={showAllTravelTips ? travelTips : travelTips.slice(0, 2)}
        renderItem={renderTipItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.travelTipList}
        extraData={showAllTravelTips}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  recentText: {
    fontSize  : 17    ,
    fontWeight: 'bold',
    color:COLORS.black,
  },
  seeAllText: {
    fontSize: 17       ,
    color   : '#13881A',
  },
  row : {
    flexDirection   : 'row'          ,
    justifyContent  : 'space-between',
    alignItems      : 'center'       ,
  },
  viewTravelTips: {
    marginTop     : 10,
    marginRight   : 10,
    marginLeft    : 10,
  },
  travelTipList: {
    marginTop: 10,
  },
  travelTipCard: {
    flexDirection   : 'row'               ,
    alignItems      : 'center'            ,
    padding         : 10                  ,
    marginVertical  : 10                  ,
    borderRadius    : 15                  ,
    backgroundColor : '#fff'              ,
    overflow        : 'hidden'            ,
    elevation       : 3                   ,
    shadowColor     : '#000'              ,
    shadowOffset    : {width:0, height:2} ,
    shadowOpacity   : 0.3                 ,
    shadowRadius    : 5                   ,
  },
  travelTipImage: {
    width         : 140     ,
    height        : 100     ,
    borderRadius  : 10      ,
    marginRight   : 15      ,
    resizeMode    : 'cover' ,
  },
  travelTipContent: {
    flex          : 1       ,
    justifyContent: 'center',
  },
  travelTipTitle: {
    fontSize    : 16      ,
    fontWeight  : 'bold'  ,
    color       : '#333'  ,
    marginBottom: 5       ,
  },
  travelTipSummary: {
    fontSize      : 14    ,
    color         : '#666',
    lineHeight    : 20    ,
  },
});

export default TravelTipsComponent;
