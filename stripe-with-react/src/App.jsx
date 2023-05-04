import { Route, Routes,  } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Success from "./pages/Success";
import Failure from "./pages/Failure";
import { useState } from "react";

function App() {
  const [user] = useState(() =>
    JSON.parse(localStorage.getItem("user"))
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Routes>
        {user?.email ? (
          <Route path="/" element={<Home />} />
        ) : (
          <Route path="/register" element={<Register />} />
        )}
        <Route path="/success" element={<Success />} />
        <Route path="/failure" element={<Failure />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </div>
  );
}

export default App;
