import React, {Component} from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from 'react-native-responsive-screen';
import {KeyboardAwareScrollView} from '@codler/react-native-keyboard-aware-scroll-view';

export class AppTextinput extends Component {
  render() {
    return (
      <View style={styles.Container}>
        <TextInput
          {...this.props}
          placeholder={this.props.name}
          style={styles.textInput}
          secureTextEntry={this.props.password}
          editable={this.props.editable}
          defaultValue={this.props.defaultValue}
          autoFocus={this.props.autoFocus}
          keyboardType={this.props.keyboardType}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  Container: {
    marginTop: h('1%'),
  },
  textInput: {
    backgroundColor: '#0001',
    width: w('85%'),
    height: h('8%'),
    borderRadius: h('10%'),
    paddingLeft: h('3%'),
  },
});
