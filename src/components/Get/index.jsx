import { useEffect, useState } from "react";

import Services from "./Services";
import Appointments from "./Appointments";
import { isAdmin } from "../utils";

const Step = ({ currentStep, steps, goTo, className }) =>
  isAdmin() ? (
    <ul className={`tabs tabs-boxed flex justify-evenly mx-4 ${className}`}>
      {steps.map((step, index) => (
        <li
          key={index}
          className={`tab ${index === currentStep ? "tab-active" : ""}`}
          onClick={() => {
            goTo(index);
          }}
        >
          {step}
        </li>
      ))}
    </ul>
  ) : (
    <ul className={`steps w-full ${className}`}>
      {steps.map((step, index) => (
        <li
          key={index}
          className={`step ${index <= currentStep ? "step-primary" : ""}`}
          onClick={() => (index >= currentStep ? null : goTo(index))}
        >
          {step}
        </li>
      ))}
    </ul>
  );

export default () => {
  // const [value, loading] = useDocumentData(
  //   doc(fire.stor, "appointments", "cV9gkT6ftUSebaVXABKD")
  // );

  const [step, setStep] = useState({ current: 0, data: [] });

  useEffect(() => {
    console.log(step);
  }, [step]);

  const next = (value) => {
    setStep((p) => ({
      ...p,
      current: p.current + 1,
      data: [...p.data, value],
    }));
  };

  const goTo = (value) => {
    setStep((p) => ({
      ...p,
      current: value,
      data: p.data.slice(0, value),
    }));
  };
  return (
    <div className="w-full top-0 bottom-0 flex flex-col justify-between flex-1">
      <Step
        steps={["Servicio", "Turno", "Pago"]}
        className="mt-4"
        currentStep={step.current}
        goTo={goTo}
      />
      <div className="flex-1 p-4 flex flex-col gap-4">
        {
          [
            <>
              {isAdmin() ? (
                <h2 className="text-xl font-semibold">Modificar Servicios</h2>
              ) : (
                <div className="text-xl font-semibold">
                  Que le gustaria hacerse?.
                  <h6 className="text-sm font-light">Es posible señar.</h6>
                </div>
              )}
              <Services next={next} />
            </>,
            <>
              {isAdmin() ? (
                <h2 className="text-xl font-semibold">Modificar Turnos</h2>
              ) : (
                <div className="text-xl font-semibold">
                  En que momento podria?
                  <h6 className="text-sm font-light">Saque turno.</h6>
                </div>
              )}
              <Appointments next={next} />
            </>,
            <>
              {isAdmin() ? (
                <h2 className="text-xl font-semibold">Modificar Pagos</h2>
              ) : (
                <div className="text-xl font-semibold">
                  Seleccione su metodo de pago.
                  <h6 className="text-sm font-light">
                    Pagos seguros a traves de MercadoPago.
                  </h6>
                </div>
              )}
            </>,
          ][step.current]
        }
      </div>
    </div>
  );
};
