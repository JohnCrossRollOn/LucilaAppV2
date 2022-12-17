import Get from "./components/Get";
import Nav from "./components/NavBar";
import { Routes, Route } from "react-router-dom";
import Landing from "./components/Landing";

export default () => {
  return (
    <div
      data-theme="cupcake"
      className="flex flex-col h-screen w-screen snap-y snap-mandatory overflow-y-scroll scrollbar-hide lg:px-16 xl:px-32"
    >
      <Nav />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/get" element={<Get />} />
      </Routes>
    </div>
  );
};
