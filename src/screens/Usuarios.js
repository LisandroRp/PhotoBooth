import React, { useState } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import { SearchBar } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react/cjs/react.development'
import { getUsuarios } from '../redux/Acciones';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const App = (props) => {
    const [searchValue, setSearchValue] = useState([])
    const [memory, setMemory] = useState(null)
    const { usuarios } = useSelector(state => state.reducer);
    const dispatch = useDispatch();

    const fetchUsuarios = () => dispatch(getUsuarios());

    useEffect(() => {
        fetchUsuarios();
        setMemory(usuarios)
    }, []);

    function buscarUsuario(searchValue) {
        const filterDeProfesores = usuarios.filter(usuario => {
            let profesorLowercase = (
                usuario.name +
                ' ' +
                usuario.username +
                ' ' +
                usuario.email
            ).toLowerCase();

            let searchTermLowercase = searchValue.toLowerCase();

            return profesorLowercase.indexOf(searchTermLowercase) > -1;
        });
        setMemory(filterDeProfesores);
        setSearchValue(searchValue)
    };

    return (
        <View style={styles.container}>
            <View style={[styles.shadow, {backgroundColor: '#F28C0F'}]}>
                <SearchBar
                    placeholder="Buscar..."
                    platform='ios'
                    onChangeText={searchValue => buscarUsuario(searchValue)}
                    value={searchValue}
                    inputContainerStyle={{ backgroundColor: '#FFF7EE', height: hp(5) }}
                    placeholderTextColor='rgba(0, 0, 0, 0.3)'
                    cancelButtonProps={{ buttonTextStyle: { color: 'white', paddingTop: 0 } }}
                    containerStyle={{ backgroundColor: '#F28C0F', paddingTop: 0, marginHorizontal: wp(3.3) }}
                    buttonStyle={{}}
                    searchIcon={{ color: 'rgba(0, 0, 0, 0.3)' }}
                />
            </View>
            {(memory && memory.length != 0) ?
                <FlatList
                    data={memory}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ index, item }) => (
                        <TouchableOpacity style={[styles.card, styles.shadow, { marginTop: index == 0 ? hp(1.1) : 0 }]} onPress={() => props.navigation.navigate('UsuarioEspecificoScreen', { id: item.id, nombre: item.name })}>
                            <View style={styles.cardImageContainer}>
                                <Image source={{ uri: "https://thispersondoesnotexist.com/image" }} style={[styles.cardImage, { width: 80, height: 80 }]} />
                            </View>
                            <View style={styles.cardContent}>
                                <Text style={styles.cardTitulo}>{item.name}</Text>
                                <Text style={styles.cardEmail}>{item.email}</Text>
                                <Text style={styles.cardBody}>{item.username}</Text>
                            </View>
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
        flex: 1
    },

    card: {
        flex: 1,
        minHeight: hp(5),
        borderRadius: 10,
        flexDirection: "row",
        flexWrap: "wrap",
        marginBottom: hp(1.1),
        backgroundColor: "white",
        marginHorizontal: wp(2.2),
    },
    cardImageContainer: {
        flex: 0.3,
        height: wp(18),
        width: wp(18),
        margin: wp(2.5),
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardImage: {
        borderRadius: 10,
        borderColor: "#F28C0F",
        borderWidth: 2
    },
    cardContent: {
        flex: 0.8,
        paddingHorizontal: wp(2.5),
        justifyContent: 'center',
        paddingVertical: hp(1.1)
    },
    cardTitulo: {
        fontSize: wp(4),
        color: "#F28C0F",
        fontWeight: 'bold'
    },
    cardEmail: {
        fontSize: wp(3),
        color: "#A7370F",
        fontWeight: 'bold'
    },
    cardBody: {
        fontSize: wp(3),
        color: "black",
        marginTop: hp(0.5)
    },
    image: {
        justifyContent: 'center',
        alignSelf: 'center',
        marginVertical: hp(2.5),
        borderRadius: 10
    },
    shadow: {
        shadowColor: 'grey',
        shadowOffset: {
            width: -3,
            height: 3,
        },
        shadowOpacity: 0.8,
        shadowRadius: 5
    }
})

export default App;

