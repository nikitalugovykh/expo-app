import * as React from 'react';
import { Dimensions, Image, StyleSheet, View } from "react-native";
import { GestureHandlerRootView, PinchGestureHandler, PinchGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';


const  {width, height} = Dimensions.get('window')


export default function TabFiveScreen() {

    const scale = useSharedValue(1)

    const focalX = useSharedValue(0)
    const focalY = useSharedValue(0)


    const imageUri = 'https://images.unsplash.com/photo-1645461910507-cde8ec27ff91?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'


    const pinchHandler = useAnimatedGestureHandler<PinchGestureHandlerGestureEvent>({
        onActive: (ev) => {
            scale.value = ev.scale
            focalX.value = ev.focalX
            focalY.value = ev.focalY
        },
        onEnd: (ev) => {
            scale.value = withTiming(1)
        }
    })


    const AnimatedImage = Animated.createAnimatedComponent(Image)


    const rStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: focalX.value }, 
                { translateY: focalY.value },
                { translateY: -height / 2 },
                { translateX: -width / 2 },
                {scale: scale.value},
                { translateX: -focalX.value }, 
                { translateY: -focalY.value },
                { translateY: height / 2 },
                { translateX: width / 2 },
            ]
        }
    })

    const rFocalStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: focalX.value }, { translateY: focalY.value }]
        }
    })


    return (
        <GestureHandlerRootView style={styles.container}>

            <PinchGestureHandler onGestureEvent={pinchHandler}>
                <Animated.View style = {{flex: 1, width: '100%', height: '100%'}}>
                    <AnimatedImage source={{ uri: imageUri }} style={[styles.img, rStyle]} />
                    <Animated.View style={[styles.focalPoint, rFocalStyle]} />
                </Animated.View>
            </PinchGestureHandler>
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
        flex: 1,
        width: '100%',
        height: '100%'
    },
    focalPoint: {
        ...StyleSheet.absoluteFillObject,
        width: 20,
        height: 20,
        backgroundColor: 'red',
        opacity: .7,
        borderRadius: 10,
    }


});
