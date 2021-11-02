import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, Animated, ActivityIndicator } from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { FontAwesome, FontAwesome5, Entypo, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react/cjs/react.development'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { getFotos } from '../redux/Acciones';



const App = (props) => {
    const [startValue, setStartValue] = useState(new Animated.Value(0));
    const [endValue, setEndValue] = useState(1);
    const [duration, setDuration] = useState(500);
    const [selectedImage, setSelectedImage] = useState("");
    const [isAnimated, setIsAnimated] = useState(false);

    const { fotos } = useSelector(state => state.reducer);
    const dispatch = useDispatch();

    const fetchFotos = () => dispatch(getFotos());

    useEffect(() => {
        fetchFotos();
    }, []);

    function animate(selectedImage) {
        setSelectedImage(selectedImage)
        setIsAnimated(true);
        Animated.timing(startValue, {
            toValue: endValue,
            duration: duration,
            useNativeDriver: true,
        }).start();
    }
    function desAnimate() {
        Animated.timing(startValue, {
            toValue: 0,
            duration: duration,
            useNativeDriver: true,
        }).start();
        setTimeout(() => setIsAnimated(false), 500)
    }
    function animationStyle() {
        if (isAnimated) {
            return {
                top: hp(-10),
                right: 0
            }
        } else {
            return
        }
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={fotos}
                numColumns={2}
                keyExtractor={item => item.id.toString()}
                renderItem={({ index, item }) => (
                    <TouchableOpacity style={[styles.card, styles.shadow, { marginTop: (index == 0 || index == 1) ? hp(1.1) : 0 }]} onPress={() => props.navigation.navigate('FotoEspecificaScreen', { id_foto: item.id, title: item.title, foto: item.url })}>
                        <TouchableOpacity style={styles.cardImageContainer} onPress={() => { animate(item.url) }}>
                            <Image source={{ uri: item.thumbnailUrl }} style={[styles.image, { width: wp(33), height: wp(33) }]} />
                        </TouchableOpacity>
                        <View style={styles.cardContent}>
                            <Text numberOfLines={2} style={styles.cardTitulo}>{item.title}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
            <Animated.View style={[styles.fullScreenAnimate, animationStyle(), { opacity: startValue }]}>
                <Entypo name="circle-with-cross"
                    color="#F28C0F"
                    size={wp(8)}
                    style={styles.animatedIcon}
                    onPress={() => desAnimate()}
                />
                <Image source={{ uri: selectedImage }} style={[styles.animatedImage, { width: wp(80), height: wp(80) }]} />
            </Animated.View>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#FFF7EE'
    },
    card: {
        flex: 1,
        width: wp(44),
        marginHorizontal: wp(2),
        minHeight: hp(5),
        borderRadius: 10,
        flexDirection: "column",
        padding: wp(2.5),
        marginBottom: hp(1.1),
        backgroundColor: "white",
        alignItems: "center"
    },
    cardImageContainer: {
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        height: wp(33),
        width: wp(33),

    },
    cardContent: {
        flexDirection: "row",
        paddingTop: hp(1)
    },
    cardTitulo: {
        textAlign: "center",
        flexWrap: 'wrap',
        fontSize: wp(4.4),
        color: "#F28C0F",
        fontWeight: 'bold'
    },
    image: {
        borderRadius: 10,
    },
    fullScreenAnimate: {
        justifyContent: "center",
        backgroundColor: "#FFF7EE",
        width: wp(100),
        height: hp(100),
        position: 'absolute',
        top: hp(100)
    },
    animatedIcon: {
        position: 'absolute',
        top: hp(15),
        right: wp(10),
        borderRadius: 10,
        overflow: 'hidden'
    },
    animatedImage: {
        alignSelf: 'center',
        borderRadius: 10,
        overflow: 'hidden'
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