import { useState } from 'react';
import { Dimensions, StyleSheet, Switch, Text } from 'react-native';
import Animated, { interpolateColor, useAnimatedStyle, useDerivedValue,  withTiming } from 'react-native-reanimated';



const Colors = {
  dark: {
    background: '#1e1e1e',
    circle: '#252525',
    text: '#f8f8f8'
  },
  light: {
    background: '#f8f8f8',
    circle: '#fff',
    text: '#1e1e1e'
  }
}

const SWITCH_TRACK_COLOR = {
  true: 'rgba(256,0,256,.2)',
  false: 'rgba(0,0, 0,.1)'
}

type Theme = 'light' | 'dark'

const { width, height } = Dimensions.get('window')

const SIZE = width / 2


export default function TabFourScreen() {

  const [theme, setTheme] = useState<Theme>('light')


  const progress = useDerivedValue(() => {

    return theme === 'dark' ? withTiming(1) : withTiming(0)
  }, [theme])

  const rStyle = useAnimatedStyle(() => {

    const backgroundColor = interpolateColor(progress.value,
      [0, 1],
      [
        Colors.light.background,
        Colors.dark.background
      ]
    )

    return {
      backgroundColor
    }
  })

  const rCircleStyle = useAnimatedStyle(() => {

    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [
        Colors.light.circle,
        Colors.dark.circle
      ])

    return {
      backgroundColor
    }
  })

  const rTextStyle = useAnimatedStyle(() => {

    const color = interpolateColor(
      progress.value,
      [0, 1],
      [
        Colors.light.text,
        Colors.dark.text
      ])

    return {
      color
    }
  })

  return (
    <Animated.View style={[styles.container, rStyle]}>
      <Animated.Text style = {[styles.text, rTextStyle]}>Theme</Animated.Text>
      <Animated.View style={[styles.circle, rCircleStyle]}>
        <Switch
          value={theme === 'dark'}
          onValueChange={(toggled) => {
            setTheme(toggled ? 'dark' : 'light')
          }}
          trackColor={SWITCH_TRACK_COLOR}
          thumbColor={'violet'}
        />

      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: SIZE,
    height: SIZE,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 180,
    shadowOffset: {
      width: 10,
      height: 10
    },
    shadowOpacity: 0.5,
    shadowRadius:15,
    elevation: 10
  },
  text: {
    fontSize: 70,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 12,
    marginBottom: 50
  }

});
