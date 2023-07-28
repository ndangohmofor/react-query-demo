import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { SuperHeroes } from "./components/SuperHeroes.page";
import { RQSuperHeroes } from "./components/RQSuperHeroes.page";
import { HomePage } from "./components/Home.page";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import RQSuperHeroPage from "./pages/RQSuperHero.page";
import { ParallelQueries } from "./components/ParallelQueries.page";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to={"/super-heroes"}>Traditional Super Heroes</Link>
              </li>
              <li>
                <Link to={"/rq-super-heroes"}>RQ Super Heroes</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route
              path="/rq-super-heroes/:heroId"
              element={<RQSuperHeroPage />}
            ></Route>
            <Route path="/super-heroes" element={<SuperHeroes />}></Route>
            <Route path="/rq-super-heroes" element={<RQSuperHeroes />}></Route>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/rq-parallel" element={<ParallelQueries />}></Route>
          </Routes>
        </div>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}

export default App;
