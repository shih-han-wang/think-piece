import React, { Component, createContext } from "react";
import { auth, createUserProfileDoc } from "../firebase";

const UserContext = createContext();

class UserProvider extends Component {
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
    const { children } = this.props;
    return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
  }
}

export { UserContext };
export default UserProvider;
