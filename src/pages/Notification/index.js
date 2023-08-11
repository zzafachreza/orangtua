import { Alert, StyleSheet, Text, View, Image, FlatList, ActivityIndicator, Dimensions, ImageBackground, TouchableWithoutFeedback, TouchableNativeFeedback, Linking, BackHandler } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, MYAPP, storeData } from '../../utils/localStorage';
import { DimensionThisPhone, colors, fonts, windowHeight, windowWidth } from '../../utils';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import 'intl';
import 'intl/locale-data/jsonp/en';
import moment from 'moment';
import 'moment/locale/id';
import MyCarouser from '../../components/MyCarouser';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';

export default function Notification() {


    const MenuNotification = ({ title, subtile }) => {
        return (
            <View style={{
                flexDirection: 'row',
                marginBottom: 10,
                position: 'relative',
                borderWidth: 1,
                padding: 10,
                backgroundColor: colors.white,
                borderRadius: 10,
                borderColor: colors.primary,
                flexDirection: 'row'
            }}>
                <View style={{
                    width: 20,
                    height: 20,
                    borderRadius: 10,
                    backgroundColor: colors.primary,
                    position: 'absolute',
                    top: -5,
                    left: -5,


                }} />
                <View style={{
                    flex: 1,
                }}>
                    <Text style={{
                        color: colors.black,
                        fontSize: DimensionThisPhone / 14,
                        fontFamily: fonts.secondary[600]
                    }}>New Workeder</Text>
                    <Text style={{
                        color: colors.black,
                        fontSize: DimensionThisPhone / 23,
                        fontFamily: fonts.secondary[400]
                    }}>Cleaning HE check</Text>
                </View>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',

                }}>
                    <Icon type='ionicon' name='ellipsis-horizontal' color={colors.primary} />
                </View>
            </View>
        )
    }


    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.border
        }}>
            <ImageBackground source={require('../../assets/card.png')} style={{
                margin: 20,
                backgroundColor: colors.primary,
                height: 50,
                borderRadius: 10,
                flexDirection: 'row',
                alignItems: 'center',
                padding: 10,
            }}>
                <Icon type='ionicon' name='arrow-back-circle' size={DimensionThisPhone / 10} color={colors.white} />
                <Text style={{
                    flex: 1,
                    textAlign: 'center',
                    color: colors.white,
                    fontSize: DimensionThisPhone / 14,
                    fontFamily: fonts.secondary[600]
                }}>Your Notification</Text>
            </ImageBackground>

            <View style={{
                flex: 1,
                padding: 20
            }}>
                <MenuNotification />
                <MenuNotification />
                <MenuNotification />
                <MenuNotification />
                <MenuNotification />
                <MenuNotification />
                <MenuNotification />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})