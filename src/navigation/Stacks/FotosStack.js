import React from 'react';
import { StyleSheet } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { UsuarioEspecifico, FotoEspecifica, AllFotos, MapaUnico} from '../../screens';
import Icon from '@expo/vector-icons/Ionicons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const { Navigator, Screen } = createStackNavigator();

const FotosStack =  ({ navigation, props }) => {
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
                        textAlign: "left",
                        fontSize: wp(4.4),
                        paddingLeft: wp(10)
                    },
                    headerLeft: () => <Icon
                        style={{ paddingLeft: wp(3), color: "white" }}
                        onPress={() => navigation.openDrawer()}
                        name="md-menu"
                        size={wp(6.6)}
                    />,
                    title: "Fotos"
                }}
                name="AllFotosScreen" component={AllFotos} />
            <Screen options={
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
                        textAlign: "left",
                        fontSize: wp(4.4),
                        paddingLeft: wp(10)
                    },
                    headerTitleContainerStyle: {
                        width: wp(44)
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
                        textAlign: "left",
                        fontSize: wp(4.4),
                        paddingLeft: wp(10)
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
export default FotosStack;