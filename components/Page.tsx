import React, { FC } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated';

type Props = {
    title: string,
    index: number,
    translateX: Animated.SharedValue<number>
}

const { height, width } = Dimensions.get('window')

const SIZE = width * .7

const Page: FC<Props> = ({ title, index, translateX }) => {

    const inputRange = [(index - 1) * width, index * width, (index + 1) * width]


    const rStyle = useAnimatedStyle(() => {


        const scale = interpolate(translateX.value,
            inputRange,
            [0, 1, 0],
            Extrapolate.CLAMP
        )

        const borderRadius = interpolate(translateX.value,
            inputRange,
            [180, 60, 90],
            Extrapolate.CLAMP
        )

        

        return {
            transform: [{ scale }],
            borderRadius
        }
    })

    const rTextStyle = useAnimatedStyle(() => {

        const translateY = interpolate(translateX.value, inputRange, [height / 2, 0, - height / 2])

        const opacity = interpolate(translateX.value, inputRange, [-2, 1 ,-2])


        return{
            transform: [{translateY}],
            opacity
        }
    })

    return (
        <View style={[styles.pageContainer, { backgroundColor: `rgba(0,0,236, 0.${index + 1})` }]}>

            <Animated.View style={[styles.square, rStyle]} />
            <Animated.View style = {[styles.textWrapper, rTextStyle]}>
                <Text style = {styles.text}>{title}</Text>
            </Animated.View>

        </View>
    )
}


const styles = StyleSheet.create({
    pageContainer: {
        height,
        width,
        justifyContent: 'center',
        alignItems: 'center',
    },
    square: {
        height: SIZE,
        width: SIZE,
        backgroundColor: 'rgba(0,0,256, 0.3)'
    },
    textWrapper: {
        position: 'absolute',
    },
    text: {
        fontSize: 50,
        color: "#ffffff",
        letterSpacing: 0.5
    }
})

export default Page;
