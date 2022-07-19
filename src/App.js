import { useCallback, useRef } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import { Example1 } from "./Example1";
import { Example2 } from "./Example2";
import { Placeholder } from "./Placeholder";

function App() {
    // const text = useCallback((post) => {
    //     console.log(post);
    // }, []);

    return (
        <Router>
            <div className="links">
                <Link to="/">Example 1</Link>
                <Link to="/two">Example 2</Link>
                <Link to="/test">Placeholder</Link>
            </div>
            <Routes>
                <Route index path="/" element={<Example1 />} />
                <Route index path="/two" element={<Example2 />} />
                <Route path="/test" element={<Placeholder />} />
            </Routes>
        </Router>
    );
}

export default App;
