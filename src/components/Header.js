import React from "react";

export default function Header() {
  return (
    <header>
      <div className="navbar navbar-dark bg-dark shadow-sm">
        <div className="container d-flex justify-content-center">
          <a href="/#" className="navbar-brand d-flex align-items-center">
            <strong>Meu Podcast Preferido: NerdCast</strong>
          </a>
        </div>
      </div>
    </header>
  );
}
