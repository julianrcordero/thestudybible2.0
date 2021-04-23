import React, { useCallback, useState, useEffect } from "react";
import {
  Button,
  FlatList,
  RefreshControl,
  View,
  TouchableOpacity,
} from "react-native";

import { useTheme } from "../config/ThemeProvider";

import listingsApi from "../api/listings";
import AppText from "../components/Text";
import useApi from "../hooks/useApi";
import ContentCard from "../components/ContentCard";
import { ScrollView } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import useAuth from "../auth/useAuth";

function MarkupItem({ icon, title }) {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      style={{
        alignItems: "center",
        borderWidth: 0.3,
        // borderColor: colors.secondary,
        flex: 1 / 2,
        height: 150,
        justifyContent: "center",
        paddingTop: 30,
      }}
    >
      <MaterialCommunityIcons
        style={{}}
        name={icon}
        color={colors.icon}
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
        {title}
      </AppText>
    </TouchableOpacity>
  );
}

function ResourceSection({ data, navigation, showDate, title }) {
  const { colors } = useTheme();

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

  const getItemLayout = (data, index) => ({
    length: 500,
    offset: 500 * index,
    index,
  });

  const keyExtractor = (listing) => listing.id.toString();

  const renderItem = ({ item }) => (
    <ContentCard
      item={item}
      date={date}
      navigation={navigation}
      // onPress={() =>
      //   navigation.navigate(routes.LISTING_DETAILS, { item, date })
      // }
    />
  );

  const listEmptyComponent = () => {
    return <View style={{ backgroundColor: "green" }}></View>;
  };

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
          style={{
            color: colors.text,
            fontWeight: "bold",
            fontSize: 16,
            paddingVertical: 15,
          }}
        >
          {title}
        </AppText>
        {showDate ? (
          <AppText
            style={{ color: colors.text, fontSize: 18, fontStyle: "italic" }}
          >
            {date}
          </AppText>
        ) : null}
      </View>
      <FlatList
        // data={data}
        // horizontal
        // getItemLayout={}
        // keyExtractor={(listing) => listing.id.toString()}
        // renderItem={({ item }) => (
        //   <ContentCard
        //     item={item}
        //     date={date}
        //     navigation={navigation}
        //     // onPress={() =>
        //     //   navigation.navigate(routes.LISTING_DETAILS, { item, date })
        //     // }
        //   />
        // )}
        // style={{ flexGrow: 0 }}

        bounces={false}
        data={data}
        decelerationRate={"fast"}
        // extraData={this.state}
        getItemLayout={getItemLayout}
        horizontal
        initialNumToRender={5}
        keyExtractor={keyExtractor}
        listEmptyComponent={listEmptyComponent}
        // maxToRenderPerBatch={5}
        removeClippedSubviews
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        snapToAlignment={"start"}
        // snapToInterval={width}
        updateCellsBatchingPeriod={25}
        windowSize={11}
      />
    </View>
  );
}

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

function HomeScreen({ navigation }) {
  const { colors } = useTheme();
  const getDevotionalsApi = useApi(listingsApi.getDevotionals);
  const getResourcesApi = useApi(listingsApi.getResources);

  const [] = useState([]);
  const [] = useState([]);

  const getResources = () => {
    getResourcesApi.request();

    // setBlogs(getResourcesApi.data.filter((d) => d.category == "blog"));
    // setQnas(
    //   getResourcesApi.data.filter((d) => d.category == "bibleqnas-library")
    // );
  };

  const requestAll = () => {
    setRefreshing(true);
    getDevotionalsApi.request();
    // getResourcesApi.request();
    getResources();
    wait(6000).then(() => setRefreshing(false));
  };

  const { user } = useAuth();

  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    refreshAll();
  }, []);

  const refreshAll = useCallback(() => {
    requestAll();
  });

  var timeOfDay = new Date(),
    hour = timeOfDay.getHours();

  return (
    <View style={{ flex: 1, paddingBottom: 70 }}>
      <ScrollView
        style={{
          backgroundColor: colors.background,
          paddingHorizontal: 15,
          flex: 1,
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refreshAll} />
        }
      >
        {/* <ActivityIndicator visible={getDevotionalsApi.loading} /> */}
        {refreshing ? null : ( // <Indicator animating={getDevotionalsApi.loading} size={"large"} />
          <AppText style={{ color: colors.text, fontSize: 24, margin: 10 }}>
            {"Good "}
            {hour > 11 ? "afternoon" : "morning"}
            {user ? ", " + user.sub : null}
            {"."}
          </AppText>
          //str(0, user.name.indexOf(" ")) : null}
        )}

        <ResourceSection
          colors={colors}
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
              <AppText style={{ color: colors.text }}>
                Couldn't retrieve the listings.
              </AppText>
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
          data={getResourcesApi.data.filter(
            (d) => d.category == "bibleqnas-library"
          )}
          navigation={navigation}
        />

        {(getResourcesApi.data.length == 0 || getResourcesApi.error) &&
          !refreshing && (
            <View
              style={{
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <AppText style={{ color: colors.text }}>
                Couldn't retrieve the listings.
              </AppText>
              <Button title="Retry" onPress={getResources} />
            </View>
          )}
        <ResourceSection
          title={"BLOGS"}
          showDate={false}
          data={getResourcesApi.data.filter((d) => d.category == "blog")}
          navigation={navigation}
        />
        {(getResourcesApi.data.length == 0 || getResourcesApi.error) &&
          !refreshing && (
            <View
              style={{
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <AppText style={{ color: colors.text }}>
                Couldn't retrieve the listings.
              </AppText>
              <Button title="Retry" onPress={getResources} />
            </View>
          )}
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
