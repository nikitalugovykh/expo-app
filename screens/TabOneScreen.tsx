import { useEffect } from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

import Animated, { useSharedValue, useAnimatedStyle, withTiming, withSpring, withRepeat } from 'react-native-reanimated';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {


  const progress = useSharedValue(1)
  const scale = useSharedValue(2)

  const handleRatoation = (progress: Animated.SharedValue<number>) => {
    'worklet'
    return `${progress.value * 2 * Math.PI}rad`
  }


  const reanimatedStyle = useAnimatedStyle(()=> {
    return  {
      opacity: progress.value,
      transform: [{scale: scale.value}, {rotate: handleRatoation(progress)}],
      borderRadius: (progress.value * 100) / 2
    }
  }, [])

  // useEffect(()=> {
  //   progress.value = withRepeat(withSpring(0.5), -1, true)
  //   scale.value = withRepeat(withSpring(1), -1, true)
  // }, [])

  return (
    <View style={styles.container}>
      <Animated.View 
        style = {[{height: 100, width: 100, backgroundColor: 'green'}, reanimatedStyle]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
