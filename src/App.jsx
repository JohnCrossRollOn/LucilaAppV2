import Appointments from "./components/Appointments";
import Nav from "./components/NavBar";
import { Routes, Route } from "react-router-dom";
import Landing from "./components/Landing";

export default () => {
  return (
    <div className="" data-theme="cupcake">
      <div className="h-screen snap-y snap-mandatory overflow-y-scroll scrollbar-hide">
        <Nav />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/appointments" element={<Appointments />} />
        </Routes>
      </div>
    </div>
  );
};
