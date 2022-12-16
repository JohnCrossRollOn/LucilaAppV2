import Appointments from "./components/Appointments";
import Nav from "./components/NavBar";
import { Routes, Route } from "react-router-dom";
import Landing from "./components/Landing";

export default () => {
  return (
    <div
      data-theme="cupcake"
      className="flex flex-col h-screen w-screen snap-y snap-mandatory overflow-y-scroll scrollbar-hide"
    >
      <Nav />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/get" element={<Appointments />} />
      </Routes>
    </div>
  );
};
