import React, {
  Component
} from 'react'
import {
  Text,
  View,
  Navigator,
  StyleSheet
} from 'react-native'
import {
  NavigationBar,
  Button,
  Icon,
  Title
} from '@shoutem/ui'
import Drawer from 'react-native-drawer'
import ControlPanel from './ControlPanel'
import firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyANKx7mgndq67Rj9RwCNyDwgReRwTxdmRM',
  authDomain: 'seamless-ed5fc.firebaseapp.com',
  databaseURL: 'https://seamless-ed5fc.firebaseio.com',
  storageBucket: 'seamless-ed5fc.appspot.com',
  messagingSenderId: '993175486119'
}
const email = 'dranithix@gmail.com'
const password = 'testtest'
firebase.initializeApp(config);
function login() {
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(user => {
      const userId = user.uid
      const email = user.email
      firebase.database().ref('users/' + userId).set({
        username: 'Prashanth',
        email: email
      })
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, errorMessage)
    });
}
import BarcodeScanner from 'react-native-barcodescanner';

export default class App extends Component {
  state={
    drawerOpen: false,
    drawerDisabled: false,
    torchMode: 'off',
    cameraType: 'back'
  };
  barcodeReceived = (e) => {
    console.log('Barcode: ' + e.data);
    console.log('Type: ' + e.type);
  }
  closeDrawer = () => {
    this._drawer.close()
  };
  openDrawer = () => {
    this._drawer.open()
  };
  componentDidMount() {
    login()
  }
  render() {
    return (
      <Drawer
        ref={(ref) => this._drawer = ref}
        content={
          <ControlPanel closeDrawer={this.closeDrawer} />
        }
        acceptDoubleTap
        styles={{main: {shadowColor: '#000000', shadowOpacity: 0.3, shadowRadius: 15}}}
        onOpen={() => {
          console.log('onopen')
          this.setState({drawerOpen: true})
        }}
        onClose={() => {
          console.log('onclose')
          this.setState({drawerOpen: false})
        }}
        tweenDuration={100}
        panThreshold={0.08}
        disabled={this.state.drawerDisabled}
        openDrawerOffset={(viewport) => {
          return 100
        }}
        panOpenMask={0.2}
        negotiatePan
        tapToClose={true}
        >
        <View style={{flex: 1, flexDirection: 'column'}}>
        <NavigationBar
          style={{ }}
          leftComponent={<Icon onPress={this.openDrawer} name="sidebar" />}
          centerComponent={<Title>TITLE</Title>}
          rightComponent={(
            <Button>
              <Icon name="cart" />
            </Button>
          )}
        />
        <View style={{ flex: 1, marginTop: 64 }}>
          <BarcodeScanner
            onBarCodeRead={this.barcodeReceived}
            style={{ flex: 1, position: 'relative' }}
            torchMode={this.state.torchMode}
            cameraType={this.state.cameraType}
          />
        </View>
        </View>
      </Drawer>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  statusBar: {
    height: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  statusBarText: {
    fontSize: 20
  }
});
