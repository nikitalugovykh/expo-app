import React, { FC } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated';

type Props = {
    title: string,
    index: number,
    translateX: Animated.SharedValue<number>
}

const { height, width: PAGE_WIDTH } = Dimensions.get('window')



const Page2: FC<Props> = ({ title, index, translateX }) => {


    const pageOffset = PAGE_WIDTH * index

    const rStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateX.value + pageOffset }]
        }
    })

    const rTextWrapperStyle = useAnimatedStyle(() => {

        const translateInterpolateY = interpolate(translateX.value, 
            [(index - 1)* PAGE_WIDTH, index * PAGE_WIDTH, (index + 1) * PAGE_WIDTH],
            [height, 0, height] ,
            )



        return {
            transform: [{translateY:translateInterpolateY}]
        }
    })


    return (
        <Animated.View style={[styles.pageContainer, { backgroundColor: `rgba(0,0,236, 0.${index + 1})` }, rStyle]}>

            <Animated.View style = {rTextWrapperStyle}>
                <Text style={styles.text}>{title}</Text>

            </Animated.View>

        </Animated.View>
    )
}


const styles = StyleSheet.create({
    pageContainer: {
        ...StyleSheet.absoluteFillObject,
        // height,
        width: PAGE_WIDTH,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 45,
        color: '#FFF',
        letterSpacing: 3,
        textTransform: 'uppercase'
    }


})

export { PAGE_WIDTH }

export default Page2;
