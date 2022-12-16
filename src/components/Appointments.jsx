import { PopUp, getCheckoutUrl } from "./utils";
import { useDocumentData } from "react-firebase-hooks/firestore";
import * as fire from "../fire";
import { doc } from "firebase/firestore";
import { useEffect, useState } from "react";

export default () => {
  const [checkoutUrl, setCheckoutUrl] = useState(null);
  const [value, loading] = useDocumentData(
    doc(fire.stor, "appointments", "cV9gkT6ftUSebaVXABKD")
  );
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
  return (
    <>
      <div className="card">
        <div className="card-body">
          <div className="card-title">
            Este es el boton de pago
            {loading ? (
              <div className="badge badge-primary animate-pulse"></div>
            ) : (
              <div className="badge badge-primary badge-outline">
                {value?.status}
              </div>
            )}
          </div>
          <div className="card-actions justify-end">
            {checkoutUrl?.error ? (
              <div className="btn btn-error btn-outline">
                {checkoutUrl.error}
              </div>
            ) : checkoutUrl ? (
              <PopUp url={checkoutUrl}>Pagar</PopUp>
            ) : (
              <div className="btn btn-primary btn-outline loading">Aguarde</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
