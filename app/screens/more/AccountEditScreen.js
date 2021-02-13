import React, { PureComponent } from "react";
import { Alert, StyleSheet, View, TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import AppButton from "../../components/Button";

import TextInput from "../../components/TextInput";
import AppText from "../../components/Text";
import useAuth from "../../auth/useAuth";

export default class AccountEditScreen extends PureComponent {
  constructor(props) {
    super(props);
  }

  state = {
    editing: false,
    email: this.props.user.email,
    password: "Placeholder",
    name: this.props.user.name,
    phone: this.props.user.phone_number,
  };

  render() {
    const { user, logOut } = this.props;

    const logOutConfirm = () => {
      Alert.alert("Confirm log out", "Are you sure you want to log out?", [
        { text: "Yes", onPress: logOut },
        { text: "No" },
      ]);
    };

    return (
      <View>
        <View
          style={{
            //   backgroundColor: "green",
            flexDirection: "row",
            justifyContent: "flex-end",
            marginTop: 15,
            marginBottom: 5,
          }}
        >
          <TouchableOpacity
            onPress={() => this.setState({ editing: !this.state.editing })}
          >
            <AppText
              style={{
                color: "cornflowerblue",
                fontWeight: "bold",
                marginVertical: 5,
                fontSize: 16,
                textDecorationLine: "underline",
                // textAlign: "center",
              }}
            >
              {this.state.editing ? "Save changes" : "Edit"}
            </AppText>
          </TouchableOpacity>
        </View>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          defaultValue={this.state.email}
          editable={this.state.editing}
          icon="email-outline"
          keyboardType="email-address"
          name="email"
          onChangeText={(newText) => this.setState({ email: newText })}
          placeholder="Email"
          textContentType="emailAddress"
        />
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          defaultValue={this.state.password}
          editable={this.state.editing}
          icon="lock-outline"
          name="password"
          placeholder="Password"
          secureTextEntry={true}
          textContentType="password"
        />
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          defaultValue={this.state.name}
          editable={this.state.editing}
          icon="account-box-outline"
          name="name"
          placeholder="Name"
          textContentType="name"
        />
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          defaultValue={this.state.phone}
          editable={this.state.editing}
          icon="cellphone"
          name="phone"
          placeholder="Phone"
          textContentType="telephoneNumber"
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            paddingVertical: 15,
          }}
        >
          <AppButton title="LOG OUT" onPress={logOutConfirm} />
        </View>
      </View>
    );
  }
}
