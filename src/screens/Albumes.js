import React from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react/cjs/react.development'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { getAlbumes } from '../redux/Acciones';

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//"Solo en los primeros dos albumes las fotos tienen comentarios ya que la api no tenia muchos comentarios")
//////////////////////////////////////////////////////////////////////////////////////////////////////////

const App = (props) => {
    const { albumes } = useSelector(state => state.reducer);
    const dispatch = useDispatch();

    const fetchAlbumes = () => dispatch(getAlbumes());

    useEffect(() => {
        fetchAlbumes();
    }, []);

    return (
        <View style={styles.container}>
            {albumes ?
                <FlatList
                    data={albumes}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ index, item }) => (
                        <TouchableOpacity style={[styles.btn, styles.shadow, { marginTop: index == 0 ? hp(1.1) : 0 }]} onPress={() => props.navigation.navigate('FotosScreen', { id: item.id, title: item.title })}>
                            <Text style={styles.title}>{item.title}</Text>
                        </TouchableOpacity>
                    )}
                />
                :
                <ActivityIndicator size="large" color="#F28C0F" backgroundColor=' #616161' style={{ flex: 1 }} />
            }
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF7EE'
    },
    btn: {
        flex: 1,
        minHeight: hp(5),
        borderRadius: 10,
        marginBottom: hp(1.1),
        justifyContent: "center",
        backgroundColor: "white",
        marginHorizontal: wp(2.2),
    },
    title: {
        fontSize: wp(5),
        fontWeight: "bold",
        color: "#F28C0F",
        textAlign: "center"
    },
    shadow: {
        shadowColor: 'grey',
        shadowOffset: {
            width: -3,
            height: 3,
        },
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 100
    }
})

export default App;

