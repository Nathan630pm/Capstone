import React from 'react';
import { StyleSheet, Platform, Text, View, ActivityIndicator, TouchableOpacity, Dimensions } from 'react-native';
import MapView from "react-native-maps";
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { ScrollView } from 'react-native-gesture-handler';
import firebase from './firebase';


const { width, height } = Dimensions.get('window');



export default class App extends React.Component {

    


  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      markers: [],
      metadata: {},
      loading: true,
      initialRegion: {
        latitude: 43.6487,
        longitude: -79.38544,
        latitudeDelta: 0.0100,
        longitudeDelta: 0.0100,
      },
      region: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0,
      },
      location: null,
      errorMessage: null,
    };
  }
  componentWillMount(){
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }

    this._navListener = this.props.navigation.addListener('willFocus', () => {
        // this.setState({ username: 'user' });
        // get your new data here and then set state it will rerender
        const { currentUser } = firebase.auth()
        this.setState({ currentUser })
        this.setState({ errorMessage: null })

        firebase.auth().onAuthStateChanged(user => {
            console.log()
            this.props.navigation.navigate(user ? 'tabs' : 'LoginScreen')
        })
        firebase.database().ref('users/' + currentUser.uid + '/username').on('value', (snapshot) => {
            console.log(snapshot.val())
            let data = snapshot.val();
            let username = data;
            this.setState({ username });
            this.setState({ changeUsername: this.state.username })
            
        });
        

        

    });

    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location, isLoading: false });
    console.log(JSON.stringify(this.state.location.coords))
    this.setState({region:{latitude:this.state.location.coords.latitude, longitude:this.state.location.coords.longitude, latitudeDelta: 0.0015, longitudeDelta: 0.0015,}})
  };

  componentDidMount() {
    this.fetchMarkerData();
    setInterval(() => {
        this.setState({
          //change the state of the laoding in every 3 second
          loading: !this.state.loading,
        });
      }, 3000);

  }
  fetchMarkerData() {
    fetch('https://feeds.citibikenyc.com/stations/stations.json')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          markers: responseJson.stationBeanList,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  

  onPress(){
      alert("Marker Pressed...");
  }



  render() {
    let whileLoading;
    let whileLoadingText;
    let mainPage;
    if(this.state.isLoading == true){
    whileLoading = <ActivityIndicator size="large" style={styles.loading}></ActivityIndicator>;
    whileLoadingText = <Text style={styles.loadingText}>Loading Map... Please Wait.</Text>;
    mainPage = null;
    }
    if(this.state.isLoading == false){
    whileLoading = null;
    whileLoadingText = null;
    mainPage = 
    <ScrollView style={styles.mainPage}>
        <View style={styles.mainPageContainer}>

        <TouchableOpacity style={styles.button}
            title="Change Username" onPress={this.changeUsername} >
            <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>Change Username</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}
            title="Change Username" onPress={this.changeUsername} >
            <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>Change Username</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}
            title="Change Username" onPress={this.changeUsername} >
            <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>Change Username</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}
            title="Change Username" onPress={this.changeUsername} >
            <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>Change Username</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}
            title="Change Username" onPress={this.changeUsername} >
            <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>Change Username</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}
            title="Change Username" onPress={this.changeUsername} >
            <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>Change Username</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}
            title="Change Username" onPress={this.changeUsername} >
            <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>Change Username</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}
            title="Change Username" onPress={this.changeUsername} >
            <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>Change Username</Text>
        </TouchableOpacity>        
        </View>
    </ScrollView>
        ;
    }    

    return (
      
      <View style={{ flex: 1, zIndex:1000 }}>
        {whileLoading}
        {whileLoadingText}
        
        <MapView
        provider="google"
        style={{ flex: 1 }}
        initialRegion={this.state.initialRegion}
        region={this.state.region}
      >
        
        {this.state.isLoading ? null : this.state.markers.map((marker, index) => {
          const coords = {
            latitude: marker.latitude,
            longitude: marker.longitude,
          };

          const metadata = `Status: ${marker.statusValue}`;
          

          return (
            <MapView.Marker
              key={index}
              coordinate={coords}
            //   title={marker.stationName}
            //   description={metadata}
              onPress={() => this.onPress()}
            />
          );
        })}
      </MapView>
      {mainPage}
      </View> 
      
      

    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  loadingText: {
    backgroundColor: 'green',
    textAlign: 'center',
    fontSize: 25,
    color: 'white',
  },
  mainPage: {
    backgroundColor: 'rgba(0,0,0,0)',
    top: '65%',
    bottom: 50,
    color: 'black',
    position: 'absolute',
    width: '100%',
    height: height/3.4,
    opacity: 65,
    // alignItems: 'flex-start'
  },
  mainPageContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    
  },
  button: {
    backgroundColor: "rgba(53, 183, 75, 65)",
    padding: 30,
    // backgroundColor: 'rgba(0,0,0, 0.1)',
    borderWidth: 1,
    borderRadius: 0,
    marginTop: 0,
    width: width/2,
    flexGrow: 1,
    // top: 20,
},
});
