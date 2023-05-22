import React from "react";
import LoginButton from "../components/LoginButton";
import LogoutButton from "../components/LogoutButton";
import Profile from "../components/Profile";

function Navbar() {
  return (
    <section>
      <LoginButton />
      <LogoutButton />
      <Profile />
    </section>
  );
}

export default Navbar;
