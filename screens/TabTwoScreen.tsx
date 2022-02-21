import { StyleSheet, View } from 'react-native';
import { GestureHandlerRootView, PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

type ContextType = {
  translateX: number,
  translateY: number,
}

const CIRCLE_RADIOUS = 150

const SIZE = 80

export default function TabTwoScreen() {

  const translateX = useSharedValue(0)
  const translateY = useSharedValue(0)

  const panGestureEventHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, ContextType>({
    onStart: (ev, context) => {
      context.translateX = translateX.value
      context.translateY = translateY.value
    },
    onActive: (ev, context) => {
      translateX.value = ev.translationX + context.translateX
      translateY.value = ev.translationY + context.translateY


    },
    onEnd: (ev) => {

      const distance = Math.sqrt(translateX.value ** 2 + translateY.value ** 2)

      if (distance < CIRCLE_RADIOUS + SIZE / 2) {
        translateX.value = withSpring(0)
        translateY.value = withSpring(0)

      }


    },
  })


  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }, { translateY: translateY.value }]
    }
  })

  return (
    <GestureHandlerRootView style={styles.container}>
      {/* <View style={styles.container}> */}
      <View style={styles.circle}>
        <PanGestureHandler onGestureEvent={panGestureEventHandler}>
          <Animated.View style={[styles.square, rStyle]} />
        </PanGestureHandler>

      </View>

      {/* </View>  */}

    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  square: {
    width: SIZE,
    height: SIZE,
    borderRadius: 20,
    backgroundColor: 'orangered',
    opacity: 0.9
  },
  circle: {
    borderRadius: 180,
    borderWidth: 2,
    borderColor: 'red',
    width: CIRCLE_RADIOUS * 2,
    height: CIRCLE_RADIOUS * 2,
    justifyContent: 'center',
    alignItems: 'center'
  }

});
