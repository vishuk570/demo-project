import React, { useRef, useState } from 'react';
import { View, Text, FlatList, Dimensions, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AppLogo from '../../components/AppLogo';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import color from '../../constants/theme';

const { width } = Dimensions.get('window');

const slides = [
  { id: '1', title: 'Stone Processing System', description: 'Efficiently manage stone processing in multiple stages.' },
  { id: '2', title: 'Quality Control & Testing', description: 'Ensure quality and purity through rigorous testing.' },
  { id: '3', title: 'Cutting & Shaping', description: 'Precision cutting and shaping for various applications.' },
];

const IntroScreen = () => {
  const navigation = useNavigation();
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      navigation.navigate('Login');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      <AppLogo style={styles.img} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={slides}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        ref={flatListRef}
      />
      <View style={styles.dotContainer}>
        {slides.map((_, index) => (
          <View key={index} style={[styles.dot, currentIndex === index && styles.activeDot]} />
        ))}
      </View>
      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.buttonText}>{currentIndex === slides.length - 1 ? 'LOGIN' : 'NEXT'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#EFF2F7' },
  slide: { width, alignItems: 'center', justifyContent: 'center', padding: 0 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#15406B' },
  description: { fontSize: 16, textAlign: 'center', color: '#484F56', marginTop: 10 },
  nextButton: { position: 'absolute', bottom: 50, right: 20, padding: 15, backgroundColor: color.PrimaryBlue, borderRadius: 10 },
  buttonText: { color: '#FFF', fontSize: 16 },
  dotContainer: { flexDirection: 'row', position: 'absolute', bottom: 100, alignSelf: 'center' },
  dot: { height: 10, width: 10, borderRadius: 5, backgroundColor: '#C4C4C4', margin: 5 },
  activeDot: { backgroundColor: '#185DA5' },
  img: {
          height: '60%',
          width: '100%',
          alignSelf: 'center'
},
});

export default IntroScreen;
