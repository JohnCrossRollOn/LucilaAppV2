import { PopUp, getCheckoutUrl } from "./utils";
import { useDocumentData } from "react-firebase-hooks/firestore";
import * as fire from "../fire";
import { doc } from "firebase/firestore";
import { useEffect, useState } from "react";

export const Payment = () => {
  const [checkoutUrl, setCheckoutUrl] = useState(null);
  const preference = {
    title: "Combo de pestañas",
    amount: 500,
    user: "gutierrez_alfarfa@gmail.com",
    appointment_id: "cV9gkT6ftUSebaVXABKD",
    payment_type: "half_price",
  };
  useEffect(() => {
    checkoutUrl
      ? null
      : getCheckoutUrl(preference)
          .then(setCheckoutUrl)
          .catch(() => setCheckoutUrl({ error: "Error" }));
  }, []);
  return checkoutUrl?.error ? (
    <div className="btn btn-error btn-outline">{checkoutUrl.error}</div>
  ) : checkoutUrl ? (
    <PopUp url={checkoutUrl}>Pagar</PopUp>
  ) : (
    <div className="btn btn-primary btn-outline loading">Aguarde</div>
  );
};

const Step = {
  prev: ({ children, minmax, data }) => (
    <button
      className={`btn btn-ghost ${data[0] === minmax[0] ? "btn-disabled" : ""}`}
      onClick={() => data[1](data[0] > minmax[0] ? data[0] - 1 : data[0])}
    >
      {children}
    </button>
  ),
  next: ({ children, minmax, data }) => (
    <button
      className={`btn btn-ghost ${data[0] === minmax[1] ? "btn-disabled" : ""}`}
      onClick={() => data[1](data[0] < minmax[1] ? data[0] + 1 : data[0])}
    >
      {children}
    </button>
  ),
  list: ({ currentStep, steps, className }) => (
    <ul className={`steps w-full ${className}`}>
      {steps.map((step, index) => (
        <li
          key={index}
          className={`step ${index <= currentStep ? "step-primary" : ""}`}
        >
          {step}
        </li>
      ))}
    </ul>
  ),
};
export default () => {
  const [value, loading] = useDocumentData(
    doc(fire.stor, "appointments", "cV9gkT6ftUSebaVXABKD")
  );
  const [step, setStep] = useState(0);
  return (
    <div className="w-full top-0 bottom-0 flex flex-col justify-between flex-1">
      <Step.list
        steps={["Servicio", "Turno", "Pago"]}
        className="mt-4"
        currentStep={step}
      />
      <div className="navbar flex flex-row justify-between">
        <Step.prev minmax={[0, 2]} data={[step, setStep]}>
          Volver
        </Step.prev>
        <Step.next minmax={[0, 2]} data={[step, setStep]}>
          Siguiente
        </Step.next>
      </div>
    </div>
  );
};
