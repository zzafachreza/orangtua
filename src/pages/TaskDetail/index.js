import { Alert, StyleSheet, Text, View, Image, FlatList, ActivityIndicator, Dimensions, ImageBackground, TouchableWithoutFeedback, TouchableNativeFeedback, Linking, BackHandler, TextInput } from 'react-native'
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
import { MyButton, MyInput } from '../../components';
import { WebView } from 'react-native-webview';
import GetLocation from 'react-native-get-location';
import { getDistance, convertDistance } from 'geolib';
export default function TaskDetail({ navigation, route }) {

    const [item, setItem] = useState(route.params);
    const waktu = (parseFloat(moment(item.tanggal + ' ' + item.jam_akhir).diff(moment(item.tanggal + ' ' + item.jam_awal), 'minutes')));
    const kecepatan = Math.round(item.jarak / (parseFloat(moment(item.tanggal + ' ' + item.jam_akhir).diff(moment(item.tanggal + ' ' + item.jam_awal), 'minutes')) / 60));

    const MyLabel = ({ label, value }) => {
        return (
            <View style={{
                flexDirection: 'row',
                marginBottom: 5,
            }}>
                <Text style={{
                    flex: 1,
                    color: colors.black,
                    fontSize: DimensionThisPhone / 20,
                    fontFamily: fonts.secondary[400]
                }}>{label}</Text>
                <Text style={{
                    marginHorizontal: 10,
                    color: colors.black,
                    fontSize: DimensionThisPhone / 20,
                    fontFamily: fonts.secondary[600]
                }}>:</Text>
                <Text style={{
                    flex: 1,
                    color: colors.black,
                    fontSize: DimensionThisPhone / 20,
                    fontFamily: fonts.secondary[800]
                }}>{value}</Text>

            </View>
        )
    }

    useEffect(() => {
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        })
            .then(location => {
                console.log(location);

                const ProsesJarak = getDistance(
                    { latitude: item.lat_awal, longitude: item.long_awal },
                    { latitude: location.latitude, longitude: location.longitude },

                    1,
                );

                setItem({
                    ...item,
                    waktu: waktu,
                    kecepatan: kecepatan,
                    jarak: ProsesJarak / 1000,
                    lat_akhir: location.latitude,
                    long_akhir: location.longitude,
                });



            });

    }, [])




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
                <TouchableNativeFeedback onPress={() => navigation.goBack()}>
                    <Icon type='ionicon' name='arrow-back-circle' size={DimensionThisPhone / 10} color={colors.white} />
                </TouchableNativeFeedback>
                <Text style={{
                    flex: 1,
                    textAlign: 'center',
                    color: colors.white,
                    fontSize: DimensionThisPhone / 14,
                    fontFamily: fonts.secondary[600]
                }}>Riwayat Detail</Text>
            </ImageBackground>

            <View style={{
                padding: 20
            }}>

                <MyLabel label="Tanggal" value={moment(item.tanggal).format('dddd, DD MMMM YYYY')} />
                <MyLabel label="Jam Berangkat" value={item.jam_awal} />
                <MyLabel label="Jam Sampai" value={item.status == 'OPEN' ? 'Belum Sampai' : item.jam_akhir + ' ( ' + waktu + ' Menit )'} />
                <MyLabel label="Kordinat Berangkat" value={item.lat_awal + ', ' + item.long_awal} />
                <MyLabel label="Kordinat Sampai" value={item.lat_akhir + ', ' + item.long_akhir} />
                <MyLabel label="Jarak" value={item.jarak + ' Meter'} />
                <MyLabel label="Kecepatan" value={Math.round(item.jarak / (parseFloat(moment(item.tanggal + ' ' + item.jam_akhir).diff(moment(item.tanggal + ' ' + item.jam_awal), 'minutes')) / 60)) + ' Km/jam'} />


            </View>
            <View style={{
                flex: 1,
                backgroundColor: colors.secondary,
                padding: 10,
            }}>
                <WebView source={{ uri: `https://orangtua.okeadmin.com/home/map?lat_awal=${item.lat_awal}&long_awal=${item.long_awal}&lat_akhir=${item.lat_akhir}&long_akhir=${item.long_akhir}` }} style={{ flex: 1 }} />
            </View>
            <MyButton title="SAMPAI" radius={0} onPress={() => {

                const SENDDATA = {
                    id_laporan: item.id_laporan,
                    lat_akhir: item.lat_akhir,
                    long_akhir: item.long_akhir,
                    waktu: waktu,
                    kecepatan: kecepatan,
                    jarak: item.jarak,

                }

                console.log(SENDDATA)

                axios.post(apiURL + 'laporan_update', SENDDATA).then(res => {
                    console.log(res.data);
                    // setItem(res.data);
                })
            }} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})