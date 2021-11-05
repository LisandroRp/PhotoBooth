import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import axios from 'axios'
import { useEffect } from 'react/cjs/react.development'
import { FontAwesome5 } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const App = (props) => {
    const [usuario, setUsuario] = useState([]);
    const [isLoading, setIsLoading] = useState([]);

    const fetchUsuarioAsync = async () => {

        axios.get("https://jsonplaceholder.typicode.com/users/" + props.route.params.id).then(response => {
            if (response.data) {
                setUsuario(response.data)
            }
            else {
                alert("No existe el usuario")
            }
            setIsLoading(false)
        }).catch(function (error) {
            alert("Hubo un problema trayendo al usuario. Es posible que no exista")
        })
    }

    useEffect(() => {
        fetchUsuarioAsync();
    }, [])

    if (isLoading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#F28C0F" backgroundColor=' #616161' style={{ flex: 1 }} />
            </View>
        );
    }
    else {
        return (
            <View style={styles.container}>
                <View style={[styles.shadow, styles.imageContainer]}>
                    <Image source={{ uri: "https://thispersondoesnotexist.com/image" }} style={[{ borderRadius: 10, width: wp(60), height: wp(60) }]} />
                </View>
                <View style={styles.content}>
                    <Text style={styles.name}>{usuario.name}</Text>
                    <Text style={styles.username}>{usuario.username}</Text>
                    <Text>{usuario.email}</Text>
                </View>
                <View style={[styles.shadow, { backgroundColor: "white", marginHorizontal: wp(5), justifyContent: "center", borderRadius: 10 }]}>
                    <View style={styles.addressContainer}>
                        <View style={{ flexDirection: 'row', marginTop: hp(1) }}>
                            <Text style={{ fontSize: wp(1.8), alignSelf: 'flex-end', paddingBottom: hp(0.5), paddingRight: wp(2), paddingLeft: wp(2) }}>{'\u2B24'}</Text>
                            <Text style={styles.address}>Direccion: </Text>
                        </View>
                    </View>
                    <View style={styles.addressInfoContainer}>
                        <View style={styles.addressInfo}>
                            <Text style={{ fontSize: wp(1.8), alignSelf: 'flex-end', paddingBottom: hp(0.5), paddingRight: wp(2), paddingLeft: wp(2) }}>{'\u3007'}</Text>
                            <Text style={styles.addressInfoTitle}>Calle: </Text>
                            <Text style={styles.datos}>{usuario.address.street}</Text>
                        </View>
                        <View style={styles.addressInfo}>
                            <Text style={{ fontSize: wp(1.8), alignSelf: 'flex-end', paddingBottom: hp(0.5), paddingRight: wp(2), paddingLeft: wp(2) }}>{'\u3007'}</Text>
                            <Text style={styles.addressInfoTitle}>Habitacion: </Text>
                            <Text style={styles.datos}>{usuario.address.suite}</Text>
                        </View>
                        <View style={styles.addressInfo}>
                            <Text style={{ fontSize: wp(1.8), alignSelf: 'flex-end', paddingBottom: hp(0.5), paddingRight: wp(2), paddingLeft: wp(2) }}>{'\u3007'}</Text>
                            <Text style={styles.addressInfoTitle}>Ciudad: </Text>
                            <Text style={styles.datos}>{usuario.address.city}</Text>
                        </View>
                        <View style={styles.addressInfo}>
                            <Text style={{ fontSize: wp(1.8), alignSelf: 'flex-end', paddingBottom: hp(0.5), paddingRight: wp(2), paddingLeft: wp(2) }}>{'\u3007'}</Text>
                            <Text style={styles.addressInfoTitle}>Codigo Postal: </Text>
                            <Text style={styles.datos}>{usuario.address.zipcode}</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.mapButton} onPress={() => props.navigation.navigate('MapaUnicoScreen', { usuario: usuario })}>
                        <FontAwesome5 name="map-marker-alt" type="font-awesome" size={24} color={"white"} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
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
    imageContainer: {
        margin: wp(2.5),
        marginTop: hp(3),
        alignItems: 'center'
    },
    cardImage: {
        borderRadius: 10,
        borderColor: "#F28C0F",
        borderWidth: 2
    },
    content: {
        paddingRight: wp(2.5),
        paddingVertical: hp(1.1),
        alignItems: "center"
    },
    name: {
        fontSize: wp(7),
        color: "#F28C0F",
        fontWeight: 'bold'
    },
    username: {
        fontSize: wp(4),
        color: "#A7370F",
        fontWeight: 'bold'
    },
    addressContainer: {
        paddingHorizontal: wp(5),
        borderRadius: 10,
    },
    addressInfoContainer: {
        paddingHorizontal: wp(5),
        paddingTop: hp(1),
        borderRadius: 10,
    },
    address: {
        fontSize: wp(4.4),
        color: "black",
        marginTop: hp(0.5),
        textDecorationLine: 'underline'
    },
    addressInfoTitle: {
        fontSize: wp(4),
        color: "black",
        marginTop: hp(0.5),
        textDecorationLine: 'underline'
    },
    addressInfo: {
        flexDirection: 'row',
        marginLeft: wp(8)
    },
    datos: {
        fontSize: wp(4),
        color: "black",
        marginTop: hp(0.5),
        alignSelf: "flex-end"
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
        shadowRadius: 5,
        elevation: 100
    },
    mapButton: {
        borderRadius: 100,
        backgroundColor: "#F28C0F",
        width: wp(10),
        height: wp(10),
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        marginVertical: hp(2)
    }
})

export default App;