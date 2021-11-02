import { db } from "../Services/firebase";

export default usePhoto = () => {
  // to create the photos DB for a user first time
  const photoRef = db.collection("photos");

  const getPhotos = (uid) => {
    photoRef
      .doc(uid)
      .get()
      .then((res) => res.photos)
      .catch((error) => {
        alert(error);
      });
  };

  const addPhoto = (uid, photo) => {
    const pictures = getPhotos(uid);
    pictures.push(photo);
    photoRef
      .doc(uid)
      .update({ photos: pictures })
      .catch((error) => {
        console.log(error);
      });
  };

  return {
    getPhotos,
    setProPic,
    addPhoto,
    removePic,
    createAlbum,
  };
};
