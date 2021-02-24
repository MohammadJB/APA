import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  RefreshControl
} from 'react-native';
import { connect } from 'react-redux';
import { getDashboard, loadLike, userLogout } from '../redux/actions/index';

class DashboardScreen extends React.Component {
  static navigationOptions = { header: null };
  constructor(props) {
    super(props);
    this.state = {
      loadLike: false,
    };
  }
  onLogoutUser() {
    const navigation = this.props.navigation;
    this.props.userLogout(navigation);
  }
  onRefresh = () => {
    this.props.getDashboard(this.props.accessToken, this.props.navigation);
  }
  render() {
    if (!this.props.postsLoaded && this.props.accessToken !== "") {
      this.props.getDashboard(this.props.accessToken, this.props.navigation);
    }
    return (
      <View style={styles.screenStyle}>
        <View style={styles.headerStyle}>
          <TouchableOpacity >
            <Image
              source={require('../assets/image/menu_icon.png')}
              style={{ width: 24, height: 24 }} />
          </TouchableOpacity>
          <Text style={{
            color: "#fff",
            fontSize: 16,
            fontFamily: 'IRANSans-Bold'
          }}>شبکه اجتماعی آپانت</Text>
          <TouchableOpacity onPress={this.onLogoutUser.bind(this)}>
            <Image
              source={require('../assets/image/log_out_icon.png')}
              style={{ width: 24, height: 24 }} />
          </TouchableOpacity>
        </View>
        <FlatList
          extraData={this.state.loadLike}
          data={this.props.posts}
          refreshControl={
            <RefreshControl
              refreshing={this.props.refreshing}
              onRefresh={this.onRefresh}
            />
          }
          keyExtractor={(item) => (item.entityId + item.objectId).toString()}
          renderItem={({ item, index }) => {
            return (
              <View style={styles.postStyle}>
                <View style={styles.postProfileStyle}>
                  <Text style={{
                    color: '#fff',
                    marginRight: 8,
                    fontFamily: "IRANSans-Bold",
                    fontSize: 14
                  }}>{item.user.name}</Text>
                  <Image
                    style={{ width: 40, height: 40, borderRadius: 20 }}
                    source={{ uri: item.user.avatarUrl }} />
                </View>
                <Text style={{ color: '#ccc', margin: 8, fontFamily: 'IRANSans', fontSize: 12 }}>{item.text}</Text>
                <View style={styles.postPanelStyle}>
                  <Text style={{ color: '#fff', marginRight: 8 }}>{item.comments_count}</Text>
                  <Image
                    source={require('../assets/image/comment.png')}
                    style={{ width: 20, height: 20, marginRight: 16 }} />
                  <Text style={{ color: '#fff', marginRight: 8 }}>{item.likes.length}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      if (item.user_like === false) {
                        this.like(item);
                        this.props.loadLike(index);
                        this.setState({ loadLike: !this.state.loadLike });
                      }
                    }}>
                    {this.renderLike(item)}
                  </TouchableOpacity>
                </View>
              </View>
            )
          }} />
      </View>
    );
  }
  renderLike(item) {
    if (item.user_like) {
      return (
        <Image
          source={require('../assets/image/heart_liked.png')}
          style={{ width: 20, height: 20 }} />
      )
    } else {
      return (
        <Image
          source={require('../assets/image/heart_not_liked.png')}
          style={{ width: 20, height: 20 }} />
      )
    }
  }
  like(item) {
    console.log(item)
    const formData = new URLSearchParams();
    formData.append('access_token', this.props.accessToken);
    formData.append('entityId', item.entityId);
    formData.append('entityType', item.entityType);
    fetch('https://apagh.venice.ir//mobile/services/action/like', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formData.toString()
    }).then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        if (responseJson.check_login.valid === false) {
          this.onLogoutUser.bind(this);
        }
      }).catch((error) => { console.log(error); });
  }
}

const styles = StyleSheet.create({
  screenStyle: {
    flex: 1,
    backgroundColor: '#222',
  },
  headerStyle: {
    backgroundColor: '#063',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  postStyle: {
    backgroundColor: '#111',
    margin: 8,
    padding: 4,
    borderRadius: 4
  },
  postProfileStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 8,
    marginLeft: 4,
    marginRight: 4
  },
  postPanelStyle: {
    backgroundColor: '#151515',
    padding: 10,
    borderBottomRightRadius: 4,
    borderBottomLeftRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  }
});
const mapStateToProps = state => {
  return {
    posts: state.dashboard.posts,
    accessToken: state.auth.accessToken,
    postsLoaded: state.dashboard.postsLoaded,
    refreshing: state.dashboard.refreshing
  }
}
export default connect(mapStateToProps, { getDashboard, loadLike, userLogout })(DashboardScreen);
