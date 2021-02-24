import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import { usernameChanged, passwordChanged, userLogin } from '../redux/actions/index';

class LoginScreen extends React.Component {
  static navigationOptions = { header:null };
  onUsernameChanged(text) {
    this.props.usernameChanged(text);
  }
  onPasswordChanged(text) {
    this.props.passwordChanged(text);
  }
  onLoginUser() {
    const username = this.props.username;
    const password = this.props.password;
    const navigation = this.props.navigation;
    this.props.userLogin({ username }, { password }, { navigation });
  }
  renderButton() {
    if (!this.props.loading) {
      return (
        <Text style={styles.buttonTextStyle}>
          ورود
        </Text>
      )
    } else {
      return (
        <ActivityIndicator
          size="large"
          color="#ddd" />
      )
    }
  }
  render() {
    return (
      <View style={styles.screenStyle}>
        <StatusBar
          backgroundColor='#222'
          barStyle='light-content' />
        <Image
          style={{ marginTop: 40,width:180,height:180 }}
          source={require('../assets/image/logo.png')} />
        <Text
          style={styles.textStyle}>
          ورود به حساب کاربری
        </Text>
        <TextInput
          placeholder='نام کاربری'
          placeholderTextColor='#cccc'
          style={[styles.textInputStyle, { marginTop: 60 }]}
          onChangeText={this.onUsernameChanged.bind(this)}
          value={this.props.username} />
        <TextInput
          placeholder='گذرواژه'
          placeholderTextColor='#cccc'
          style={[styles.textInputStyle, { marginTop: 20 }]}
          onChangeText={this.onPasswordChanged.bind(this)}
          value={this.props.password} />
        <Text style={{
          color: '#ff1919',
          alignItems: 'center',
          marginTop:10
        }}>{this.props.error}</Text>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={this.onLoginUser.bind(this)}>
          {this.renderButton()}
        </TouchableOpacity>
        <Text
          style={styles.forgetButtonStyle}>
          فراموشی گذرواژه
        </Text>
        <TouchableOpacity
          style={styles.signUpStyle}>
          <Text
            style={styles.signUpTextStyle}>
            عضویت
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screenStyle: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#222',
  },
  textStyle: {
    color: '#fff',
    fontSize: 20,
    fontFamily : 'IRANSans-Bold'
  },
  textInputStyle: {
    width: '90%',
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    alignItems: 'flex-start',
    color: '#aaa',
    backgroundColor: '#222',
    fontFamily:'IRANSans'
  },
  buttonStyle: {
    width: '90%',
    height: 40,
    borderRadius: 4,
    backgroundColor: '#063',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonTextStyle: {
    color: '#ccc',
    fontFamily:'IRANSans'
  },
  forgetButtonStyle: {
    color: '#bbb',
    marginTop: 15,
    fontFamily:'IRANSans'
  },
  signUpStyle: {
    marginTop: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingTop: 8,
    paddingBottom: 8,
    paddingRight: 16,
    paddingLeft: 16
  },
  signUpTextStyle: {
    color: '#aaa',
    fontFamily:'IRANSans'
  }
});
const mapStateToProps = state => {
  return {
    username: state.auth.username,
    password: state.auth.password,
    loading: state.auth.loading,
    error: state.auth.error
  }
}
export default connect(mapStateToProps, { usernameChanged, passwordChanged, userLogin })(LoginScreen);

