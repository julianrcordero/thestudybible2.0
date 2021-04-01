import React, { Component } from "react";

import userMarkup from "../api/userMarkup";

import { MaterialCommunityIcons } from "@expo/vector-icons";

export default class Favorite extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    favorite: null,
  };

  toggleFavorite = async () => {
    if (this.state.favorite) {
      let theFavorite = this.state.favorite;
      this.setState({ favorite: null });
      const newCache = this.props.currentFavorites.filter(
        (f) => f.start_ref != this.props.referenceFilter
      );

      this.props.setCurrentFavorites(newCache);

      if (theFavorite.id > 0) {
        const result = await userMarkup.deleteUserMarkup(
          theFavorite.id,
          this.props.user.sub,
          "favorite"
        );

        if (!result.ok) {
          console.log(result);
        } else {
          console.log(
            "deleted favorite with id:",
            theFavorite.id,
            "on ",
            theFavorite.start_ref
          );
        }
      }
    } else {
      let dummyFavorite = {
        end_ref: this.props.referenceFilter,
        start_ref: this.props.referenceFilter,
      };

      this.setState({ favorite: dummyFavorite });

      const result = await userMarkup.addUserMarkup(
        dummyFavorite,
        this.props.user.sub,
        "favorite"
      );

      let newFavorite = {
        id: result ? result.data : 0,
        ...dummyFavorite,
      };

      this.setState({
        favorite: newFavorite,
      });

      this.props.setCurrentFavorites([
        ...this.props.currentFavorites,
        newFavorite,
      ]);

      if (!result.ok) {
        return alert("Could not create the note.");
      } else {
        console.log(
          "created favorite with id:",
          result.data,
          "on ",
          newFavorite.start_ref
        );
      }
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.favorite !== this.props.favorite &&
      this.props.favorite !== this.state.favorite
    ) {
      this.setState({ favorite: this.props.favorite });
    }
  }

  render() {
    return this.state.favorite &&
      this.state.favorite.start_ref == this.props.referenceFilter ? (
      <MaterialCommunityIcons name={"heart"} color={"red"} size={24} />
    ) : null;
  }
}
