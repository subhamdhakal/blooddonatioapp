import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableWithoutFeedback,
  FlatList,
  TextInput,
} from 'react-native';
import {
  Modal,
  Portal,
  Text,
  Button,
  Provider,
  Avatar,
} from 'react-native-paper';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Moment from 'moment';
import {getOpdQueue} from './../actions/opdqueue';
import RegularText from '../components/RegularText';
import SubHeadingText from './../components/SubHeadingText';
import OrangeText from './../components/OrangeText';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/Feather';
import {SearchBar} from 'react-native-elements';
import colors from '../assets/colors/colors';
import {ScrollView, TouchableHighlight} from 'react-native-gesture-handler';
import {getDoctorProfileInPatient} from './../actions/patientprofile';
import {KeyboardAvoidingView} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import LabelText from './../components/LabelText';
import TinyButton from './../components/TinyButton';
import AcceptRejectAppointmentModal from '../components/BookAppointmentModal';
import BookAppointmentModal from '../components/BookAppointmentModal';
import {Picker} from '@react-native-picker/picker';

class DoctorsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      modalData: {},
      refreshing: false,
      isFetching: true,
      search: '',
      data: this.props.recommendedDoctorList,
      selectedCategory: '',
      arrayList: this.props.recommendedDoctorList,
    };
    this.arrayholder = this.props.recommendedDoctorList;
    this.setData();
  }

  componentDidMount() {
    console.log(
      'this.props.recommendedDoctorList' +
        JSON.stringify(this.props.recommendedDoctorList),
    );
    this.setState({
      data: this.props.recommendedDoctorList,
    });
  }

  renderItem = ({item}) => (
    <View
      style={{
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        borderTopLeftRadius: 25,
        borderBottomRightRadius: 25,
        flex: 1,
        margin: 8,
        padding: 12,
        elevation: 1,
        borderWidth: 2,
        borderColor: '#2E79BD',
      }}>
      <View style={{borderRadius: 12, margin: 8, flex: 0.2}}>
        <Avatar.Image
          size={72}
          source={{
            uri:
              'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
          }}
        />
      </View>
      <View
        style={{
          flexDirection: 'column',
          marginLeft: 12,
          flex: 0.5,
        }}>
        <RegularText label={item.fullName} />
        <LabelText label={item.specialization} />
      </View>
      <View
        style={{
          flex: 0.3,
          borderRadius: 4,
          padding: 8,
        }}>
        <TinyButton
          label={'Appointment'}
          background={colors.primaryBlue}
          labelColor={colors.white}
          borderColor={colors.primaryBlue}
        />

        <TinyButton
          label={'Details'}
          background={colors.white}
          labelColor={colors.primaryBlue}
          borderColor={colors.primaryBlue}
        />
      </View>
    </View>
  );
  updateSearch = (search) => {
    this.setState({search});
  };
  searchFilterFunction = (text) => {
    this.setState({
      value: text,
    });

    const newData = this.arrayholder.filter((item) => {
      const itemData = `${item.fullName.toUpperCase()} ${item.district.toUpperCase()} ${item.blood_group.toUpperCase()}`;

      // const itemData = `${item.name.title.toUpperCase()} ${item.name.first.toUpperCase()} ${item.name.last.toUpperCase()}`;
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      data: newData,
    });
  };
  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '86%',
          backgroundColor: '#CED0CE',
          marginLeft: '14%',
        }}
      />
    );
  };

  renderHeader = () => {
    return (
      <SearchBar
        placeholder="Search..."
        lightTheme
        round
        onChangeText={(text) => this.searchFilterFunction(text)}
        autoCorrect={false}
        value={this.state.value}
      />
    );
  };

  setSelectedCategory(selectedDoctorCategory) {
    this.setState({
      selectedCategory: selectedDoctorCategory,
    });
  }

  setData() {
    this.setState({
      data: this.props.recommendedDoctorList,
    });
  }

  render() {
    this.arrayholder = this.props.recommendedDoctorList;
    return (
      <KeyboardAvoidingView style={styles.main}>
        {/* <SearchBar
          placeholder="Search..."
          lightTheme
          round
          onChangeText={(text) => this.searchFilterFunction(text)}
          autoCorrect={false}
          value={this.state.value}
        />
        <Picker
          selectedValue={this.state.selectedCategory}
          onValueChange={(itemValue, itemIndex) =>
            this.setSelectedCategory(itemValue)
          }>
          <Picker.Item label="General Phygysian" value="java" />
          <Picker.Item label="JavaScript" value="js" />
          <Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="js" />
          <Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="js" />
        </Picker>

        <FlatList
          data={this.state.data}
          renderItem={(item) => this.renderItem(item)}
          keyExtractor={(item, index) => index.toString()}
        /> */}
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    recommendedDoctorList: state.patientDashBoardReducer.recommendedDoctorList,
    accessToken: state.loginReducer.accessToken,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {getOpdQueue, getDoctorProfileInPatient},
      dispatch,
    ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DoctorsScreen);

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  containerStyle: {backgroundColor: 'white', padding: 20},
  textInputStyles: {
    flex: 1,
    paddingTop: 5,
    paddingRight: 5,
    paddingBottom: 5,
    paddingLeft: 8,
    backgroundColor: '#fff',
    color: colors.primaryBlue,
    marginLeft: 12,
    fontFamily: 'HelveticaNowDisplay-Medium',
  },
});
