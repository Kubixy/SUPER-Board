import React from "react";
import { toast } from "react-toastify";
import { handlerError } from "../../../utils/HandlerError";

export default function ButtonResetSendEmailVerifaction(props) {
  const { user, setIsLoading, setUserActive } = props;

  const resendVerificationEmail = () => {
    user
      .sendEmailVerification()
      .then(() => {
        toast.success("The verification email has been sent");
      })
      .catch((err) => {
        handlerError(err);
      })
      .finally(() => {
        setIsLoading(false);
        setUserActive(true);
      });
  };

  return (
    <div className="resend-verification-email">
      <p>
        If you have not received the verification email you can resend it by
        clicking <span onClick={resendVerificationEmail}>here</span>
      </p>
    </div>
  );
}
