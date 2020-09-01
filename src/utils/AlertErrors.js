import { toast } from "react-toastify";

export function alertErrors(type) {
  switch (type) {
    case "auth/wrong-password":
      toast.warning("Wrong format");
      break;

    case "auth/email-already-in-use":
      toast.warning("This email is already in use");
      break;

    default:
      toast.warning("Server error, try again in a few seconds");
  }
}
