import React from 'react';
import { StyleSheet, View, Alert, TouchableHighlight, Image, BackHandler } from 'react-native';
import Status from './components/Status';
import MessageList from './components/MessageList';
import { createImageMessage, createLocationMessage, createTextMessage } from './components/MessageUtils';
import Toolbar from './components/Toolbar';

export default class App extends React.Component {
  state = {
    messages: [
      createImageMessage('https://unsplash.it/300/300'),
      createTextMessage('World'),
      createTextMessage('Hello'),
      createLocationMessage({
        latitude: 37.78825,
        longitude: -122.4324,
      }),
    ],
    fullscreenImageId: null,
    isInputFocused: false,
  }

  handlePressMessage = ({id, type}) => {
    switch(type) {
      case 'text':
        Alert.alert('Confirm deletion', 'Are you sure to delete this message?', [
          {text: 'No', style: 'cancel'},
          {text: 'Yes', style: 'destructive', onPress: () => {
            this.setState(state => ({messages: state.messages.filter(message => message.id !== id)}))
          }},
        ])
        break;
      case 'image':
        this.setState({
          fullscreenImageId: id,
          isInputFocused: false,
        });
        break;
      default: break;
    }
  }

  exitFullscreen = () => {
    this.setState({ fullscreenImageId: null });
  }

  componentWillMount() {
    this.back = BackHandler.addEventListener('hardwareBackPress', () => {
      const {fullscreenImageId} = this.state;
      if (fullscreenImageId) {
        this.exitFullscreen();
        return true;
      }
      return false;
    });
  }

  componentWillUnmount() {
    this.back.remove()
  }

  handlePressToolbarCamera = () => {

  };

  handlePressToolbarLocation = () => {

  };
  
  handleChangeFocus = (isFocused) => {
    this.setState({isInputFocused: isFocused});
  };

  handleSubmit = (text) => {
    const {messages} = this.state;
    this.setState({
      messages: [createTextMessage(text), ...messages],
    });
  };

  renderMessageList() {
    const {messages} = this.state;
    return (
      <View style={styles.content}>
        <MessageList messages={messages} onPressMessage={this.handlePressMessage}/>
      </View>
    );
  }

  renderImageFull = () => {
    const {messages, fullscreenImageId} = this.state;
    if (!fullscreenImageId) return null;
    const img = messages.find(message => message.id === fullscreenImageId);
    if (!img) return null;
    return (
      <TouchableHighlight style={styles.fullscreen} onPress={this.exitFullscreen}>
        <Image style={styles.fullscreenImage} source={{uri: img.uri}} resizeMode='contain'/>
      </TouchableHighlight>
    )
  }

  renderToolbar() {
    const {isInputFocused} = this.state;
    return (
      <View style={styles.toolbar}>
        <Toolbar
          isFocused={isInputFocused}
          onSubmit={this.handleSubmit}
          onChangeFocus={this.handleChangeFocus}
          onPressCamera={this.handlePressToolbarCamera}
          onPressLocation={this.handlePressToolbarLocation}/>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Status/>
        {this.renderMessageList()}
        <View style={styles.toolbar}>
          {this.renderToolbar()}
        </View>
        <View style={styles.inputMethodEditor}>
        </View>
        {this.renderImageFull()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    backgroundColor: 'white',
  },
  inputMethodEditor: {
    flex: 1,
    backgroundColor: 'white',
  },
  toolbar: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.04)',
    backgroundColor: 'white',
  },
  fullscreen: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 2,
  },
  fullscreenImage: {
    flex: 1,
    resizeMode: 'contain',
  },
});