import { Alert, StyleSheet, Text, View, Image, FlatList, ActivityIndicator, Dimensions, ImageBackground, TouchableWithoutFeedback, TouchableNativeFeedback, Linking, BackHandler, Animated, Easing } from 'react-native'
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
import PushNotification, { Importance } from 'react-native-push-notification';
import GetLocation from 'react-native-get-location';
import { getDistance, convertDistance } from 'geolib';
import { showMessage } from 'react-native-flash-message';

import SoundPlayer from 'react-native-sound-player'
export default function Home({ navigation, route }) {





  const ImageAnimation = new Animated.Value(10)
  const TextAnimation = new Animated.Value(10);
  const [kirim, setKirim] = useState({})

  const [user, setUser] = useState({
    nama_lengkap: 'Guest'
  });


  const PlaySuara = () => {
    try {
      // play the file tone.mp3
      SoundPlayer.playSoundFile('telolet', 'mp3')
      // or play from url

    } catch (e) {
      console.log(`cannot play the sound file`, e)
    }
  }

  useEffect(() => {



    Animated.timing(ImageAnimation, {
      toValue: 0,
      duration: 1000,
    }).start();
    Animated.timing(TextAnimation, {
      toValue: 0,
      duration: 1000,
    }).start();

    getData('user').then(uu => {
      setUser(uu);

      GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 15000,
      })
        .then(location => {
          console.log(location);
          console.log('kirim', {
            fid_user: uu.id,
            lat_awal: location.latitude,
            long_awal: location.longitude,
          })


          setKirim({
            ...kirim,
            fid_user: uu.id,
            lat_awal: location.latitude,
            long_awal: location.longitude,
          });

          // const ProsesJarak = getDistance(
          //   { latitude: res.user_latitude, longitude: res.user_longitude },
          //   { latitude: location.latitude, longitude: location.longitude },

          //   1,
          // );
          // console.log('jarak',ProsesJarak)


        })
        .catch(error => {

          const { code, message } = error;
          console.warn(code, message);
        });
    })


    const unsubscribe = messaging().onMessage(async remoteMessage => {

      const json = JSON.stringify(remoteMessage.notification);
      const obj = JSON.parse(json);

      console.log('remote message', remoteMessage);

      // alert(obj.notification.title)
      PlaySuara();
      PushNotification.localNotification({
        /* Android Only Properties */
        channelId: 'teloletID', // (required) channelId, if the channel doesn't exist, notification will not trigger.
        title: obj.title, // (optional)
        message: obj.body, // (required)
      });
    });

    return unsubscribe;


  }, [])

  const MenuDailyReport = ({ image, label, value }) => {
    return (
      <TouchableNativeFeedback>

        <View style={{
          flex: 1,
          marginHorizontal: 10,
          padding: 10,
          borderWidth: 1,
          borderColor: colors.border_primary,
          backgroundColor: colors.white,
          borderRadius: 10,
        }}>


          <View style={{
            flexDirection: 'row',
            marginBottom: 10,
          }}>
            <View style={{
              flex: 1,
            }}>
              <Animated.Image source={image} style={{
                width: 50,
                height: 50,
                transform: [
                  { translateX: ImageAnimation }
                ]

              }} />

            </View>
            <Text style={{
              fontFamily: fonts.secondary[800],
              fontSize: DimensionThisPhone / 12
            }}>{value}</Text>
          </View>
          <Animated.Text style={{
            marginTop: 10,
            bottom: TextAnimation,
            fontFamily: fonts.secondary[600],
            fontSize: DimensionThisPhone / 14
          }}>{label}</Animated.Text>
        </View>
      </TouchableNativeFeedback>
    )
  }

  const MyList = ({ label, value }) => {
    return (
      <View
        style={{
          // marginVertical: 1,

          flexDirection: 'row',
          alignItems: 'center'
        }}>
        <Text
          style={{
            flex: 0.2,
            fontFamily: fonts.primary[400],
            color: colors.white,
          }}>
          {label}
        </Text>
        <Text
          style={{
            marginHorizontal: 5,
            fontFamily: fonts.primary[400],
            color: colors.white,
          }}>:</Text>
        <Text
          style={{
            flex: 1,
            fontFamily: fonts.primary[600],
            color: colors.white,
          }}>

          {value}
        </Text>
      </View>
    )
  }


  return (



    <SafeAreaView style={styles.container}>
      {/* header */}
      <View style={{
        backgroundColor: colors.primary,
        padding: 10,
        borderBottomRightRadius: 50,
        flexDirection: 'row'
      }}>
        <View style={{
          flex: 1,
        }}>
          <MyList label="Nama" value={user.nama_lengkap} />
          <MyList label="Alamat" value={user.alamat} />
          <TouchableOpacity onPress={() => {
            Linking.openURL('https://www.google.com/maps/place/' + user.alamat)
          }}>
            <Image source={require('../../assets/map.png')} style={{
              width: 200,
              height: 100,
              borderRadius: 10,
            }}

            />
          </TouchableOpacity>
          <MyList label="Usia" value={user.usia + ' Tahun'} />

          <MyList label="No. Ortu" value={user.ortu} />
        </View>

        <TouchableOpacity onPress={() => {
          // navigation.navigate('Account')
          PlaySuara();
          PushNotification.localNotification({
            /* Android Only Properties */
            channelId: 'teloletID', // (required) channelId, if the channel doesn't exist, notification will not trigger.
            title: 'Telolet', // (optional)
            message: 'Ayo Segera berangkat !', // (required)
          });
          PlaySuara()
        }} style={{
          position: 'relative',
          flex: 1,
          backgroundColor: colors.primary,
          marginRight: 10,
          borderRadius: 25,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Image source={require('../../assets/logo.png')} style={{
            width: 50,
            height: 50,
            resizeMode: 'contain'
          }} />
        </TouchableOpacity>
      </View>


      <View style={{
        marginTop: 10,
        // padding: 10,
      }}>
        <MyCarouser />
      </View>

      {/* CARD BANNER */}




      {/* MAIN BODY */}
      <View style={{
        flex: 1,
        padding: 10,
        justifyContent: 'center'
      }}>
        <Text style={{
          fontFamily: fonts.secondary[600],
          fontSize: DimensionThisPhone / 14,
          marginHorizontal: 20,
          marginTop: 0,
        }}>{moment().format('dddd, DD MMMM YYYY')}</Text>
        <Text style={{
          fontFamily: fonts.secondary[800],
          fontSize: DimensionThisPhone / 8,
          marginHorizontal: 20,
          color: colors.tertiary
        }}>{moment().format('HH:mm:ss')}</Text>


        <TouchableOpacity onPress={() => {
          Alert.alert(MYAPP, 'Apakah kamu sudah siap untuk berangkat ?', [
            { text: 'TIDAK' },
            {
              text: 'SIAP BERANGKAT',
              onPress: () => {
                axios.post(apiURL + 'laporan_add', kirim).then(es => {
                  console.log(es.data);
                  showMessage({
                    type: 'success',
                    message: 'Selamat kamu sudah berangkat !'
                  })

                })
              }

            }
          ])
        }} style={{
          padding: 10,
          marginTop: 20,
          backgroundColor: colors.primary,
          marginHorizontal: 20,
          borderRadius: 10,

        }}>
          <Text style={{
            textAlign: 'center',
            fontFamily: fonts.secondary[800],
            fontSize: DimensionThisPhone / 8,
            marginHorizontal: 20,
            color: colors.white
          }}>BERANGKAT</Text>
        </TouchableOpacity>





      </View>

    </SafeAreaView >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  }
})