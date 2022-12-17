import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import { useRef, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";

import * as fire from "../../fire";
import { Collapsable } from "../utils";
import { isAdmin } from "../utils";

const collectionOfServices = collection(fire.stor, "services");

const ServiceList = ({
  next = (e) => {
    console.log(e);
  },
}) => {
  const [services, loading, error] = useCollection(collectionOfServices);

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
    services.docs.map((service) => {
      const { title, full_price, half_price, description } = service.data();
      const deleteService = async (e) => {
        await deleteDoc(doc(collectionOfServices, e.target.id));
      };
      return (
        <Collapsable key={service.id}>
          <div className="flex justify-between">
            <h2>&#x2022; {title}</h2>
            <h2>${full_price}</h2>
          </div>
          <div className="flex flex-col gap-4">
            <p>{description}</p>
            <p className="text-sm flont-ight">seña &#x2022; ${half_price}</p>
            <div className="self-end flex gap-4">
              {isAdmin() ? (
                <button
                  className="btn btn-secondary btn-sm"
                  id={service.id}
                  onClick={deleteService}
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
                        service_id: service.id,
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
                        service_id: service.id,
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
    })
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
    addDoc(collectionOfServices, data)
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
      <ServiceList next={next} />
      {isAdmin() && <ServiceAdd />}
    </>
  );
};
