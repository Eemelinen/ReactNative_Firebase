import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';

class Details extends Component {
  static navigationOptions = {
    title: 'Details',
  };
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details</Text>
        <Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate('Input')}
        />
      </View>
    );
  }
}

export default Details;