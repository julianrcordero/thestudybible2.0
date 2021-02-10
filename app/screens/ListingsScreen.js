import React, { useCallback, useState, useEffect, PureComponent } from "react";
import {
  ActivityIndicator as Indicator,
  Button,
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";
import Animated from "react-native-reanimated";

import ActivityIndicator from "../components/ActivityIndicator";
// import Button from "../components/Button";
import Card from "../components/Card";
import colors from "../config/colors";
import listingsApi from "../api/listings";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
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
          borderWidth: 0.2,
          borderColor: colors.secondary,
          flex: 1 / 2,
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
      <>
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
              onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
            />
          )}
          style={{ flexGrow: 0 }}
        />
      </>
    );
  }
}

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

function ListingsScreen({ navigation, scrollY }) {
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
    getDevotionalsApi.request();
    getResources();
  };

  const { user } = useAuth();
  useEffect(() => {
    requestAll();
  }, []);

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    requestAll();
    wait(2000).then(() => setRefreshing(false));
  });

  var timeOfDay = new Date(),
    hour = timeOfDay.getHours();
  // console.log(hour);

  return (
    <Screen style={styles.screen}>
      {/* <AnimatedFlatList
        bounces={false}
        data={sections}
        extra={this.state.fontSize}
        // initialNumToRender={20}
        keyExtractor={(item) => item.chapterNum.toString()}
        onScroll={Animated.event([
          {
            nativeEvent: { contentOffset: { y: scrollY } },
          },
        ])}
        renderItem={this.renderParagraphItem}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        style={[
          styles.bibleTextView,
          { paddingTop: HEADER_HEIGHT, paddingBottom: HEADER_HEIGHT + 300 },
        ]}
      /> */}
      <ScrollView
        // bounces={false}
        // onScroll={Animated.event([
        //   {
        //     nativeEvent: { contentOffset: { y: scrollY } },
        //   },
        // ])}
        style={{ paddingHorizontal: 15, paddingBottom: 70 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
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
            aspectRatio: 1.1,
            // borderWidth: 1,
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
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.white, // "cornflowerblue",
  },
});

export default ListingsScreen;

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
