import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppColors from '@/constants/Colors';


interface LoadingProps {
    size?: "small" | "large";
    color?: string;
    text?: string;
    fullScreen?: boolean;
}
const Loading: React.FC<LoadingProps> = ({
    size = "large",
    color = AppColors.primary[500],
    text = "Loading...",
    fullScreen = false

}) => {
    if(fullScreen){
        return (
            <View style={styles.fullScreen}>
                <ActivityIndicator size={size} color={color} />
                {text && <Text style={styles.text}>{text}</Text>}
            </View>
        );
    }
  return (
     <View style={styles.container}>
                <ActivityIndicator size={size} color={color} />
                {text && <Text style={styles.text}>{text}</Text>}
            </View>
  )
}

export default Loading

const styles = StyleSheet.create({
    container: {
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  fullScreen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: AppColors.background.primary,
  },
  text: {
    marginTop: 8,
    fontSize: 14,
    color: AppColors.text.secondary,
  },

})