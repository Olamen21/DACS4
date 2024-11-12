import { Image, StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'


const {width, height} = Dimensions.get('screen');
const SliderItem = ({item}) => {
  return (
    <View style={styles.container}>
      <Image source={item.img} resizeMode='contain' style={styles.imageFlat}/>
    </View>
  )
}

export default SliderItem

const styles = StyleSheet.create({
  container:{
    width,
    height,
    alignItems:'center',
  },
  imageFlat:{
    flex: 0.35,
    width: '130%',
  },
  content:{
    flex: 0.4,
    alignItems:'center',
  },
  Title:{
    fontSize:24,
    fontWeight:'bold',
    color: 'white'
  },
  description:{
    fontSize: 18,
    marginVertical: 12,
    color: 'white'
  }
})