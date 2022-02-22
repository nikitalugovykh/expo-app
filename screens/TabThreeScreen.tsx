import { StyleSheet, View } from 'react-native';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import Page from '../components/Page';

const WORDS = ['LOL', 'KEK', 'CHEBUREK']

export default function TabThreeScreen() {

  const translateX = useSharedValue(0)

  const scrollHandler = useAnimatedScrollHandler((ev) => {
    translateX.value = ev.contentOffset.x
  })

  return (

    <Animated.ScrollView
      disableIntervalMomentum
      style={styles.container}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator = {false}
      onScroll={scrollHandler}
      scrollEventThrottle={16}

    >
      {WORDS.map((item, index) => {
        return (
          <Page
            key={index.toString()}
            title={item}
            index={index}
            translateX={translateX}
          />
        )
      })
      }

    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,

  },


});
