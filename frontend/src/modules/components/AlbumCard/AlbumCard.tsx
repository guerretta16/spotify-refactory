import {IAlbum} from "../../../utils/interfaces/spotifyAuthType.ts";


interface ICardProp {
    item: IAlbum;
    onAddFavorites?: (item: IAlbum) => void;
    onDelete?: (id: string) => void;
    handleModal?: (id: string) => void
}


function AlbumCard({item, onAddFavorites, onDelete, handleModal}: ICardProp) {

    const itemArtists = item.artists.map(artist => artist.name)

    return (
            <div className="bg-skin-card py-5 rounded-lg hover:bg-skin-card-hover transition">
                <div className="w-4/5 m-auto">
                    <img className="rounded" src={item.images[1].url} alt={item.name}/>
                    <div className="flex flex-col justify-between my-5">
                        <h2 className="text-lg font-semibold mb-3 truncate w-52">
                            {item.name}
                        </h2>
                        <small className="text-base">
                            {String(item.release_date)} <br/> {String(itemArtists)}
                        </small>
                    </div>
                    {onAddFavorites ? (
                            <button
                                    onClick={() => onAddFavorites(item)}
                                    className="block mx-auto bg-skin-base p-2 rounded transition hover:bg-skin-base-hover"
                            >
                                Add Fav
                            </button>
                    ) : (
                            <div className="flex justify-center gap-2">
                                <button
                                        onClick={() => onDelete!(item.id)}
                                        className="bg-skin-delete p-2 rounded hover:bg-skin-delete-hover transition font-semibold"
                                >
                                    Delete Fav
                                </button>
                                <button
                                        onClick={() => handleModal!(item.id)}
                                        className="bg-skin-info p-2 rounded hover:bg-skin-info-hover transition font-semibold"
                                >
                                    Info
                                </button>
                            </div>
                    )}
                </div>
            </div>
    );
}

export default AlbumCard;
