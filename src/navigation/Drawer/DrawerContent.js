import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { Albumes, Fotos } from '../../screens';
import axios from 'axios';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem,
    DrawerItemList
} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Feather, Fontisto, MaterialCommunityIcons } from '@expo/vector-icons';


import { ThemeContext } from '../../components/ThemeContext';

function DrawerContent({ id, ...props }) {
    const navigation = useNavigation();
    const paperTheme = useTheme();

    const { toggleTheme } = React.useContext(ThemeContext);


    const image = { uri: "https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png" };
    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <Drawer.Section>
                        <View style={styles.userInfoSection}>
                            <View style={{ justifyContent: "center", alignItems: "center", flexWrap: "wrap" }}>
                                <Avatar.Image
                                    source={image}
                                    size={50}
                                />
                                <View style={styles.titleContainer}>
                                    <Title style={styles.title}>Lisandro Rodriguez Prados</Title>
                                </View>
                            </View>
                        </View>
                    </Drawer.Section>
                    <Drawer.Section>
                        <DrawerItemList {...props} />
                    </Drawer.Section>
                    <Drawer.Section>
                        <TouchableRipple onPress={() => { toggleTheme() }}>
                            <View style={styles.preference}>
                                <Text style={styles.modoOscuroText}>Modo Oscuro</Text>
                                <Feather
                                    style={styles.icon}
                                    name="sun"
                                    color={paperTheme.dark ? "transparent" : "white"}
                                    size={22}
                                />

                                <View pointerEvents="none" style={{ marginTop: 3 }} >
                                    <Switch value={paperTheme.dark} />
                                </View>
                                <Feather
                                    style={styles.icon}
                                    name="moon"
                                    color={paperTheme.dark ? "white" : "transparent"}
                                    size={22}
                                />
                            </View>
                        </TouchableRipple>
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
        </View>
    );
}
export default DrawerContent;

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1
    },
    userInfoSection: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: hp(1)
    },
    titleContainer: {
        alignItems: 'center',
        paddingHorizontal: wp(5)
    },
    title: {
        fontSize: wp(4),
        marginTop: 3,
        fontWeight: 'bold',
        flexWrap: 'wrap',
        color: 'white',
        textAlign: "center"
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
    },
    modoOscuroText: {
        marginTop: 3,
        backgroundColor: "white",
        fontWeight: "bold",
        alignSelf: "center",
        backgroundColor: "transparent",
        color: "white",
        marginRight: wp(5)
    },
    preference: {
        flexDirection: 'row',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    icon: {
        marginTop: 3,
        alignSelf: "center",
        marginHorizontal: wp(2)
    }
});