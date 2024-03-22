import React, { useRef, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Modal } from 'react-native';
import { DimensionThisPhone, MyDimensi, colors, fonts, windowWidth } from '../../utils';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import { getData } from '../../utils/localStorage';
export default function MyHeader({ onPress, judul }) {

  return (


    <View style={{
      flexDirection: 'row',
      backgroundColor: colors.primary,
      padding: 5,
      height: 60,
      marginBottom: 10,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      alignItems: 'center',
      borderBottomWidth: 0,
      borderBottomColor: colors.border,
    }}>
      <TouchableOpacity onPress={onPress} style={{
        padding: 5,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: colors.border,
      }}>
        <Icon type='ionicon' name='chevron-back-outline' size={DimensionThisPhone / 20} color={colors.white} />
      </TouchableOpacity>
      <Text style={{
        flex: 1,
        left: -16,
        textAlign: 'center',
        fontFamily: fonts.primary[600],
        fontSize: DimensionThisPhone / 22,
        color: colors.white
      }}>{judul}</Text>
    </View>

  );
}

const styles = StyleSheet.create({});
