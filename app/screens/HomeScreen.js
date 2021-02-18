import React, { useCallback, useState, useEffect, PureComponent } from "react";
import {
  Button,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";
import Animated from "react-native-reanimated";

import { useTheme } from "../config/ThemeContext";

import listingsApi from "../api/listings";
import AppText from "../components/Text";
import useApi from "../hooks/useApi";
import ContentCard from "../components/ContentCard";
import { ScrollView } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import useAuth from "../auth/useAuth";

class MarkupItem extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity
        style={{
          alignItems: "center",
          borderWidth: 0.3,
          borderColor: colors.secondary,
          flex: 1 / 2,
          height: 150,
          justifyContent: "center",
          paddingTop: 30,
        }}
      >
        <MaterialCommunityIcons
          style={{}}
          name={this.props.icon}
          color={colors.black}
          size={38}
        />
        <AppText
          style={{
            color: "cornflowerblue",
            fontWeight: "bold",
            marginVertical: 15,
            fontSize: 14,
          }}
        >
          {this.props.title}
        </AppText>
      </TouchableOpacity>
    );
  }
}

class ResourceSection extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { data, navigation, showDate, title } = this.props;

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    var today = new Date(),
      date = monthNames[today.getMonth()] + " " + today.getDate();

    return (
      <View style={{ marginBottom: 15 }}>
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <AppText
            style={{ fontWeight: "bold", fontSize: 16, paddingVertical: 15 }}
          >
            {title}
          </AppText>
          {showDate ? (
            <AppText style={{ fontSize: 18, fontStyle: "italic" }}>
              {date}
            </AppText>
          ) : null}
        </View>
        <FlatList
          data={data}
          horizontal
          getItemLayout={(data, index) => ({
            length: 500,
            offset: 500 * index,
            index,
          })}
          keyExtractor={(listing) => listing.id.toString()}
          renderItem={({ item }) => (
            <ContentCard
              item={item}
              date={date}
              navigation={navigation}
              // onPress={() =>
              //   navigation.navigate(routes.LISTING_DETAILS, { item, date })
              // }
            />
          )}
          style={{ flexGrow: 0 }}
        />
      </View>
    );
  }
}

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

function HomeScreen({ navigation, darkMode }) {
  const getDevotionalsApi = useApi(listingsApi.getDevotionals);
  const getResourcesApi = useApi(listingsApi.getResources);

  const [blogs, setBlogs] = useState([]);
  const [qnas, setQnas] = useState([]);

  const getResources = () => {
    getResourcesApi.request();

    setBlogs(getResourcesApi.data.filter((d) => d.category == "blog"));
    setQnas(
      getResourcesApi.data.filter((d) => d.category == "bibleqnas-library")
    );
  };

  const requestAll = () => {
    setRefreshing(true);
    getDevotionalsApi.request();
    getResources();
    wait(4000).then(() => setRefreshing(false));
  };

  const { user } = useAuth();

  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    requestAll();
  }, []);

  const refreshAll = useCallback(() => {
    requestAll();
  });

  var timeOfDay = new Date(),
    hour = timeOfDay.getHours();
  // console.log(hour);

  return (
    <View style={{ flex: 1, paddingBottom: 70 }}>
      <ScrollView
        style={{
          backgroundColor: darkMode ? colors.primary : colors.white,
          paddingHorizontal: 15,
          flex: 1,
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refreshAll} />
        }
      >
        {/* <ActivityIndicator visible={getDevotionalsApi.loading} /> */}
        {refreshing ? null : ( // <Indicator animating={getDevotionalsApi.loading} size={"large"} />
          <AppText style={{ fontSize: 24, margin: 10 }}>
            {"Good "}
            {hour > 11 ? "afternoon" : "morning"}
            {user ? ", " + user.name.substr(0, user.name.indexOf(" ")) : null}
            {"."}
          </AppText>
        )}

        <ResourceSection
          title={"DEVOTIONALS"}
          showDate={true}
          data={getDevotionalsApi.data}
          navigation={navigation}
        />

        {(getDevotionalsApi.data.length == 0 || getDevotionalsApi.error) &&
          !refreshing && (
            <View
              style={{
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <AppText>Couldn't retrieve the listings.</AppText>
              <Button title="Retry" onPress={getDevotionalsApi.request} />
            </View>
          )}
        {/* <Indicator animating={getDevotionalsApi.loading} size={"large"} /> */}

        <View
          style={{
            alignSelf: "center",
            // aspectRatio: 1.1,
            marginVertical: 15,
            width: "100%",
          }}
        >
          <View style={{ flexDirection: "row", flex: 1 }}>
            <MarkupItem icon={"bookmark-outline"} title={"BOOKMARKS"} />
            <MarkupItem icon={"pencil-box-outline"} title={"NOTES"} />
          </View>
          <View style={{ flexDirection: "row", flex: 1 }}>
            <MarkupItem icon={"heart-outline"} title={"FAVORITES"} />
            <MarkupItem icon={"format-color-highlight"} title={"HIGHLIGHTS"} />
          </View>
        </View>

        <ResourceSection
          title={"QUESTIONS & ANSWERS"}
          showDate={false}
          data={qnas}
          navigation={navigation}
        />
        <ResourceSection
          title={"BLOGS"}
          showDate={false}
          data={blogs}
          navigation={navigation}
        />
      </ScrollView>
    </View>
  );
}

export default HomeScreen;

{
  /* 
      <FlatList
        data={getDevotionalsApi.data}
        // getItemLayout={(data, index) => ({ length: 200 })}
        keyExtractor={(listing) => listing.id.toString()}
        renderItem={({ item }) => (
          <Card
            title={item.title}
            scripture={item.scripture}
            // imageUrl={item.images[0].url}
            onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
            itemDate={item.itemDate}
            category={item.category}
            // thumbnailUrl={item.imageUrl}
          />
        )}
      /> */
}
