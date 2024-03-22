import { ActivityIndicator, FlatList, Image, Linking, SafeAreaView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { DimensionThisPhone, colors, fonts, windowHeight, windowWidth } from '../../utils'
import { Icon } from 'react-native-elements';
import axios from 'axios';
import { apiURL } from '../../utils/localStorage';
import moment from 'moment';
import { MyHeader, MyInput } from '../../components';
export default function ({ navigation, route }) {
    const item = route.params;
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);

    const getDataTransaksi = () => {
        setLoading(true);
        axios.post(apiURL + 'satuan').then(res => {
            console.log(res.data);
            setData(res.data);
            setTMP(res.data)
        }).finally(() => {
            setLoading(false)
        })
    }

    useEffect(() => {
        getDataTransaksi();
    }, []);

    const __renderItem = ({ item }) => {
        return (



            <TouchableWithoutFeedback onPress={() => {
                navigation.navigate('LokasiDetail', item)
            }}>
                <View style={{
                    backgroundColor: colors.white,
                    padding: 10,
                    height: 100,
                    marginBottom: 20,
                    width: '100%',
                    alignItems: 'center',
                    flexDirection: 'row'
                }}>
                    <Text style={{
                        flex: 1,
                        fontFamily: fonts.secondary[600],
                        color: colors.primary,
                        fontSize: DimensionThisPhone / 15
                    }}>{item.nama_kantor}</Text>
                    <View style={{
                        padding: 10,
                    }}>
                        <Icon type='ionicon' name='location' size={30} color={colors.secondary} />
                    </View>


                </View>
            </TouchableWithoutFeedback>



        )
    }

    const [key, setKey] = useState('');
    const [TMP, setTMP] = useState({});
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.border
        }}>

            <MyHeader judul="Lokasi" onPress={() => navigation.goBack()} />



            {!loading &&
                <View style={{
                    flex: 1,
                    paddingHorizontal: 20,
                }}>

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