import {
  useSignInWithGoogle,
  useAuthState,
  useSignOut,
} from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import * as fire from "../fire";

export const BrandName = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate("/")}
      className="text-xl btn btn-ghost normal-case"
    >
      <span className="tracking-widest font-light">Lucila</span>
      <span className="font-bold">App</span>
    </button>
  );
};

export const UserMenu = ({ user, logout }) => {
  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="avatar">
        <div className="w-12 mask mask-circle">
          <img referrerPolicy="no-referrer" src={user.photoURL} />
        </div>
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 mt-4 grid grid-rows-2"
      >
        <li>
          <p>Mis Turnos</p>
        </li>
        <li onClick={logout} className="text-red-500">
          <p>Salir</p>
        </li>
      </ul>
    </div>
  );
};

export const User = () => {
  const [user, isLoading1] = useAuthState(fire.auth);
  const [signInWithGoogle, , isLoading2] = useSignInWithGoogle(fire.auth);
  const [logout, isLoading3] = useSignOut(fire.auth);
  let isLoading = isLoading1 || isLoading2 || isLoading3;

  return (
    <button
      className={`btn btn-primary btn-outline flex flex-row items-center gap-4 ${
        isLoading ? "btn-square loading" : user ? "btn-square" : ""
      }`}
      onClick={() => (isLoading ? null : user ? null : signInWithGoogle())}
    >
      {isLoading ? null : user ? (
        <UserMenu {...{ user, logout }} />
      ) : (
        "loguearse"
      )}
    </button>
  );
};

export default () => {
  return (
    <div className="navbar z-50 bg-base-100 sticky top-0 justify-between snap-none snap-align-none">
      <BrandName />
      <User />
    </div>
  );
};
