import { PopUp } from "../utils";

export default () => {
  return (
    <>
      <div className="card bg-slate-200">
        <div className="card-body">
          <p className="card-title">Este es el boton de pago</p>
          <div className="card-actions justify-end">
            <PopUp url="https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=287331748-53945501-90c3-41bc-9bcd-6cf73f26f60f">
              Garpar
            </PopUp>
          </div>
        </div>
      </div>
    </>
  );
};
