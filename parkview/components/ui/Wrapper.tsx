import { Platform, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AppColors from '@/constants/Colors'

const Wrapper = ({children} : {children: React.ReactNode}) => {
  return (
   <SafeAreaView style={styles.safeView}>
    <View style={styles.container}>
        {children}
    </View>
   </SafeAreaView>
  )
}

export default Wrapper

const styles = StyleSheet.create({
    safeView: {
        flex: 1,
        backgroundColor: AppColors.background.primary,
        margin: Platform.OS === "android" ? 30 : 0,
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 10,
    }

});