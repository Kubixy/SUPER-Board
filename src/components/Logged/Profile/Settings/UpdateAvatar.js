import React, { useState, useCallback } from "react";
import { Image } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import NoAvatar from "../../../../assets/png/DefaultUser.png";
import firebase from "../../../../utils/Firebase";
import "firebase/storage";
import "firebase/auth";

export default function UpdateAvatar(props) {
  const { user } = props;
  const [avatarUrl, setAvatarUrl] = useState(user.photoURL);

  const uploadImage = useCallback(
    (file) => {
      const ref = firebase.storage().ref().child(`avatar/${user.uid}`);
      return ref.put(file);
    },
    [user]
  );

  const updateUserAvatar = useCallback(() => {
    firebase
      .storage()
      .ref(`avatar/${user.uid}`)
      .getDownloadURL()
      .then((response) => {
        firebase.auth().currentUser.updateProfile({ photoURL: response });
      })
      .catch(() => {
        toast.error("There was an error updating your avatar");
      });
  }, [user]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      setAvatarUrl(URL.createObjectURL(file));
      uploadImage(file).then(() => {
        updateUserAvatar();
      });
    },
    [updateUserAvatar, uploadImage]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/jpeg, image/png",
    noKeyboard: true,
    onDrop,
  });

  return (
    <div className="user-avatar" {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <Image src={NoAvatar} />
      ) : (
        <Image src={avatarUrl ? avatarUrl : NoAvatar} />
      )}
    </div>
  );
}
