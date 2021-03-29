import React, {
  Component,
  PureComponent,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  FlatList,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

import userMarkup from "../api/userMarkup";

import { useTheme } from "../config/ThemeProvider";
import AppText from "../components/Text";
import PanelBox from "../components/PanelBox";
import VerseFormatted from "../components/VerseFormatted";
import useAuth from "../auth/useAuth";
import referenceCode from "../hooks/referenceCode";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function Reference({ book, fontFamily, fontSize, reference }) {
  const { colors } = useTheme();
  const myStyle = {
    color: colors.text,
    fontFamily: fontFamily,
    fontSize: fontSize * 1.1,
    fontWeight: "bold",
    textAlign: "left",
  };

  return <AppText style={myStyle}>{book + " " + reference}</AppText>;
}

const goToVerse = () => {};

class VerseHyperlink extends PureComponent {
  constructor(props) {
    super(props);
  }

  styles = {
    verseLink: {
      color: "#00aeef",
    },
  };

  render() {
    const { cr } = this.props;
    return (
      <TouchableOpacity onPress={goToVerse}>
        <AppText style={this.styles.verseLink}>{cr["text"] + ",\t\t"}</AppText>
      </TouchableOpacity>
    );
  }
}

function CrossRef({ myObject }) {
  const { colors } = useTheme();

  return (
    <View style={{ flexDirection: "row", paddingVertical: 10 }}>
      <AppText style={{ color: colors.text }}>
        {myObject["title"] + "\t"}
      </AppText>
      <View style={{ flexWrap: "wrap", flexDirection: "row" }}>
        {Array.isArray(myObject["refs"]["ref"]) ? (
          myObject["refs"]["ref"].map((cr) => (
            <VerseHyperlink key={cr["for"]} cr={cr} />
          ))
        ) : (
          <VerseHyperlink key={myObject["for"]} cr={myObject["refs"]["ref"]} />
        )}
      </View>
    </View>
  );
}

class VerseText extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { highlight, style, text } = this.props;

    return (
      <Text style={style}>
        <Text
          style={highlight ? { backgroundColor: highlight.class_name } : {}}
        >
          {text}
        </Text>
      </Text>
    );
  }
}

class Favorite extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    favorite: null,
  };

  toggleFavorite = async () => {
    if (this.state.favorite) {
      this.setState({ favorite: null });

      if (this.state.favorite.id > 0) {
        console.log("deleting this:", this.state.favorite);
        const result = await userMarkup.deleteUserMarkup(
          this.state.favorite.id,
          this.props.user.sub,
          "favorite"
        );

        if (!result.ok) {
          // setUploadVisible(false);
          console.log(result);
          return alert("Could not delete the favorite.");
        } else {
          console.log("deleted favorite with id:", this.props.favorite.id);
        }
      }
    } else {
      this.setState({
        favorite: {
          id: 0,
          end_ref: 45012021,
          start_ref: 45012021,
        },
      });

      const result = await userMarkup.addUserMarkup(
        {
          end_ref: this.props.referenceFilter,
          start_ref: this.props.referenceFilter,
        },
        this.props.user.sub,
        "favorite"
      );

      if (!result.ok) {
        return alert("Could not create the note.");
      } else {
        console.log("created favorite with id:", result.data);
      }
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.favorite !== this.props.favorite &&
      this.props.favorite !== this.state.favorite
    ) {
      // console.log("change favorite state");
      this.setState({ favorite: this.props.favorite });
    }
  }

  render() {
    return this.state.favorite ? (
      <MaterialCommunityIcons name={"heart"} color={"red"} size={24} />
    ) : null;
  }
}

