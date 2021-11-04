import React from 'react';
import { StyleSheet } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { Albumes, Fotos, FotoEspecifica, UsuarioEspecifico, MapaUnico } from '../../screens';
import Icon from '@expo/vector-icons/Ionicons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const { Navigator, Screen } = createStackNavigator();

const AlbumStack = ({ navigation, props }) => {
    return (
        <Navigator >
            <Screen
                options={{
                    headerStyle: [styles.shadow, {
                        backgroundColor: '#F28C0F',
                        height: hp(10),
                        borderBottomWidth: 0
                    }],
                    headerTintColor: 'white',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        textAlign: "center" 
                    },
                    headerLeft: () => <Icon
                        style={{ paddingLeft: 10, color: "white" }}
                        onPress={() => navigation.openDrawer()}
                        name="md-menu"
                        size={wp(6.6)}
                    />,
                    title: "Albumes"
                }}
                name="AlbumesScreen" component={Albumes} />
            <Screen
                options={
                    ({ route }) => ({ 
                    title: route.params.title,
                    headerStyle: [styles.shadow, {
                        backgroundColor: '#F28C0F', 
                        height: hp(10),
                        borderBottomWidth: 0
                    }],
                    headerTintColor: 'white', 
                    headerTitleStyle: {
                        fontWeight: 'bold', 
                        textAlign: "center"
                    },
                    headerTitleContainerStyle: {
                        width: wp(44)
                    }
                })
                }
                name="FotosScreen"  component={Fotos} />
                <Screen
                options={
                    ({ route }) => ({ 
                    title: route.params.title,
                    headerStyle: [styles.shadow, {
                        backgroundColor: '#F28C0F',
                        height: hp(10),
                        borderBottomWidth: 0
                    }],
                    headerTintColor: 'white',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        textAlign: "center"
                    },
                    headerTitleContainerStyle: {
                        width: wp(44),
                    }
                })
                }
                name="FotoEspecificaScreen" component={FotoEspecifica} />
                <Screen options={
                ({ route }) => ({
                    title: "Datos",
                    headerStyle:
                        [styles.shadow, {
                            backgroundColor: '#F28C0F',
                            height: hp(10),
                            borderBottomWidth: 0
                        }],
                    headerTintColor: 'white',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        textAlign: "center"
                    },
                    headerTitleContainerStyle: {
                        width: wp(44),
                    }
                })
            }
                name="UsuarioEspecificoScreen" component={UsuarioEspecifico} />
                <Screen
                options={{
                    headerShown: false,
                    headerStyle: [{
                        shadowColor: 'transparent',
                        backgroundColor: '#F28C0F',
                        height: hp(10),
                        borderBottomWidth: 0
                    }],
                    headerTintColor: 'white',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        textAlign: "center"
                    },
                    headerLeft: () => <Icon
                        style={{ paddingLeft: 10, color: "white" }}
                        onPress={() => navigation.openDrawer()}
                        name="md-menu"
                        size={wp(6.6)}
                    />,
                    title: "Mapa"
                }}
                name="MapaUnicoScreen" component={MapaUnico} />
        </Navigator>
    )
}

const styles = StyleSheet.create({
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

export default AlbumStack;