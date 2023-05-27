import {Link} from "react-router-dom";
import {IAlbum} from "../../../utils/interfaces/spotifyAuthType.ts";

interface IModalProp {
    detail: IAlbum;
    handleModal: () => void;
}

function Modal({detail, handleModal}: IModalProp) {

    const itemArtists = detail.artists.map(artist => artist.name)

    return (
            <div className="fixed inset-0 bg-skin-main bg-opacity-75">
                <div className="w-5/6 md:w-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-skin-card rounded-md p-6">
                    <div className="">
                        <div className="flex justify-end p-3">
                            <button onClick={handleModal}
                                    className="bg-skin-delete hover:bg-skin-delete-hover transition font-bold py-2 px-4 rounded-full">
                                Exit
                            </button>
                        </div>
                        <img
                                className="w-1/2 m-auto rounded my-5"
                                src={detail.images[1].url}
                                alt={detail.name}
                        />
                        <div className="text-center p-2">
                            <p>
                                <b>Nombre del álbum:</b> {detail.name}
                            </p>
                            <p>
                                <b>Tipo:</b> {detail.album_type}
                            </p>
                            <p>
                                <b>Total de canciones:</b> {detail.total_tracks}
                            </p>
                            <p>
                                <b>Fecha de lanzamiento:</b> {detail.release_date}
                            </p>
                            <p>
                                <b>Artistas:</b> {String(itemArtists)}
                            </p>
                            <p className="truncate">
                                <b>Spotify link:</b>{" "}
                                <Link className="text-skin-link" to={detail.external_urls.spotify} target="__blank">
                                    {detail.external_urls.spotify}
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default Modal;
