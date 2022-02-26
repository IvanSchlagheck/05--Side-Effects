import React, { useContext } from "react";

import Login from "./components/Login/Login";
import MainHeader from "./components/MainHeader/MainHeader";
import AuthContext from "./context/auth-context";
import Market from "./Market/Market";

function App() {
  const ctx = useContext(AuthContext);

  return (
    <React.Fragment>
      <MainHeader />
      <main>
        {!ctx.isLoggedIn && <Login />}
        {ctx.isLoggedIn && <Market />}
      </main>
    </React.Fragment>
  );
}

export default App;
