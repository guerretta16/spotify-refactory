import {Route, Routes} from "react-router-dom";
import {Favorites, Login, Playlist} from "./pages"
import {Header} from "./layouts/Header";
import {ProtectRoutes} from "./modules/components";

function App() {
    return (
            <div className="bg-skin-main min-h-screen text-skin-base">
                <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="playlist" element={
                        <ProtectRoutes>
                            <Header/>
                            <Playlist/>
                        </ProtectRoutes>
                    }/>
                    <Route path="favorites" element={
                        <ProtectRoutes>
                            <Header/>
                            <Favorites/>
                        </ProtectRoutes>
                    }/>
                </Routes>
            </div>
    );
}

export default App;
