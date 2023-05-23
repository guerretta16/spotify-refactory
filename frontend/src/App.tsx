import {Route, Routes} from "react-router-dom";
import {Login, Playlist} from "./pages"
import {ProtectRoutes} from "./modules/components";

//import { Header } from "../../layouts/Header";

function App() {
    return (
            <div className="bg-skin-main min-h-screen text-skin-base">
                <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="playlist" element={
                        <ProtectRoutes>
                            <Playlist/>
                        </ProtectRoutes>
                    }/>
                </Routes>
            </div>
    );
}

export default App;
