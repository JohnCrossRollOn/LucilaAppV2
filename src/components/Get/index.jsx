import { useState } from "react";

import Services from "./Services";

const isAdmin = true;

const Step = ({ currentStep, steps, className }) => (
  <ul className={`steps w-full ${className}`}>
    {steps.map((step, index) => (
      <li
        key={index}
        className={`step ${index <= currentStep ? "step-primary" : ""}`}
        onClick={() => console.log(index)}
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
  // console.log(services?.docs[0].data());
  const [step, setStep] = useState({ current: 0, data: [] });
  const next = (value) => {
    console.log(value);
    setStep((p) => ({ ...p, data: [...p.data, value] }));
  };
  return (
    <div className="w-full top-0 bottom-0 flex flex-col justify-between flex-1">
      <Step
        steps={["Servicio", "Turno", "Pago"]}
        className="mt-4"
        currentStep={step.current}
      />
      <div className="flex-1 p-4 flex flex-col gap-4">
        {
          [
            <>
              <div className="text-xl font-semibold">
                Seleccione un turno porfavor.
                <h6 className="text-sm font-light">Es posible señar.</h6>
              </div>
              <Services {...{ next, isAdmin }} />
            </>,
            <>
              <h2 className="text-xl font-semibold">Seleccione un turno</h2>
            </>,
            <>
              <h2 className="text-xl font-semibold">
                Seleccione un metodo de pago
              </h2>
            </>,
          ][step.current]
        }
      </div>
    </div>
  );
};
