import React, { useCallback, useRef } from 'react';
import { Dimensions, Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView, TapGestureHandler } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withSpring, withTiming } from 'react-native-reanimated';



const { width: SIZE } = Dimensions.get('window')


const imageUri = 'https://images.unsplash.com/photo-1640622308205-8ad9478c2386?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'

export default function TabSixScreen() {

    const scale = useSharedValue(0)

    const opacity = useSharedValue(1)

    const doubleTapRef = useRef(null)


    const rHeartStyle = useAnimatedStyle(() => {
     return {
        transform: [{scale: Math.max(scale.value, 0)}]
     }   
    })
    const rOpacityStyle = useAnimatedStyle(() => {
     return {
        opacity: opacity.value
     }   
    })

    const AnimatedImage = Animated.createAnimatedComponent(Image)


    const onDoubleTap = useCallback(() => {
        scale.value = withSpring(1, undefined, (isFinished) => isFinished ? scale.value = withDelay(300, withSpring(0)) : null)
    }, [])
    const onSingleTap = useCallback(() => {
        opacity.value = withSpring(0, undefined, (isFinished) => isFinished ? opacity.value = withSpring(1) : null)
    }, [])

    return (
        <GestureHandlerRootView style={styles.container}>
            <TapGestureHandler
                waitFor={doubleTapRef}
                onActivated={onSingleTap}
            >
                <TapGestureHandler
                    maxDurationMs={250}
                    numberOfTaps={2}
                    ref={doubleTapRef}
                    onActivated={onDoubleTap}>
                    <Animated.View>
                        <ImageBackground source={{ uri: imageUri }} style={styles.img} resizeMode={'cover'} >
                            <AnimatedImage source={require('./../assets/Heart.png')} style={[styles.heart, rHeartStyle]} resizeMode={'center'} />
                        </ImageBackground>
                        <Animated.Text style = {[styles.text, rOpacityStyle]}>some text</Animated.Text>
                    </Animated.View>

                </TapGestureHandler>
            </TapGestureHandler>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    img: {
        width: SIZE,
        height: SIZE,
        justifyContent: 'center',
        alignItems: 'center',
    },
    heart: {
        width: 150,
        height: 150,
        shadowOffset: {
            width: 0,
            height: 8
        },
        shadowOpacity: 0.35,
        shadowRadius: 3
    },
    text: {
        textAlign: 'center',
        fontSize: 25,
        color: '#000',
        textTransform: 'uppercase',
    }



});
