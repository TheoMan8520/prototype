import "bootstrap/dist/css/bootstrap.css";
// import Keep from './components/Keep';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Calendar from "./components/Calendar";
import Category from "./components/Category";
import Daily from "./components/Daily";
import MainPage from "./components/MainPage";

function App() {
  return (
    <Router>
      <MainPage>
        <Routes>
          <Route path="/" element={<Calendar />} />
          <Route path="/category" element={<Category />}/>
          <Route path="/day/:index/:date/:month/:year" element={<Daily />}/>
        </Routes>
      </MainPage>
    </Router>
  );
}

export default App;
