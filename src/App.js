import React, {
  Component
} from 'react'

import {
  NavigationBar,
  Button,
  Icon,
  Title
} from '@shoutem/ui'

import Drawer from 'react-native-drawer'

import ControlPanel from './ControlPanel'

export default class App extends Component {
  state={
    drawerOpen: false,
    drawerDisabled: false
  };
  closeDrawer = () => {
    this._drawer.close()
  };
  openDrawer = () => {
    this._drawer.open()
  };
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
        <NavigationBar
          leftComponent={<Icon onPress={this.openDrawer} name="sidebar" />}
          centerComponent={<Title>TITLE</Title>}
          rightComponent={(
            <Button>
              <Icon name="cart" />
            </Button>
          )}
        />

      </Drawer>
    )
  }
}
