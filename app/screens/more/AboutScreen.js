import React from "react";
import { View, StyleSheet } from "react-native";
import { StretchyScrollView } from "react-native-stretchy";

import { useTheme } from "../../config/ThemeProvider";

import ListItem from "../../components/lists/ListItem";
import Text from "../../components/Text";
import defaultStyles from "../../config/styles";

import HTML from "react-native-render-html";

function ResourceScreen({ route }) {
  const { colors, isDark } = useTheme();
  // const { item, date, imageSource } = route.params;
  const transcript = `<p><span><strong>The Study Bible</strong></span></p><p> <span><br /></span></p><p> <span >The Study Bible website and apps give you a wealth of resources from John MacArthur and Grace to You to help you understand and apply God’s Word. With multiple trustworthy texts of Scripture, The Study Bible gives you immediate access to Grace to You’s sermon archive, featuring nearly fifty years of John’s Bible teaching (well over 3,000 full-length messages) that cover the entire New Testament and portions of the Old.</span ></p><p> <span><br /></span></p><p><span>With The Study Bible you can:</span></p><p> <span><br /></span></p><ul> <li> <span>Read or listen to Scripture</span> </li> <li> <span >Access all of John MacArthur’s Bible teaching on the passage you’re reading</span > </li> <li> <span >Highlight Bible passages, add your own study notes, and save favorite verses</span > </li> <li> <span >Synchronize personal data across multiple devices through the website and app</span > </li></ul><p> <span><br /></span></p><p> <span >With the purchase of the notes from The MacArthur Study Bible, you’ll have access to nearly 25,000 detailed comments by John MacArthur that explain virtually every passage of God’s Word. Along with the notes are dozens of articles, charts, maps, introductions to each book of the Bible, and more.</span ></p><p> <span><br /></span></p><p> <span style= ><strong>John MacArthur &amp; Grace to You<strong></span ></p><p> <span><br /></span></p><p> <span >Grace to You is the media ministry of John MacArthur—pastor-teacher of Grace Community Church in Sun Valley, California; president of The Master’s University and Seminary; and featured teacher of the “Grace to You” radio program. Grace to You’s audio, video, print, and website resources reach millions worldwide each day.</span ></p><p> <span><br /></span></p><p> <span>Click here to find out more about Grace to You.</span></p><p> <span><br /></span></p><p><strong> <span style= >Copyright</span ></strong></p><p> <span><br /></span></p><p> <span ><strong>The Holy Bible, English Standard Version® (ESV®)</strong></span ></p><p> <span><br /></span></p><p> <span >Copyright © 2001 by Crossway, a publishing ministry of Good News Publishers.</span ></p><p> <span>All Rights Reserved</span></p><p> <span>ESV Permanent Text Edition (2016)</span></p><p> <span><br /></span></p><p> <span ><strong>New American Standard Bible®</strong></span ></p><p> <span><br /></span></p><p> <span >Copyright © 1960, 1962, 1963, 1968, 1971, 1972, 1973, 1975, 1977, 1995 by</span ></p><p> <span>The Lockman Foundation</span></p><p> <span>A Corporation Not for Profit</span></p><p> <span>La Habra, CA</span></p><p> <span>www.lockman.org</span></p><p> <span>All Rights Reserved</span></p><p> <span><br /></span></p><p> <span ><strong>The MacArthur Study Bible</strong></span ></p><p> <span><br /></span></p><p> <span>Copyright© 1997 by Thomas Nelson, Inc. All rights reserved</span></p><p> <span><br /></span></p><p> <span ><strong>Grace to You Resources</strong></span ></p><p> <span><br /></span></p><p> <span >For copyright information for Grace to You resources, please visit www.gty.org/about#copyright</span ></p><p> <span><br /></span></p><p> <span>-</span></p>`;

  const styles = StyleSheet.create({
    detailsContainer: {
      backgroundColor: colors.white,
      // borderColor: colors.light,
      borderWidth: 0.3,
      paddingHorizontal: 25,
    },
    image: {
      alignSelf: "center",
      // aspectRatio: 1.2,
      backgroundColor: "green",
      width: "60%",
      height: 400,
    },

    date: {
      backgroundColor: "yellow",
      fontSize: 18,
      fontStyle: "italic",
      textAlign: "right",
      paddingTop: 15,
    },
    header: {
      // alignItems: "flex-start",
      backgroundColor: "orange",
      // justifyContent: "center",
      // marginVertical: 10,
    },
    scripture: {
      color: colors.secondary,
      fontWeight: "bold",
      fontSize: 18,
    },
    title: {
      fontSize: 22,
      fontWeight: "bold",
    },
    transcript: {
      // fontSize: 20,
    },
    userContainer: {
      backgroundColor: colors.white,
      marginVertical: 15,
    },
  });

  return (
    <StretchyScrollView
      backgroundColor={colors.white}
      image={require("../../assets/gtylogo.jpg")}
      imageHeight={250}
      imageResizeMode={"contain"}
    >
      <View style={styles.detailsContainer}>
        {/* <Text style={styles.date}>{date}</Text>
        <View style={styles.header}>
          <Text style={styles.title}>{"The Study Bible"}</Text>
          {item.scripture != "" && (
            <Text style={styles.scripture}>{item.scripture}</Text>
          )}
        </View>

        <View style={styles.userContainer}>
          <ListItem
            image={require("../../assets/gtylogo.jpg")}
            title={item.author ? item.author : "John MacArthur"}
            subTitle="5 resources"
          />
        </View> */}
        <HTML
          source={{
            html: transcript,
          }}
          baseFontStyle={defaultStyles.bibleText}
        />

        <View
          style={{
            height: 70,
          }}
        />
      </View>
    </StretchyScrollView>
  );
}

export default ResourceScreen;
