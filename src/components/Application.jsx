import React, { Component } from "react";
import { auth, createUserProfileDoc } from "../firebase";

import Posts from "./Posts";
import Authentication from "./Authentication";

class Application extends Component {
  state = {
    user: null,
  };

  unsubscribeFromAuth = null;

  componentDidMount = async () => {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      const user = await createUserProfileDoc(userAuth);
      this.setState({ user });
    });
  };

  componentWillUnMount = () => {
    this.unsubscribeFromAuth();
  };

  render() {
    const { user } = this.state;

    return (
      <main className="Application">
        <Authentication user={user} />
        <h1> Think Piece </h1>
        <Posts />
      </main>
    );
  }
}

export default Application;
