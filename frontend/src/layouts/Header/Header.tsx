import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { Link } from "react-router-dom";
import {removeTokens} from "../../app/features/slices/tokenSlice.ts";

 const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogoutClick = () => {
    dispatch(removeTokens());
    navigate('/', {replace:true});
  }

  return (
    <header className='flex justify-between items-center px-3 h-14 bg-skin-base'>
      <div className="flex gap-2">
        <Link className="bg-skin-main py-1 px-2 rounded font-semibold"  to="/playlist" replace>Inicio</Link>
        <Link className="bg-skin-main py-1 px-2 rounded font-semibold"  to="/favorites" replace>Favoritos</Link>
      </div>
      <button
        className="bg-skin-main py-1 px-2 rounded font-semibold" 
        onClick={handleLogoutClick}
      >
        Logout
      </button>
    </header>
  )
}

export default Header