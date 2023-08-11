import React from "react";
import { Routes, Route } from "react-router-dom";
import Movie from "./pages/Movie";
import Home from "./pages/MovieListPage";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie-details" element={<Movie />}>
          <Route path=":id" element={<Movie />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
