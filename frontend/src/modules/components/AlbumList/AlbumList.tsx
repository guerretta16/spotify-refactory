import {AlbumCard} from "../index";
import {IAlbum} from "../../../utils/interfaces/spotifyAuthType";

interface IListProp {
    items: IAlbum[];
    onAddFavorites?: (item: IAlbum) => void;
    onDelete?: (id: string) => void;
    handleModal?: (id: string) => void
}

function AlbumList({items, onAddFavorites, onDelete, handleModal}: IListProp) {

    const itemsWithoutDuplicates = items ? items.filter((value, index, self) => index === self.findIndex(obj => obj.id === value.id)) : []

    return (
            <div className="flex flex-wrap gap-8 justify-center md:w-5/6 m-auto my-10">
                {
                    itemsWithoutDuplicates ? itemsWithoutDuplicates.map((item) => (
                            <AlbumCard
                                    key={item.id}
                                    item={item}
                                    onAddFavorites={onAddFavorites}
                                    onDelete={onDelete}
                                    handleModal={handleModal}
                            />
                    )) : null
                }
            </div>
    );
}

export default AlbumList;