export default function StudyScreen({
  carousel,
  currentBook,
  favoriteRef,
  fontFamily,
  fontSize,
  verseList,
  width,
}) {
  const { colors } = useTheme();
  const { user } = useAuth();
  const auth = useAuth();

  const [currentNotes, setCurrentNotes] = useState([]);
  const [currentFavorites, setCurrentFavorites] = useState([]);
  const [currentHighlights, setCurrentHighlights] = useState();

  const [currentReference, setCurrentReference] = useState("1 : 1");
  const [currentCrossrefs, setCurrentCrossrefs] = useState([]);
  const [referenceFilter, setReferenceFilter] = useState("01001001");
  const [currentJohnsNote, setCurrentJohnsNote] = useState([]);

  useEffect(() => {
    async function fetchUserMarkup() {
      const userMarkup = await auth.getUserMarkup(user);
      if (userMarkup) {
        console.log("User markup loaded");
        setCurrentNotes(userMarkup.notes);
        setCurrentFavorites(userMarkup.favorites);
        setCurrentHighlights(userMarkup.highlights);
      }
    }
    fetchUserMarkup();
  }, []);

  const getItemLayout = (data, index) => ({
    length: width,
    offset: width * index,
    index,
  });

  const keyExtractor = (item, index) => item + index;

  const renderVerseCardItem = ({ item }) => {
    let myReferenceCode = referenceCode(item.chapter, item.title);

    let highlight = currentHighlights
      ? currentHighlights.find((h) => h.start_ref == myReferenceCode)
      : null;

    // let myFavorite = currentFavorites
    //   ? currentFavorites.find((f) => f.start_ref == myReferenceCode)
    //   : null;

    return (
      <VerseText
        highlight={highlight}
        style={styles.verseTextBox}
        text={item.content}
      />
    );
  };

  const onViewRef = useRef((viewableItems) => {
    if (viewableItems.viewableItems[0]) {
      const v = viewableItems.viewableItems[0];

      setCurrentReference(v.item.chapter + " : " + v.item.title);
      setCurrentCrossrefs(v.item.crossrefs);
      setReferenceFilter(
        "01" +
          ("000" + v.item.chapter).substr(-3) +
          ("000" + v.item.title).substr(-3)
      );
      setCurrentJohnsNote(v.item.johnsNote);
    }
    // Use viewable items in state or as intended
  });
  const viewConfigRef = useRef({
    waitForInteraction: true,
    // At least one of the viewAreaCoveragePercentThreshold or itemVisiblePercentThreshold is required.
    // viewAreaCoveragePercentThreshold: 95,
    itemVisiblePercentThreshold: 75,
  });

  const styles = StyleSheet.create({
    referenceBox: {
      // alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-between",
      paddingLeft: 30,
      paddingRight: 60,
      paddingVertical: fontSize,
      width: width,
    },
    verseTextBox: {
      color: colors.text,
      fontFamily: fontFamily,
      fontSize: fontSize,
      lineHeight: fontSize * 2,
      paddingBottom: fontSize,
      paddingHorizontal: 30,
      width: width,
    },
  });

  return (
    <>
      <View style={styles.referenceBox}>
        <Reference
          book={currentBook.label}
          reference={currentReference}
          fontFamily={fontFamily}
          fontSize={fontSize}
        />
        <Favorite
          favorite={currentFavorites.find(
            (f) => f.start_ref == referenceFilter
          )}
          ref={favoriteRef}
          referenceFilter={referenceFilter}
          user={user}
        />
      </View>
      <FlatList
        bounces={false}
        data={verseList}
        decelerationRate={"fast"}
        // extraData={this.state}
        getItemLayout={getItemLayout}
        horizontal={true}
        initialNumToRender={5}
        keyExtractor={keyExtractor}
        maxToRenderPerBatch={3}
        onViewableItemsChanged={onViewRef.current}
        ref={carousel}
        removeClippedSubviews
        renderItem={renderVerseCardItem}
        // scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        snapToAlignment={"center"}
        snapToInterval={width}
        updateCellsBatchingPeriod={25}
        viewabilityConfig={viewConfigRef.current}
        windowSize={11}
      />
      <View
        style={{
          marginHorizontal: 30,
        }}
      >
        {Array.isArray(currentCrossrefs) ? (
          currentCrossrefs.map((crossref) => (
            <CrossRef key={crossref["id"]} myObject={crossref} />
          ))
        ) : currentCrossrefs["title"] == "" ? null : (
          <CrossRef myObject={currentCrossrefs} />
        )}
      </View>
      <View style={{ paddingHorizontal: 25 }}>
        <PanelBox
          referenceFilter={referenceFilter}
          fontSize={fontSize}
          notes={currentNotes.filter(
            (m) => m.refs[0].start_ref == referenceFilter
          )}
          johnsNote={currentJohnsNote}
        ></PanelBox>
      </View>
    </>
  );
}
