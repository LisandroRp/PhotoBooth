import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import axios from 'axios'
import { useEffect } from 'react/cjs/react.development'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//"No todos los usuarios poseen informacion. Es posible intentar entrar a un usuario que haya comentado pero que en la api no exista con informacion")
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const App = (props) => {
    const [foto, setFoto] = useState("");
    const [comentarios, setComentarios] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchAlbumesAsync = async () => {
        setFoto(await props.route.params.foto)
        axios.get("https://jsonplaceholder.typicode.com/comments/?postId=" + await props.route.params.id_foto).then(response => {
            if (response.data) {
                setComentarios(response.data)
            }
            else {
                alert("No existe la foto")
            }
            setIsLoading(false)
        }).catch(function (error) {
            alert("Hubo un problema trayendo los comentarios")
        })
    }
    useEffect(() => {
        fetchAlbumesAsync();
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
                {comentarios.length != 0
                    ?
                    <FlatList
                        data={comentarios}
                        keyExtractor={item => item.id.toString()}
                        ListHeaderComponent={item =>
                            <View style={styles.shadow}>
                                <Image source={{ uri: foto }} style={[styles.image, { width: wp(80), height: wp(80) }]} />
                            </View>
                        }
                        renderItem={({ index, item }) => (
                            <TouchableOpacity style={[styles.card, styles.shadow, { marginTop: index == 0 ? hp(1.1) : 0 }]} onPress={() => props.navigation.navigate('UsuarioEspecificoScreen', { id: item.postId })}>
                                <View style={styles.cardImageContainer}>
                                    <Image source={{ uri: "https://thispersondoesnotexist.com/image" }} style={[styles.cardImage, { width: 80, height: 80 }]} />
                                </View>
                                <View style={styles.cardContent}>
                                    <Text style={styles.cardTitulo}>{item.name}</Text>
                                    <Text style={styles.cardEmail}>{item.email}</Text>
                                    <Text style={styles.cardBody}>{item.body}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                    :
                    <View style={[{ flex: 1 }]}>
                        <View style={[styles.shadow, { flex: 1 }]}>
                            <Image source={{ uri: foto }} style={[styles.image, { width: wp(80), height: wp(80) }]} />
                        </View>
                        <View style={[{ flex: 1 }]}>
                            <View style={[styles.noItemsCard, styles.shadow]}>
                                <Text style={styles.noItemsCardTitulo}>Esta foto aun no posee comentarios</Text>
                            </View>
                        </View>
                    </View>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF7EE'
    },
    noItemsCard: {
        alignSelf: "center",
        borderRadius: 10,
        padding: wp(10),
        backgroundColor: "white",
        marginHorizontal: wp(2.2),
        marginTop: hp(10)
    },
    noItemsCardTitulo: {
        fontSize: wp(6),
        color: "#F28C0F",
        textAlign: "center",
        flexWrap: "wrap",
        fontWeight: 'bold'
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
        alignItems: 'center'
    },
    cardImage: {
        borderRadius: 10,
        borderColor: "#F28C0F",
        borderWidth: 2
    },
    cardContent: {
        flex: 0.8,
        paddingRight: wp(2.5),
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
        shadowRadius: 5,
        elevation: 100
    }
})

export default App;