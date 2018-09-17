import React, { Component } from 'react';
import { StyleSheet, Dimensions, View, TextInput, TouchableOpacity } from 'react-native';
import { TabNavigator } from 'react-navigation';
import { Container, Text, Toast, Content } from 'native-base';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      latitude: '0',
      longitude: '0',
      error: null,
      username: '',
      time_rec: null
    };
  }

  componentDidMount = () =>  {
    this.getLocation();
  }

  getLocation = () =>  {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => this.setState({ error: error.message })
    );
  }

  submit = () => {
    if (this.state.username) {
      if (this.state.latitude) {
        if (this.state.longitude) {
          this.alertMessage('Success');
          this.setState({
            time_rec: new Date().toLocaleString()
          })
        } else {
          this.alertMessage('Pls mention Longitude');
        }
      } else {
        this.alertMessage('Pls mention Latitude');
      }
    } else {
      this.alertMessage('Pls mention username');
    }

  }

  alertMessage = (msg) => {
    Toast.show({
     
      text: msg,
      position: 'bottom',
      buttonText: 'OK'
    });
  }


  render() {

    return (
      <Container>

        <View style={{ flex: 0.5 }} />
        <View style={{ flex: 1 }}>
          <Text> Username </Text>
          <TextInput style={styles.inputdate} value={this.state.username} onChangeText={(text) => {
            this.setState({
              username: text,
            });
          }} />
        </View>
        <View style={styles.row}>
          <View style={styles.inputWrap}>
            <Text style={styles.label}>Latitude</Text>
            <TextInput style={styles.inputdate} placeholder={'latitude'} value={this.state.latitude.toString()} onChangeText={(lat) => {
              this.setState({
                latitude: lat
              });
            }} />
          </View>

          <View style={styles.inputWrap}>
            <Text style={styles.label}>Longitude</Text>
            <TextInput style={styles.inputcvv} maxLength={50} placeholder={'longitude'} value={this.state.longitude.toString()} onChangeText={(long) => {
              this.setState({
                longitude: long
              });
            }} />
          </View>

        </View>
        <View style={styles.button}>
          <TouchableOpacity style={styles.highlightStyle} onPress={() => this.submit()}>
            <Text style={styles.continueText}>Continue</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }} />
      </Container>

    )
  };
}

const styles = StyleSheet.create({

  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  row: {
    flex: 1,
    flexDirection: "row"
  },
  inputWrap: {
    flex: 1,

    marginBottom: 10
  },
  inputdate: {
    fontSize: 14,
    marginBottom: -12,
    color: "#6a4595"
  },
  inputcvv: {
    fontSize: 14,
    marginBottom: -12,
    color: "#6a4595"
  },
  highlightStyle: {
    borderRadius: 50,
    borderWidth: 2,
    padding: 5,
    borderColor: '#2da1f6',
    backgroundColor: 'white'

  },
  button: {
    alignItems: 'center'
  },
  continueText: {
    color: '#2da1f6',
    fontSize: 15,
    fontWeight: '600'


  }
});
