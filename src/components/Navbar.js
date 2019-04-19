import React from "react";
import "../sass/Navbar.scss";

const Navbar = () => {
  return (
    <nav>
      <div className="card card-body mt-3 mb-3 text-center">
        <h1>Trabalhando com a API do Github</h1>
        <p className="lead">Abaixo segue a lista e as informações da API</p>
      </div>
    </nav>
  );
};

export default Navbar;
