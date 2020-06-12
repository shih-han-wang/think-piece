import React, { Component } from "react";
import { auth, firestore, createUserProfileDoc } from "../firebase";

import Posts from "./Posts";
import Authentication from "./Authentication";
import { collectIdsAndDocs } from "../utilities";

class Application extends Component {
  state = {
    posts: [],
    user: null,
  };

  unsubscribeFromFirestore = null;
  unsubscribeFromAuth = null;

  componentDidMount = async () => {
    this.unsubscribeFromFirestore = firestore.collection("posts").onSnapshot((snapshot) => {
      const posts = snapshot.docs.map(collectIdsAndDocs);
      this.setState({ posts });
    });

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      const user = await createUserProfileDoc(userAuth);
      console.log(user);
      this.setState({ user });
    });
  };

  componentWillUnMount = () => {
    this.unsubscribeFromFirestore();
    this.unsubscribeFromAuth();
  };

  render() {
    const { posts, user } = this.state;

    return (
      <main className="Application">
        <Authentication user={user} />
        <h1> Think Piece </h1>
        <Posts posts={posts} />
      </main>
    );
  }
}

export default Application;
