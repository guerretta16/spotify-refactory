//import { useEffect, useState } from "react";
//import { AlbumList, Spinner, Modal } from "../../modules/components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Favorites = () => {
  //const [isOpen, setIsOpen] = useState(false);

 // const notify = () =>
    toast.success("Ok", { position: "bottom-right" });



  return (
    <>

      <div className="p-2">
        <h1 className="mx-auto my-10 text-3xl text-center font-bold w-fit p-2">
          Mis álbumes favoritos 🎧
        </h1>

        <ToastContainer />
      </div>
    </>
  );
};

export default Favorites;
