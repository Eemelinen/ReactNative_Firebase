import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, Text, Button } from 'react-native';
import firebase from '../Firebase';

class InputScreen extends Component {
  static navigationOptions = {
    title: 'List of inputs',
  };

  constructor() {
    super();
    this.ref = firebase.firestore().collection('inputs');
    this.unsubscribe = null;
    this.state = {
      isLoading: true,
      inputs: []
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const inputs = [];
    querySnapshot.forEach((doc) => {
      const { name, text } = doc.data();
      inputs.push({
        key: doc.id,
        doc,
        name,
        text,
      });
    });
    this.setState({
      inputs,
      isLoading: false,
   });
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }
  
  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.activity}>
          <ActivityIndicator size="large" color="#0000ff"/>
        </View>
      )
    }
    return (

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

        <Button
          title="Login Page"
          onPress={() => this.props.navigation.navigate('Login')}
        />

        <View style={styles.itemsList}>
          {this.state.inputs.map((item, index) => {
            return (
              <View key={index} style={styles.item}>
                <Text>{item.name}</Text>
                <Text>{item.text}</Text>
              </View>
            );
          })}
        </View>

      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingBottom: 22
  },
  itemsList: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  item: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  activity: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default InputScreen;