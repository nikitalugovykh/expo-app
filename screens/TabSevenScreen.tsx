import React, { useCallback, useRef } from 'react';
import { Dimensions, Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView, PanGestureHandler, PanGestureHandlerGestureEvent, TapGestureHandler } from 'react-native-gesture-handler';
import Animated, { interpolate, useAnimatedGestureHandler, useAnimatedStyle, useDerivedValue, useSharedValue, withDecay, withDelay, withSpring, withTiming } from 'react-native-reanimated';
import Page from '../components/Page';
import Page2, { PAGE_WIDTH } from '../components/Page2';



const { width: SIZE } = Dimensions.get('window')

const titles = ['lol', 'kek', 'cheburek', '?']

const MAX_TRANSLATE_x = - PAGE_WIDTH * (titles.length - 1)

type ContextType = {
    x: number
}

export default function TabSevenScreen() {

    const translateX = useSharedValue(0)

    const clampedTranslateX = useDerivedValue(()=> {


        return Math.max(Math.min(translateX.value, 0), MAX_TRANSLATE_x)

    }, [])

    


    const panGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, ContextType>({
        onStart: (ev, context) => {
            context.x = clampedTranslateX.value
        },
        onActive: (ev,context) => {
            console.log(ev.translationX);
            
            translateX.value = ev.translationX + context.x
            
        },
        onEnd: (ev) => {
            translateX.value = withDecay({velocity: ev.velocityX})
        }
    })

    return (
        <GestureHandlerRootView style={styles.container}>
            <PanGestureHandler onGestureEvent={panGestureEvent}>
                <Animated.View style = {{flex:1, flexDirection: 'row'}}>
                    {titles.map((item, index) => <Page2 key={index.toString()} title={item} index={index} translateX = {clampedTranslateX}/>)}

                </Animated.View>

            </PanGestureHandler>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
      
    },




});
