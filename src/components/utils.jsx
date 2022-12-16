import { useEffect, useRef, useState } from "react";
import axios from "axios";

export const getCheckoutUrl = async (input) => {
  const { data } = await axios.post(
    "https://southamerica-east1-lucilaapp-20b73.cloudfunctions.net/mp/preference",
    input
  );
  return data.init_point;
};

export const PopUp = ({ children, url = "" }) => {
  const [open, toggle] = useState(false);
  const [popUpWindow, setPopUpWindow] = useState(null);

  const windowOpen = async () => {
    const new_window = await window.open(
      url,
      "",
      "location=no,menubar=no,scrollbars=no,titlebar=no,toolbar=no,status=no,width=1000,height=600,left=200,top=200"
    );
    new_window.onload = () => {};
    setPopUpWindow(new_window);
    const timer = setInterval(() => {
      if (new_window.closed) {
        clearInterval(timer);
        toggle(false);
      }
    }, 500);
  };
  const windowClose = async () => {
    await popUpWindow?.close();
  };

  useEffect(() => {
    open ? windowOpen() : windowClose();
  }, [open]);

  useEffect(() => {
    window.addEventListener("beforeunload", windowClose);
    return () => {
      window.removeEventListener("beforeunload", windowClose);
    };
  });

  return open ? (
    <div className="btn btn-square  loading" />
  ) : (
    <button className="btn btn-primary" onClick={() => toggle(true)}>
      {children}
    </button>
  );
};
