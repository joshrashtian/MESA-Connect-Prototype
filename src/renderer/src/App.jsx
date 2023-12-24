import { Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";
import Navigation from "./components/Navigation";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Onboarding from "./components/Onboarding";
import ProfileScreen from "./components/ProfileScreen";
import Social from "./components/Social";
import Activity from "./components/Social/Activity";

function App() {

  return (
    <>
    <nav>
      <h1 className="text-center font-eudoxusbold mt-2 text-white ">MESA Connect</h1>
    </nav>
    <div className="flex">
    <Navigation />
    <div className=" ml-24 w-screen ">
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/signIn" element={<SignIn />}/>
        <Route path="/signup" element={<SignUp />}/>
        <Route path="/onboarding" element={<Onboarding />}/>
        <Route path="/social" element={<Social />}>
          <Route path="" element={<Activity />} />
          <Route path=":id" element={<ProfileScreen />}/>
        </Route>
        {/*<Route path="/news" element={<News />}/> */}
      </Routes>
      </div>
    </div>
    </>
  )
}

export default App
