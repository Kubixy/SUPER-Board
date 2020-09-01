import { toast } from "react-toastify";

export function handlerError(e) {
  switch (e) {
    case "auth/user-not-found":
      toast.warning("Wrong username or password");
      break;
    case "auth/wrong-password":
      toast.warning("Wrong username or password");
      break;
    case "auth/too-many-request":
      toast.warning(
        "You must wait a while before you can send another verification email"
      );
      break;
    default:
  }
}
