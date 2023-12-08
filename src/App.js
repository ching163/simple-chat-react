import { Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Register from "./views/Register";
import Login from "./views/Login";
import Chat from "./views/Chat";
import Search from "./views/Search";
import Message from "./views/Message";
import PageNotFound from "./views/PageNotFound";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/search" element={<Search />} />
        <Route path="/message" element={<Message />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
