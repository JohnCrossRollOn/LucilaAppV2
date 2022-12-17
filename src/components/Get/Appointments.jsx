import { PopUp, getCheckoutUrl } from "../utils";
import { useCollection, useDocumentData } from "react-firebase-hooks/firestore";
import * as fire from "../../fire";
import { collection, doc } from "firebase/firestore";
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
