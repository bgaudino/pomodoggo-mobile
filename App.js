import * as React from 'react';
import { Text, View, StyleSheet, Image, Vibration, TouchableOpacity} from 'react-native';
import Constants from 'expo-constants';
import { Sound } from 'expo-av/build/Audio';

import { Dog } from './components/Dog';
import { WorkButtons } from './components/WorkButtons';
import { BreakButtons } from './components/BreakButtons';
import { ControlButtons } from './components/ControlButtons';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      timeLeft: 1500000,
      session: 25,
      break: 5,
      mode: 'work',
      started: false,
      backgroundColor: '#e5593f',
      dog: 'https://pomodoro.dog/marylois.jpg',
      breed: 'Labradoodle'
    }
  }
  
  render() {

    let btnText = 'Start';
    let btnColor = '#acbf60';
    let message = 'Ready when you are!';
    if (this.state.started) {
      if (this.state.mode === 'work') {
        message = 'Get to work!';
      } else {
        message = 'Time for a break!';
      }
    }

    if (this.state.started) {
      btnText = 'Stop';
      btnColor = '#ce381c';
    }

    async function bark() {
      const sound = new Sound();
      await sound.loadAsync(require('./assets/bark.mp3'));
      await sound.playAsync();
    }

    let dog = 'https://images.dog.ceo/breeds/ovcharka-caucasian/IMG_20190826_112034.jpg';
    const countdown = () => {
      this.setState({
        timeLeft: this.state.timeLeft - 1000
      })
      if (this.state.timeLeft === 0) {
        Vibration.vibrate([500, 500, 500]);
        setTimeout(() => {
          if (this.state.mode === 'work') {
            getDog();
            this.setState({
              mode: 'break',
              timeLeft: this.state.break * 60000,
              backgroundColor: '#4783ff'
            })
          } else {
            getDog();
            this.setState({
              mode: 'work',
              timeLeft: this.state.session * 60000,
              backgroundColor: '#e5593f'
            })
          } 
        }, 1000)
      }
    }

    const startStop = props => {
      if (!this.state.started) {
        this.interval = setInterval(countdown, 1000)
        this.setState({
          started: true
        })
      } else {
        clearInterval(this.interval)
        this.setState({
          started: false
        })
      }
    }

    const sessionInc = () => {
      if (this.state.session < 60) {
        this.setState({
          session: this.state.session + 1
        })
      }
      if (this.state.mode === 'work' && this.state.timeLeft < 3600000) {
        this.setState({
          timeLeft: this.state.timeLeft + 60000
        })
      }
    }

    const sessionDec = () => {
      if (this.state.session > 1) {
        this.setState({
          session: this.state.session - 1
        })
      }
      if (this.state.mode === 'work' && this.state.timeLeft > 60000) {
        this.setState({
          timeLeft: this.state.timeLeft - 60000
        })
      }
    }

    const breakInc = () => {
      if (this.state.break < 60) {
        this.setState({
          break: this.state.break + 1
        })
      }
      if (this.state.mode === 'break' && this.state.timeLeft < 3600000) {
        this.setState({
          timeLeft: this.state.timeLeft + 60000
        })
      }
    }

    const breakDec = () => {
      if (this.state.break > 1) {
        this.setState({
          break: this.state.break - 1
        })
      }
      if (this.state.mode === 'break' && this.state.timeLeft > 60000) {
        this.setState({
          timeLeft: this.state.timeLeft - 60000
        })
      }
    }

    const reset = () => {
      clearInterval(this.interval);
      this.setState({
        session: 25,
        break: 5,
        started: false,
        timeLeft: 1500000,
        mode: 'work'
      })
    }

    const getDog = () => {
      bark();
      fetch('https://dog.ceo/api/breeds/image/random')
      .then(response => response.json())
      .then(data => {
        let arr = data.message.split('/');
        let breed = arr[4];
        let wordTwo = breed.replace(/-.+/g, '')
        let wordOne = breed.replace(/.+-/g, '')
        wordOne = wordOne.charAt(0).toUpperCase() + wordOne.slice(1);
        wordTwo = wordTwo.charAt(0).toUpperCase() + wordTwo.slice(1);
        if (wordOne === wordTwo) {
          wordTwo = '';
        }
        breed = `${wordOne} ${wordTwo}`.trim();
        this.setState({
          dog: data.message,
          breed: breed
        })
      })
    }

    let appStyle = {
      backgroundColor: this.state.backgroundColor,
      flex: 1,
      justifyContent: 'center',
      paddingTop: Constants.statusBarHeight,
      padding: 8,
    }

    let timeLeft = '00:00';
    if (this.state.timeLeft > 0) {
      const totalSeconds = this.state.timeLeft / 1000;
      let seconds = totalSeconds % 60;
      let minutes = (totalSeconds - seconds) / 60;
      if (seconds < 10) {
        seconds = `0${seconds}`;
      } if (minutes < 10) {
        minutes = `0${minutes}`;
      } timeLeft = `${minutes}:${seconds}`;
    }

    return (
      <View style={appStyle}>
        <Text style={styles.title}>&#128054; pomoDoggo</Text>
        <Text style={styles.timer}>{timeLeft}</Text>
        <Dog source={this.state.dog} message={message} breed={this.state.breed}/>
        <WorkButtons session={this.state.session} inc={sessionInc} dec={sessionDec} />
        <BreakButtons break={this.state.break} inc={breakInc} dec={breakDec} />
        <ControlButtons btnText={btnText} btnColor={btnColor} toggleStart={startStop} reset={reset} getDog={getDog}/>
      </View>
    );
  }
  
}

const styles = StyleSheet.create({
  timer: {
    fontSize: 96,
    fontFamily: 'Courier',
    textAlign: 'center',
    color: 'white'
  },
  title: {
    fontSize: 36,
    fontFamily: 'Marker Felt',
    textAlign: 'center',
    color: 'white'
  }
});
