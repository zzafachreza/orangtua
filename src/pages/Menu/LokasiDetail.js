import { FlatList, Image, Linking, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { DimensionThisPhone, MyDimensi, colors, fonts, windowHeight, windowWidth } from '../../utils'
import { MyButton, MyGap, MyInput, MyPicker } from '../../components'
import axios from 'axios';
import { apiURL, webURL } from '../../utils/localStorage'
import { showMessage } from 'react-native-flash-message'
import RenderHtml from 'react-native-render-html';
import moment from 'moment'
import YoutubePlayer from "react-native-youtube-iframe";
import { WebView } from 'react-native-webview';
export default function LokasiDetail({ navigation, route }) {

    const item = route.params;
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white,
        }}>
            <WebView source={{ uri: `${webURL}home/map?lat=${item.latitude}&long=${item.longitude}` }} style={{ height: 300 }} />

            <View style={{
                marginHorizontal: 10,
                backgroundColor: colors.white,
                height: 200,
                borderRadius: 10,
                width: windowWidth - 30,
                alignSelf: 'center',
                position: 'absolute',
                bottom: 50,
                padding: 10,
            }}>
                <Text style={{
                    fontFamily: fonts.secondary[800],
                    color: colors.primary,
                    fontSize: DimensionThisPhone / 15
                }}>{item.nama_kantor}</Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})