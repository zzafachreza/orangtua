import { ActivityIndicator, FlatList, Image, Linking, SafeAreaView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { DimensionThisPhone, colors, fonts, windowHeight, windowWidth } from '../../utils'
import { Icon } from 'react-native-elements';
import YoutubePlayer from "react-native-youtube-iframe";
import axios from 'axios';
import { apiURL, getData } from '../../utils/localStorage';
import moment from 'moment';
import { MyHeader, MyInput } from '../../components';
export default function ({ navigation, route }) {
    const item = route.params;
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);

    const getDataTransaksi = () => {
        setLoading(true);
        getData('user').then(uu => {
            axios.post(apiURL + 'notifikasi', {
                id: uu.id
            }).then(res => {
                console.log(res.data);
                setData(res.data);
                setTMP(res.data)
            }).finally(() => {
                setLoading(false)
            })
        })
    }

    useEffect(() => {
        getDataTransaksi();
    }, []);

    const __renderItem = ({ item }) => {
        return (




            <View style={{
                marginBottom: 10,
                backgroundColor: colors.white,
                width: '100%',
                position: 'relative',
                borderRadius: 10,
                overflow: 'hidden',
                padding: 10,
            }}>

                <Text style={{
                    fontFamily: fonts.secondary[800],
                    fontSize: DimensionThisPhone / 20
                }}>{item.judul}</Text>

                <Text style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: DimensionThisPhone / 22
                }}>{item.pesan}</Text>
                <Text style={{
                    textAlign: 'right',
                    fontFamily: fonts.secondary[400],
                    fontSize: DimensionThisPhone / 25
                }}>{item.tanggal} {item.jam}</Text>

            </View>




        )
    }

    const [key, setKey] = useState('');
    const [TMP, setTMP] = useState({});
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.border
        }}>

            <MyHeader judul="Notifikasi" onPress={() => navigation.goBack()} />



            {!loading &&
                <View style={{
                    flex: 1,
                    paddingHorizontal: 20,
                }}>
                    <View style={{
                        position: 'relative'
                    }}>
                        {key.length > 0 &&

                            <TouchableWithoutFeedback onPress={() => {
                                setKey(''); setData(TMP);
                            }}>
                                <View style={{
                                    position: 'absolute',
                                    zIndex: 99,
                                    top: 10,
                                    right: 10,
                                }}>
                                    <Icon type='ionicon' name='close' color={colors.secondary} />
                                </View>
                            </TouchableWithoutFeedback>}
                        <View style={{
                            position: 'absolute',
                            top: 10,
                            left: 10,
                        }}>
                            <Icon type='ionicon' name='search' color={colors.primary} />
                        </View>
                        <TextInput value={key} onChangeText={x => {
                            setKey(x);
                            if (x.length > 0) {
                                let TMPSrc = data.filter(i => i.judul.toLowerCase().indexOf(x.toLowerCase()) > -1);
                                if (TMPSrc.length > 0) {
                                    setData(TMPSrc);
                                }
                            } else {
                                setData(TMP);
                            }
                        }} placeholder='Pencarian . . .' style={{
                            height: 45,
                            borderWidth: 1,
                            marginBottom: 10,
                            borderRadius: 30,
                            paddingLeft: 40,
                            borderColor: colors.primary,
                            fontFamily: fonts.secondary[600],
                            fontSize: DimensionThisPhone / 22
                        }} />
                    </View>
                    <FlatList data={data} showsVerticalScrollIndicator={false} renderItem={__renderItem} />

                </View>
            }
            {loading &&
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <ActivityIndicator size="large" color={colors.primary} />

                </View>
            }



        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})