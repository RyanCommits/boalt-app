/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, View, Text, StatusBar} from 'react-native';

import {SvgXml} from 'react-native-svg';

import BoaltLogo from './shared/BoaltLogoWhite.svg';
import GoogleCast, {CastButton} from 'react-native-google-cast';
import VideoPlayer from 'react-native-video-controls';

const VIDEO_URL =
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/CastVideos/mp4/BigBuckBunny.mp4';

const App = () => {
  const [fullscreen, setFullscreen] = useState(false);
  const [videoPause, setVideoPause] = useState(false);

  GoogleCast.EventEmitter.addListener(GoogleCast.SESSION_STARTED, () => {
    GoogleCast.castMedia({
      mediaUrl: VIDEO_URL,
      imageUrl:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/CastVideos/images/480x270/BigBuckBunny.jpg',
      title: 'Big Buck Bunny',
      subtitle:
        'A large and lovable rabbit deals with three tiny bullies, led by a flying squirrel, who are determined to squelch his happiness.',
      studio: 'Blender Foundation',
    });
    setVideoPause(true);
  });

  GoogleCast.EventEmitter.addListener(GoogleCast.SESSION_ENDED, () => {
    setVideoPause(false);
  });

  const enterFullscreen = () => {
    setFullscreen(true);
  };

  const exitFullscreen = () => {
    setFullscreen(false);
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        {!fullscreen && (
          <View style={styles.header}>
            <SvgXml width="200" height="100" xml={BoaltLogo} />
          </View>
        )}
        <View style={styles.content}>
          <View
            style={
              fullscreen
                ? styles.videoContainerFullscreen
                : styles.videoContainer
            }>
            <VideoPlayer
              source={{
                uri: VIDEO_URL,
              }}
              style={styles.video}
              onEnterFullscreen={enterFullscreen}
              onExitFullscreen={exitFullscreen}
              toggleResizeModeOnFullscreen={false}
              paused={videoPause}
            />
          </View>
          <View style={styles.castContainer}>
            <Text style={styles.castText}>Google Cast: </Text>
            <CastButton style={styles.castButton} />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, .7)',
  },
  header: {
    alignItems: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
  },
  castButton: {
    width: 60,
    height: 60,
    tintColor: 'white',
    marginRight: -15,
  },
  videoContainer: {
    alignItems: 'center',
    flex: 1,
    maxHeight: 300,
    width: '100%',
    paddingHorizontal: 25,
  },
  videoContainerFullscreen: {
    position: 'absolute',
    zIndex: 5000,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'yellow',
  },
  video: {
    width: '100%',
    height: 200,
  },
  castContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  castText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default App;
