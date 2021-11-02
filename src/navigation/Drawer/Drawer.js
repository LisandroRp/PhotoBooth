import React from 'react';
import { View, Text, StyleSheet, Image, Animated } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import AlbumStack from '../Stacks/AlbumStack'
import FotosStack from '../Stacks/FotosStack'
import UsuariosStack from '../Stacks/UsuariosStack'
import DrawerContent from './DrawerContent';
import { FontAwesome5, Fontisto, MaterialCommunityIcons } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Title } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { Navigator, Screen } = createDrawerNavigator();

const Drawer = props => {
    return (
        <Navigator initialRouteName="Home"
            screenOptions={{
                drawerStyle: {
                    backgroundColor: '#F28C0F',
                    width: wp(70)
                },
            }}
            drawerContent={props => <DrawerContent {...props} />}>
            <Screen options={{
                drawerInactiveTintColor: "white",
                drawerActiveTintColor: "#A7370F",
                headerShown: false,
                /*drawerIcon: ({ color }) => (<Fontisto name="photograph" type="font-awesome" size={24} color={color} />),*/
                title: ({ color }) => (
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Icon style={{ flex: 0.15 }} name="book-open-page-variant" type="font-awesome" size={24} color={color} />
                        <Text style={{ color: color, flex: 0.75, paddingLeft: wp(2) }}>Albumes</Text>
                    </View>
                )
            }} name="AlbumesStack" component={AlbumStack}
            />

            <Screen options={{
                drawerInactiveTintColor: "white",
                drawerActiveTintColor: "#A7370F",
                headerShown: false,
                /* drawerIcon: ({ color }) => (<Fontisto name="photograph" type="font-awesome" size={24} color={color}/>), */
                title: ({ color }) => (
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Fontisto style={{ flex: 0.15 }} name="photograph" type="font-awesome" size={24} color={color} />
                        <Text style={{ color: color, flex: 0.75, paddingLeft: wp(2) }}>Fotos</Text>
                    </View>
                )
            }}
                name="AllFotosStack" component={FotosStack}
            />

            <Screen options={{
                drawerInactiveTintColor: "white",
                drawerActiveTintColor: "#A7370F",
                headerShown: false,
                /* drawerIcon: ({ color }) => (<Fontisto name="photograph" type="font-awesome" size={24} color={color}/>), */
                title: ({ color }) => (
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <FontAwesome5 style={{ flex: 0.15 }} name="users" type="font-awesome" size={24} color={color} />
                        <Text style={{ color: color, flex: 0.75, paddingLeft: wp(2) }}>Usuarios</Text>
                    </View>
                )
            }}
                name="UsuariosStack" component={UsuariosStack} />
        </Navigator>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    name: {
        fontSize: 20,
        paddingLeft: 10,
        paddingTop: 5,
        color: 'white',
        textAlign: 'left',
    },
    profile: {
        height: hp(18),
        paddingTop: hp(1)
    },
    profileImageContainer: {
        flex: 1,
        marginTop: hp(4),
        paddingHorizontal: wp(5)
    },
    profileImage: {
        flex: 1,
        width: "100%",
        resizeMode: 'contain'
    },
    bgImage: {
        position: 'absolute',
        height: hp(18),
        width: '100%',
        justifyContent: 'center',
        opacity: 0.7
    },
    imgView: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    img: {
        height: 80,
        width: 80,
        borderRadius: 50,
    },
    profileText: {
        flex: 3,
        paddingLeft: 10,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    drawerIcon: {
        paddingLeft: 0,
        paddingRight: 0,
        marginLeft: wp(0),
        marginHorizontal: 0,
        borderLeftWidth: 0,
        marginRight: wp(5.5),
        flex: 1,
        alignContent: "center",
        alignItems: "center"
    },
    drawerLabel: {
        flex: 1,
        paddingLeft: 0,
        marginLeft: 0,
        fontSize: wp(3.5)
    }
});
export default Drawer;