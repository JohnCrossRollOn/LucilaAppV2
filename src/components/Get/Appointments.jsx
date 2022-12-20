import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import { useRef, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";

import * as fire from "../../fire";
import { Collapsable } from "../utils";
import { isAdmin } from "../utils";

const collectionOfAppointments = collection(fire.stor, "appointments");

const groupByDate = (appointments) => {
  let dates = {};
  for (let appointment of appointments) {
    let date = new Date(
      appointment.data().scheduledAt.seconds * 1000
    ).toISOString();
    dates[date] = dates[date] ? [...dates[date], appointment] : [appointment];
  }
  return dates;
};

const AppointmentList = ({
  next = (e) => {
    console.log(e);
  },
}) => {
  const [appointments, loading, error] = useCollection(
    collectionOfAppointments
  );
  return error ? (
    <div>{JSON.stringify(error.message)}</div>
  ) : loading ? (
    [...Array(3)].map((s, i) => (
      <Collapsable
        className="animate-pulse bg-base-200 collapse-close"
        key={i}
      ></Collapsable>
    ))
  ) : (
    Object.entries(groupByDate(appointments.docs)).map(
      ([date, appointments]) => (
        <Collapsable>
          <div className="text-xl font-semibold">
            {new Date(date).toLocaleDateString()}
          </div>
          <div>
            {appointments.map((appointment) => {
              const { status, user, scheduledAt } = appointment.data();

              const deleteAppointment = async (e) => {
                await deleteDoc(doc(collectionOfAppointments, e.target.id));
              };
              return (
                <Collapsable key={appointment.id}>
                  <div className="flex justify-between">
                    <h2>&#x2022; {status}</h2>
                    <h2>
                      {new Date(
                        scheduledAt.seconds * 1000
                      ).toLocaleTimeString()}
                    </h2>
                  </div>
                  <div className="flex flex-col gap-4">
                    <p>
                      Turno para las pestañas un{" "}
                      {new Date(date).toLocaleDateString()} a las
                      {new Date(
                        scheduledAt.seconds * 1000
                      ).toLocaleTimeString()}
                    </p>
                    <div className="self-end flex gap-4">
                      {isAdmin() ? (
                        <button
                          className="btn btn-secondary btn-sm"
                          id={appointment.id}
                          onClick={deleteAppointment}
                        >
                          Borrar
                        </button>
                      ) : (
                        <>
                          <button
                            className="btn btn-primary btn-ghost btn-sm"
                            onClick={() =>
                              next({
                                payment_type: "half_price",
                                service_id: appointment.id,
                                amount: half_price,
                              })
                            }
                          >
                            señar
                          </button>
                          <button
                            className="btn btn-primary btn-sm"
                            onClick={() =>
                              next({
                                payment_type: "full_price",
                                service_id: appointment.id,
                                amount: full_price,
                              })
                            }
                          >
                            Lo quiero!
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </Collapsable>
              );
            })}
          </div>
        </Collapsable>
      )
    )
  );
};
const ServiceAdd = () => {
  const [status, setStatus] = useState(null);
  const modalRef = useRef(null);

  const addService = (e) => {
    e.preventDefault();

    const data = [...e.target].reduce(
      (p, { id, value, type }) =>
        type === "submit"
          ? p
          : {
              ...p,
              [id]: type === "number" ? Number(value) : value,
            },
      {}
    );
    setStatus("loading");
    addDoc(collectionOfAppointments, data)
      .then(() => {
        modalRef.current.checked = false;
        setStatus("done");
      })
      .catch(() => setStatus("error"));
  };
  return (
    <>
      <label
        htmlFor="service_add_modal"
        className="btn btn-sm btn-secondary btn-block btn-outline"
      >
        Agregar Servicio
      </label>
      <input
        ref={modalRef}
        type="checkbox"
        id="service_add_modal"
        className="modal-toggle"
      />

      <label
        htmlFor="service_add_modal"
        className="modal modal-bottom sm:modal-middle"
      >
        <label className="modal-box" htmlFor="">
          <h3 className="font-bold text-lg">Crear Servicio</h3>
          <p className="py-4">
            Aca irian los campos necesarios para la creacion de un servicio.
          </p>
          <form className="flex flex-col gap-2" onSubmit={addService}>
            <input
              type="text"
              placeholder="Titulo"
              id="title"
              className="input input-bordered w-full input-sm font-bold"
              required
            />
            <textarea
              placeholder="Descripcion"
              id="description"
              className="textarea textarea-bordered rounded-2xl font-light"
              required
            />
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Precio-$$$"
                id="full_price"
                className="input input-bordered w-full input-sm "
                required
              />
              <input
                type="number"
                placeholder="Seña-$"
                id="half_price"
                className="input input-bordered w-full input-sm "
                required
              />
            </div>

            <div className="modal-action">
              {status === "loading" ? (
                <div className="btn btn-square btn-secondary btn-outline loading" />
              ) : (
                <input
                  type="submit"
                  className="btn btn-secondary"
                  value="Agregar"
                />
              )}
            </div>
          </form>
        </label>
      </label>
    </>
  );
};
export default ({ next }) => {
  return (
    <>
      <AppointmentList next={next} />
      {isAdmin() && <ServiceAdd />}
    </>
  );
};
