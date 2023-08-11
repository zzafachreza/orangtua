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
import { MyButton } from '../../components';

export default function Task({ navigation }) {

    const [data, setData] = useState([]);
    const isFocused = useIsFocused();
    useEffect(() => {

        if (isFocused) {
            getData('user').then(uu => {
                axios.post(apiURL + 'laporan', {
                    fid_user: uu.id
                }).then(res => {
                    console.log(res.data);
                    setData(res.data);
                })
            })
        }

    }, [isFocused])

    const __renderItem = ({ item }) => {
        return (
            <TouchableNativeFeedback onPress={() => navigation.navigate('TaskDetail', item)}>
                <View style={{
                    // flex: 1,
                    flexDirection: 'row',
                    marginBottom: 10,
                    position: 'relative',
                    borderColor: colors.white,
                    height: 130,
                    borderRadius: 10,
                    backgroundColor: item.status == 'OPEN' ? colors.danger : colors.success,
                    paddingLeft: 10,
                }}>

                    <View style={{
                        backgroundColor: colors.white,
                        flex: 1,
                        borderTopRightRadius: 10,
                        borderBottomRightRadius: 10,
                    }}>
                        <View style={{
                            // padding: 10,
                        }}>
                            <View style={{
                                padding: 10,
                            }}>
                                <Text style={{
                                    color: colors.black,
                                    fontSize: DimensionThisPhone / 15,
                                    fontFamily: fonts.secondary[800]
                                }}>{moment(item.tanggal).format('dddd, DD MMMM YYYY')}</Text>

                            </View>
                            <View style={{
                                borderWidth: 1,
                                borderColor: colors.border
                            }} />
                            <View style={{
                                padding: 10,
                            }}>
                                <View style={{
                                    flexDirection: 'row',

                                }}>
                                    <View style={{
                                        flex: 1,
                                    }}>
                                        <Text style={{
                                            color: colors.black,
                                            fontSize: DimensionThisPhone / 20,
                                            fontFamily: fonts.secondary[400]
                                        }}>Berangkat</Text>
                                        <Text style={{
                                            color: colors.black,
                                            fontSize: DimensionThisPhone / 20,
                                            fontFamily: fonts.secondary[800],
                                            color: colors.primary
                                        }}>{item.jam_awal}</Text>
                                    </View>


                                    <View style={{
                                        flex: 1,
                                    }}>
                                        <Text style={{
                                            color: colors.black,
                                            fontSize: DimensionThisPhone / 20,
                                            fontFamily: fonts.secondary[400]
                                        }}>Sampai</Text>
                                        <Text style={{
                                            color: colors.black,
                                            fontSize: DimensionThisPhone / 20,
                                            fontFamily: fonts.secondary[800],
                                            color: colors.primary
                                        }}>{item.jam_akhir}</Text>
                                    </View>



                                </View>
                                <View style={{
                                    flexDirection: 'row'
                                }}>
                                    <View style={{
                                        flex: 1,
                                    }}>
                                        <Text style={{
                                            color: colors.black,
                                            fontSize: DimensionThisPhone / 20,
                                            fontFamily: fonts.secondary[400]
                                        }}>Jarak</Text>
                                        <Text style={{
                                            color: colors.black,
                                            fontSize: DimensionThisPhone / 20,
                                            fontFamily: fonts.secondary[800],
                                            color: colors.primary
                                        }}>{item.jarak} Km</Text>
                                    </View>
                                    <View style={{
                                        flex: 1,
                                    }}>
                                        <Text style={{
                                            color: colors.black,
                                            fontSize: DimensionThisPhone / 20,
                                            fontFamily: fonts.secondary[400]
                                        }}>Waktu</Text>
                                        <Text style={{
                                            color: colors.black,
                                            fontSize: DimensionThisPhone / 20,
                                            fontFamily: fonts.secondary[800],
                                            color: colors.primary
                                        }}>{item.waktu} Menit</Text>
                                    </View>
                                </View>

                            </View>
                        </View>

                    </View>
                </View>
            </TouchableNativeFeedback>
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
                }}>Riwayat</Text>
            </ImageBackground>




            <View style={{
                paddingHorizontal: 20
            }}>
                <FlatList data={data} renderItem={__renderItem} />
            </View>


        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})