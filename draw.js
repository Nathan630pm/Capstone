import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import Signature from 'react-native-signature-canvas';


const { width, height } = Dimensions.get('window');
 
export default class SignatureScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { signature: null };
  }
 
  handleSignature = signature => {
    this.setState({ signature });
    console.log(signature);
  };
 
  handleEmpty = () => {
    console.log('Empty');
  }
 
  render() {
    const style = `.m-signature-pad--footer
    .button {
      background-color: red;
      color: #FFF;
    }`;
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.preview}>
          {this.state.signature ? (
            <Image
              resizeMode={"contain"}
              style={{ width: width, height: 114 }}
              source={{ uri: this.state.signature }}
            />
          ) : null}
        </View>
        <Signature
          onOK={this.handleSignature}
          onEmpty={this.handleEmpty}
          descriptionText="Draw Anything!"
          clearText="Clear"
          confirmText="Save"
          webStyle={style}
        />
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
  preview: {
    width: width,
    height: 114,
    backgroundColor: "#AFAFAF",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15
  },
  previewText: {
    color: "#AFAFAF",
    fontSize: 14,
    height: 40,
    lineHeight: 40,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "#69B2FF",
    width: 120,
    textAlign: "center",
    marginTop: 10
  }
});