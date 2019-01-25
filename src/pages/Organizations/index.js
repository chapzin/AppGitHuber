import React, { Component } from 'react';

import {
  View, AsyncStorage, ActivityIndicator, FlatList,
} from 'react-native';
import Header from '~/components/Header';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';
import api from '~/services/api';
import OrganizationItem from './OrganizationItem';

import styles from './styles';

const TabIcon = ({ tintColor }) => <Icon name="building" size={20} color={tintColor} />;

TabIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

class Organizations extends Component {
  static navigationOptions = {
    tabBarIcon: TabIcon,
  };

  state = {
    data: [],
    isLoading: true,
    refreshing: false,
  };

  async componentDidMount() {
    this.LoadOrganizations();
  }

  LoadOrganizations = async () => {
    this.setState({ refreshing: true });
    const username = await AsyncStorage.getItem('@Githuber:username');
    const { data } = await api.get(`/users/${username}/orgs`);
    this.setState({ data, isLoading: false, refreshing: false });
  };

  renderListItem = ({ item }) => <OrganizationItem organization={item} />;

  renderList = () => {
    const { data, refreshing } = this.state;

    return (
      <FlatList
        data={data}
        keyExtractor={item => String(item.CODIGO)}
        renderItem={this.renderListItem}
        onRefresh={this.LoadOrganizations}
        numColumns={2}
        columnWrapperStyle={styles.columnWrap}
        refreshing={refreshing}
      />
    );
  };

  render() {
    const { isLoading } = this.state;

    return (
      <View style={styles.container}>
        <Header title="Organizações" />
        {isLoading ? <ActivityIndicator style={styles.loading} /> : this.renderList()}
      </View>
    );
  }
}

export default Organizations;
