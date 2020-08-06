/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {SafeAreaView, StyleSheet, View, Text, StatusBar} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import Svg, {Use, Image, SvgUri, SvgXml} from 'react-native-svg';

import BoaltLogo from './shared/BoaltLogoWhite.svg';
import GoogleCast, {CastButton} from 'react-native-google-cast';

const App = () => {
  GoogleCast.EventEmitter.addListener(GoogleCast.SESSION_STARTED, () => {
    GoogleCast.castMedia({
      mediaUrl:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/CastVideos/mp4/BigBuckBunny.mp4',
      imageUrl:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/CastVideos/images/480x270/BigBuckBunny.jpg',
      title: 'Big Buck Bunny',
      subtitle:
        'A large and lovable rabbit deals with three tiny bullies, led by a flying squirrel, who are determined to squelch his happiness.',
      studio: 'Blender Foundation',
      streamDuration: 596, // seconds
      contentType: 'video/mp4', // Optional, default is "video/mp4"
      playPosition: 10, // seconds
      customData: {
        // Optional, your custom object that will be passed to as customData to reciever
        customKey: 'customValue',
      },
    });
  });

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.header}>
          <SvgXml width="200" height="100" xml={BoaltLogo} />
        </View>
        <View style={styles.content}>
          <CastButton style={styles.castButton} />
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, .7)',
  },
  content: {
    backgroundColor: 'red',
    flexGrow: 1,
    alignItems: 'center',
  },
  castButton: {
    width: 60,
    height: 60,
    tintColor: 'white',
    marginRight: -15,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
