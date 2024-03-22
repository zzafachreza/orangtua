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
import LinearGradient from 'react-native-linear-gradient';
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
      SoundPlayer.playSoundFile('alarm', 'mp3')
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

      axios.post(apiURL + 'get_token', {
        id: uu.id
      }).then(res => {

        getData('token').then(token => {
          console.log(token.token);
          // alert(token.token);

          if (token.token !== res.data) {
            console.log('update TOKEN');
            axios.post(apiURL + 'update_token', {
              id: uu.id,
              token: token.token
            }).then(resp => {
              console.log('token berhasil diperbaharui', resp.data)
            })
          } else {
            console.log('token terbaru')
          }
        })

      })


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

  const MyList = ({ label = 'Profile Kantor', img = require('../../assets/A1.png'), onPress }) => {
    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <LinearGradient colors={[colors.secondary, colors.secondary]} style={{
          flex: 1,
          marginHorizontal: 10,
          borderRadius: 10,
          backgroundColor: colors.primary,
          borderColor: colors.warning,
          borderWidth: 2,
          overflow: 'hidden'
        }}>
          <View style={{
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
          }}>
            <Image source={img} style={{
              width: '70%',
              height: 110,
              resizeMode: 'contain'
            }} />
          </View>
          <View style={{
            height: 40,
            backgroundColor: colors.tertiary,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Text style={{
              fontFamily: fonts.secondary[600],
              color: colors.white
            }}>{label}</Text>
          </View>
        </LinearGradient>
      </TouchableWithoutFeedback>
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
          padding: 10,
        }}
        >

          <Text style={{
            fontFamily: fonts.secondary[400],
            fontSize: DimensionThisPhone / 22,
            color: colors.white,
          }}>Selamat datang, {user.nama_lengkap}</Text>
          <Text style={{
            fontFamily: fonts.secondary[800],
            fontSize: DimensionThisPhone / 15,
            color: colors.white,
          }}>{MYAPP}</Text>
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
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center'
      }}>


        <View style={{
          flexDirection: 'row'
        }}>

          <MyList label='Profil Kantor' onPress={() => navigation.navigate('Satuan')} img={require('../../assets/A1.png')} />
          <MyList label='Notifkasi' onPress={() => navigation.navigate('Notifikasi')} img={require('../../assets/A2.png')} />
        </View>
        <View style={{
          marginTop: 10,
          flexDirection: 'row'
        }}>

          <MyList label='Lokasi' onPress={() => navigation.navigate('Lokasi')} img={require('../../assets/A3.png')} />
          <MyList label='Informasi' onPress={() => navigation.navigate('Informasi')} img={require('../../assets/A4.png')} />
        </View>




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