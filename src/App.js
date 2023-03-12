import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Menu from "./components/Menu/Menu";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/*<Route path="*" element={<Login/>}/>*/}
                <Route path="/student" element={<Menu/>}>
                    {/*<Route path='one' element={<PageOne/>}/>*/}
                    {/*<Route path="two" element={<PageTwo/>}/>*/}
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
