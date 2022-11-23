import './App.scss';
import HeaderMenu from "./Header/Menu/HeaderMenu";
import DBTable from "./Pages/DBTable/DataBaseTable";
import data from "./Pages/data.json";

import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";

import TableAndreyLearn from "./Pages/TableCalendar/TableCalendar";
import ChiefCheckTable from "./Pages/ChiefCheckTable/ChiefCheckTable";
import ClientCheckTable from "./Pages/ClientCheckTable/ClientCheckTable"
import TimeTable from './Pages/TimeTable/TimeTable';
import About from './Pages/About/About';

function Home() {
    return <h2>Home</h2>;
}

function App() {
    //link in header, routes in app
    return (
    <div className="App">
        <Router>
            <div>
                <div className='title-page'>VINKOS</div>
                <HeaderMenu/>
                <Routes>
                    <Route path="/ClientCheckTable" element={<ClientCheckTable/>}/>
                    <Route path="/ChiefCheckTable" element={<ChiefCheckTable/>}/>
                    <Route path="/TableAndreyLearn" element={<TableAndreyLearn/>}/>
                    <Route path="/DBTable" element={<DBTable data={data}/>}/>
                    <Route path="/About" element={<About/>}/>
                    <Route path="/TimeTable" element={<TimeTable/>}/>
                    <Route path="/" element={<Home/>}/>
                </Routes>
            </div>
        </Router>
    </div>
  );
}

export default App;
