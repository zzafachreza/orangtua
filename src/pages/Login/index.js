import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Animated, Text, View, Image, Easing, ScrollView, ActivityIndicator, TouchableOpacity, BackHandler, Alert, Linking } from 'react-native';
import { fonts, windowWidth, colors, windowHeight, DimensionThisPhone } from '../../utils';
import { MyInput, MyGap, MyButton } from '../../components';
import axios from 'axios';
import { api_token, apiURL, MYAPP, storeData } from '../../utils/localStorage';
import { showMessage } from 'react-native-flash-message';


export default function Login({ navigation }) {

  const ImageAnimation = new Animated.Value(200);




  const [kirim, setKirim] = useState({
    api_token: api_token,
    username: null,
    password: null
  });
  const [loading, setLoading] = useState(false);


  useEffect(() => {


    Animated.timing(ImageAnimation, {
      toValue: DimensionThisPhone,
      duration: 1000,
      easing: Easing.linear
    }).start();
  }, [])

  const inputRef = useRef();


  const masuk = () => {


    if (kirim.username == null && kirim.password == null) {
      showMessage({
        message: 'Username and password cannot be empty !',
        type: 'danger'
      });
      console.log(inputRef.current)
    } else if (kirim.username == null) {
      showMessage({
        message: 'Username cannot be empty !',
        type: 'danger'
      });
    } else if (kirim.password == null) {
      showMessage({
        message: 'Password cannot be empty !',
        type: 'danger'
      });
    } else {


      setLoading(true);
      console.log(kirim);

      axios
        .post(apiURL + 'login', kirim)
        .then(res => {
          setLoading(false);
          console.log(res.data);
          if (res.data.status == 404) {
            showMessage({
              type: 'danger',
              message: res.data.message
            })
          } else {
            storeData('user', res.data.data);
            navigation.replace('MainApp')
          }

        });





    }




  }


  return (
    <>
      <ScrollView style={styles.container}>

        <View style={styles.top}>
          <Animated.Image
            source={require('../../assets/logo.png')}
            style={{
              width: ImageAnimation,
              height: ImageAnimation,
              resizeMode: 'contain',
              margin: 10,
            }}
          />
          <Text style={{
            fontFamily: fonts.secondary[600],
            fontSize: DimensionThisPhone / 15
          }}>{MYAPP}</Text>
        </View>

        <View style={styles.center}>
          <MyInput
            label="Username" onChangeText={val => setKirim({
              ...kirim,
              username: val
            })}
            iconname="at" placeholder="Enter your username" />
          <MyGap jarak={20} />
          <MyInput textColor={colors.primary} colorIcon={colors.primary}
            onChangeText={val => setKirim({
              ...kirim,
              password: val
            })}
            secureTextEntry={true}
            label="Password"
            iconname="lock-closed"
            placeholder="Enter your password"
          />

          <MyGap jarak={20} />
          {!loading &&


            <>
              <MyButton
                onPress={masuk}
                title="Log in"
                warna={colors.primary}
                Icons="log-in-outline"
              />

              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={{
                  marginTop: 30,
                  textAlign: 'center',
                  fontFamily: fonts.secondary[400],
                  fontSize: DimensionThisPhone / 22
                }}>Belum memiliki akun ? <Text style={{
                  fontFamily: fonts.secondary[800],
                  color: colors.primary,
                }}>Daftar disini</Text></Text>
              </TouchableOpacity>
            </>

          }

        </View>
        {loading && <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <ActivityIndicator color={colors.primary} size="large" />
        </View>}
      </ScrollView>


    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    position: 'relative'
  },
  top: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },

  center: {
    padding: 20,
    flex: 1,
  }

});
