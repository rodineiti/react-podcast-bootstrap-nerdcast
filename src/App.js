import React, { useState, useEffect } from "react";
import "./styles.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Cards from "./components/Cards";
import api from "./services/api";

export default function App() {
  const [podcasts, setPodcasts] = useState([]);
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState("desc");
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function loadPodcasts() {
      try {
        const { data } = await api.getPodcasts(page, order, search);
        if (data) {
          setPodcasts(data.length ? data : [data]);
        }
      } catch (error) {
        alert("Ocorreu um erro ao consultar os dados no servidor");
        console.log(error);
      }
    }

    loadPodcasts();
  }, [page, order, search]);

  function handleNextPage() {
    let newPage = page;
    newPage++;
    setPage(newPage);
  }

  function handlePreviousPage() {
    if (page > 1) {
      let newPage = page;
      newPage--;
      setPage(newPage);
    }
  }

  return (
    <React.Fragment>
      <Header />
      <main role="main">
        <section className="jumbotron text-center">
          <div className="container">
            <h1>Episódios</h1>
            <p className="lead text-muted">
              Abaixo você encontrará a lista de episódios do Nerdcast.
            </p>
          </div>
        </section>
        <div className="album py-5 bg-light">
          <div className="container">
            <div className="row">
              <div className="col-sm-6 col-12">
                <input
                  className="form-control"
                  placeholder="Pesquisar"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="col-sm-6 col-12 text-right">
                <select
                  className="form-control"
                  value={order}
                  onChange={(e) => setOrder(e.target.value)}
                >
                  <option value="desc">Mais recente</option>
                  <option value="asc">Mais antigo</option>
                </select>
              </div>
              <div className="col-sm-12 text-right">
                <p className="lead text-muted">Página: {page}</p>
              </div>
            </div>
          </div>
          <div className="container mb-2">
            <div className="row">
              <div className="col-md-12 d-flex justify-content-between align-items-center">
                {page > 1 && (
                  <button
                    className="btn btn-primary"
                    onClick={() => handlePreviousPage()}
                  >
                    Página Anterior
                  </button>
                )}
                <button
                  className="btn btn-primary"
                  onClick={() => handleNextPage()}
                >
                  Próxima página
                </button>
              </div>
            </div>
          </div>
          <Cards podcasts={podcasts} />
          <div className="container">
            <div className="row">
              <div className="col-md-12 d-flex justify-content-between align-items-center">
                {page > 1 && (
                  <button
                    className="btn btn-primary"
                    onClick={() => handlePreviousPage()}
                  >
                    Página Anterior
                  </button>
                )}
                <button
                  className="btn btn-primary"
                  onClick={() => handleNextPage()}
                >
                  Próxima página
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </React.Fragment>
  );
}
