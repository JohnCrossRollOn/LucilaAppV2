export const Jumbotron = () => {
  return (
    <div className="hero relative h-screen w-screen snap-center snap-always">
      <div className="hero-content flex-col lg:flex-row">
        <img
          src="https://th.bing.com/th/id/OIP.XlfldlLBvuw1jqf2R255QAHaDz?pid=ImgDet&rs=1"
          className="rounded-lg shadow-lg"
        />
        <div>
          <h1 className="text-5xl font-bold">El lugar para tus pestañas!</h1>
          <p className="py-6">
            Mira nuestros turnos, seña o pagá, y en unos dias te vas a ver
            preciosa!
          </p>
          <div className="flex flex-row gap-4">
            <button className="btn btn-primary">Quiero un turno!</button>
            <button className="btn btn-primary btn-outline">servicios</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default () => {
  return (
    <>
      <Jumbotron />
      <Jumbotron />
      <Jumbotron />
      <Jumbotron />
      <Jumbotron />
    </>
  );
};
