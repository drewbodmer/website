import React from "react";
import "./App.css";
import { NavbarComponent } from "./components/Navbar/Navbar";
// import About from "./components/TabComponents/AboutComponent";
import { About } from "./components/About/About";
// import Blog from "./components/TabComponents/BlogComponent";
import Blog from "./components/BlogComponent1/BlogComponent";
import { SearchTracking } from "./components/Projects/searchTracking";
import { Dcgan } from "./components/Projects/DCGAN";
import { TokenContext } from "./context/GlobalState";
import { SoftwareEngineering, DataScience } from "./components/TabComponents/Resumes";
import { Home } from "./components/Home/Home";
import 'bootstrap/dist/css/bootstrap.min.css';
// import { useEffect, useState } from "react";
import { Slideshow } from "./components/Background/Background";

function App() {
  let [token, _] = React.useState("");
  // function handleLogin(token: string) {
  //   setToken(token);
  //   localStorage.setItem('token', token);
  // }
  // const getStyles = (): string => { if (tab === "home" || tab === "") { return "background" } else { return "App background" } }

  const [tab, setTab] = React.useState("");
  const getTab = () => {
    if (tab === "about") {
      return <About />;
    } else if (tab === "blog") {
      // return <Blog />;
      return <Blog />;
    } else if (tab === "home") {
      return <Home />;
      // } else if (tab === "login") {
      //   return <Login login={handleLogin} />
      // } else if (tab === "logout") {
      //   localStorage.setItem('token', "");
      //   return <SearchUpload />
    } else if (tab === "searchTracking") {
      return <SearchTracking />
    } else if (tab === "dcgan") {
      return <Dcgan />
    } else if (tab === "dsresume") {
      return <DataScience />
    } else if (tab === "csresume") {
      return <SoftwareEngineering />
    } else {
      return <Home />;
    }
  };


  return (
    <div className="App">
        <TokenContext.Provider value={{ token: token }}>
          <NavbarComponent
            changeTab={(newTab: any) => {
              setTab(newTab);
            }}
          />
        </TokenContext.Provider>
    <div className="Home">
      <Slideshow tab={tab}/>
      <div className="App-content">
        {getTab()}
      </div>
    </div>
    </div>
  );
}
export default App;
