import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import { Icon, SearchBar } from 'react-native-elements';

const FindSearchScreen = ({ route, navigation}) => {

    const { searchQuery } = route.params;

    return (
        <View style={styles.container}>
            {/* Header cố định */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={24} color="black"/>
                </TouchableOpacity>
                <Text style={styles.searchTitle}>Search</Text>
                <View style={{ width: 24 }} />
            </View>

            <View style={styles.searchBarContainer}>
                <View style={styles.searchBarWrapper}>
                <SearchBar
                    placeholder={`Hotel in ${searchQuery}`}
                    containerStyle={styles.searchBarContainerStyle}
                    inputContainerStyle={styles.searchBarInputContainerStyle}
                    inputStyle={styles.searchBarInputStyle}
                    searchIcon={<Icon name="search" size={17} color="gray" />}
                />
                </View>
            </View>

            <View style={styles.headerHotelList}>
                <Text style={styles.hotelListTitle}>Hotel Lists (27)</Text>
                <TouchableOpacity style={styles.sortButton}>
                    <Text style={styles.sortButtonText}>Sort by</Text>
                </TouchableOpacity>
            </View>
            {/* Nội dung có thể cuộn (Danh sách khách sạn) */}
            <ScrollView contentContainerStyle={styles.scrollContainer}>

                {/* Hotel Item 1 */}
                <View style={styles.hotelCard}>
                <Image
                    style={styles.hotelImage}
                    source={require('../img/hotelHilton.jpg')}
                />
                <View style={styles.hotelInfo}>
                    <Text style={styles.hotelName}>Hilton Hotel</Text>
                    <Text style={styles.hotelAddress}>50 Bạch Đằng, Hải Châu 1, Hải Châu, Đà Nẵng</Text>
                    <View style={styles.hotelDetails}>
                    <Text style={styles.hotelDistance}>3.29 km</Text>
                    <Text style={styles.hotelRating}>⭐ 4.2 (2,003)</Text>
                    </View>
                    <Text style={styles.hotelPrice}>$200 /night</Text>
                </View>
                </View>

                {/* Hotel Item 2 */}
                <View style={styles.hotelCard}>
                <Image
                    style={styles.hotelImage}
                    source={require('../img/hotelHilton.jpg')}
                />
                <View style={styles.hotelInfo}>
                    <Text style={styles.hotelName}>Hilton Hotel</Text>
                    <Text style={styles.hotelAddress}>50 Bạch Đằng, Hải Châu 1, Hải Châu, Đà Nẵng</Text>
                    <View style={styles.hotelDetails}>
                    <Text style={styles.hotelDistance}>3.29 km</Text>
                    <Text style={styles.hotelRating}>⭐ 4.2 (2,003)</Text>
                    </View>
                    <Text style={styles.hotelPrice}>$200 /night</Text>
                </View>
                </View>

                <View style={styles.hotelCard}>
                <Image
                    style={styles.hotelImage}
                    source={require('../img/hotelHilton.jpg')}
                />
                <View style={styles.hotelInfo}>
                    <Text style={styles.hotelName}>Hilton Hotel</Text>
                    <Text style={styles.hotelAddress}>50 Bạch Đằng, Hải Châu 1, Hải Châu, Đà Nẵng</Text>
                    <View style={styles.hotelDetails}>
                    <Text style={styles.hotelDistance}>3.29 km</Text>
                    <Text style={styles.hotelRating}>⭐ 4.2 (2,003)</Text>
                    </View>
                    <Text style={styles.hotelPrice}>$200 /night</Text>
                </View>
                </View>
                <View style={styles.hotelCard}>
                <Image
                    style={styles.hotelImage}
                    source={require('../img/hotelHilton.jpg')}
                />
                <View style={styles.hotelInfo}>
                    <Text style={styles.hotelName}>Hilton Hotel</Text>
                    <Text style={styles.hotelAddress}>50 Bạch Đằng, Hải Châu 1, Hải Châu, Đà Nẵng</Text>
                    <View style={styles.hotelDetails}>
                    <Text style={styles.hotelDistance}>3.29 km</Text>
                    <Text style={styles.hotelRating}>⭐ 4.2 (2,003)</Text>
                    </View>
                    <Text style={styles.hotelPrice}>$200 /night</Text>
                </View>
                </View>
            </ScrollView>

            {/* Filter Button cố định */}
            <TouchableOpacity style={styles.filterButton}>
                <Text style={styles.filterButtonText}>Filters</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        position: 'relative',
    },
    searchBarWrapper: {
        marginTop: 20,
        width: '100%',
        borderRadius: 30,
        borderColor: 'black',
        borderWidth: 1,
        overflow: 'hidden',
    },
    searchTitle: {
        flex: 1,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    searchBarContainer: {
        backgroundColor: 'transparent',
        borderTopWidth: 0,
        borderBottomWidth: 0,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    searchBarContainerStyle: {
        backgroundColor: 'transparent',
        borderTopWidth: 0,
        borderBottomWidth: 0,
        padding: 0,
    },
    searchBarInputContainerStyle: {
        backgroundColor: '#e7e7e7',
        height: 50,
    },
    searchBarInputStyle: {
        paddingLeft: 15,
    },
    scrollContainer: {
        flexGrow: 1,
        marginBottom: 60,
    },
    headerHotelList: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
    hotelListTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    sortButton: {
        alignSelf: 'flex-end',
    },
    sortButtonText: {
        color: '#13881A',
        fontWeight: 'bold',
        fontSize: 15,
    },
    hotelCard: {
        flexDirection: 'row',
        borderRadius: 10,
        backgroundColor: '#fff',
        marginVertical: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
        padding: 10,
    },
    hotelImage: {
        width: 120,
        height: 120,
        borderRadius: 10,
    },
    hotelInfo: {
        flex: 1,
        marginLeft: 10,
    },
    hotelName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
    },
    hotelAddress: {
        fontSize: 12,
        color: 'grey',
        marginVertical: 5,
    },
    hotelDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    hotelDistance: {
        fontSize: 12,
        color: 'grey',
        marginRight: 10,
    },
    hotelRating: {
        fontSize: 12,
        color: 'grey',
    },
    hotelPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#13881A',
    },
    filterButton: {
        position: 'absolute',
        bottom: 20,
        left: '50%',
        transform: [{ translateX: -50 }],
        backgroundColor: '#13881A',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 30,
        zIndex: 1,
    },
    filterButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default FindSearchScreen;
