import { useNavigate } from "react-router-dom";

export const Snap = ({ children }) => (
  <div className="hero h-full w-full snap-center snap-always">{children}</div>
);

export const Jumbotron = () => {
  const navigate = useNavigate();
  return (
    <div className="hero-content flex-col lg:flex-row">
      <img
        src="https://th.bing.com/th/id/OIP.XlfldlLBvuw1jqf2R255QAHaDz?pid=ImgDet&rs=1"
        className="rounded-lg shadow-lg"
      />
      <div>
        <h1 className="text-5xl font-bold">El lugar para tus pestañas!</h1>
        <p className="py-8">
          Mira nuestros turnos, seña o pagá, y en unos dias te vas a ver
          preciosa!
        </p>
        <div className="flex flex-row gap-4">
          <button className="btn btn-primary" onClick={() => navigate("/get")}>
            Quiero un turno!
          </button>
          <button className="btn btn-primary btn-outline">servicios</button>
        </div>
      </div>
    </div>
  );
};

export default () => {
  return (
    <>
      <Snap>
        <Jumbotron />
      </Snap>
    </>
  );
};
