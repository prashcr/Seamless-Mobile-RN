import React, {
  Component,
  PropTypes
} from 'react'

import {
  View,
  Text
} from 'react-native'

export default class Main extends Component {
  static propTypes = {
    title: PropTypes.string
  }
  static get defaultProps() {
    return {
      title: 'Main'
    }
  }

  render() {
    return (
      <View>
        <Text>Hi! My name is {this.props.title}</Text>
      </View>
    )
  }
}
