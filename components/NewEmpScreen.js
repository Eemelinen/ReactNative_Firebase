import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, Text, Button } from 'react-native';
import firebase from '../Firebase';

class NewEmpScreen extends Component {
  static navigationOptions = {
    title: 'List of inputs',
  };

  constructor() {
    super();
    this.ref = firebase.firestore().collection('EemelinTesti');
    
    this.unsubscribe = null;
    this.state = {
      isLoading: true,
      newemp: []
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const newemp = [];
    querySnapshot.forEach((doc) => {
      const { a, b, c, d } = doc.data();
      newemp.push({
        key: doc.id,
        doc,
        a,
        b,
        c,
        d,
      });
    });
    this.setState({
      newemp,
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
          title="Input page"
          onPress={() => this.props.navigation.navigate('Input')}
        />

        <View style={styles.itemsList}>
          {this.state.newemp.map((item, index) => {
            return (
              <View key={index} style={styles.item}>
                <Text>{item.a}</Text>
                <Text>{item.b}</Text>
                <Text>{item.c}</Text>
                <Text>{item.d}</Text>
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

export default NewEmpScreen;