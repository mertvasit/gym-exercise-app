import React from "react";
import { Link } from "react-router-dom";

import "../HomePageTheme.css";

function Home(props) {
  return (
    <div className="text-center body">
      <div className="container d-flex h-100 p-3 mx-auto flex-column">
        <header className="masthead mb-auto">
          <div className="inner">
            <h3 className="masthead-brand">Cover</h3>
            <nav className="nav nav-masthead justify-content-center">
              <Link className="nav-link active" to="/">
                Home
              </Link>
              <Link className="nav-link active" to="/login">
                Sign In
              </Link>
              <Link className="nav-link active" to="/">
                Contact
              </Link>
            </nav>
          </div>
        </header>

        <main role="main" className="inner cover">
          <h1 className="cover-heading">Shape Your Body!</h1>
          <p className="lead">
            Cover is a one-page template for building simple and beautiful home
            pages. Download, edit the text, and add your own fullscreen
            background photo to make it your own.
          </p>
          <p className="lead">
            <a href="#" className="btn btn-lg btn-secondary">
              Learn more
            </a>
          </p>
        </main>

        <footer className="mastfoot mt-auto">
          <div className="inner">
            <p>
              Cover template for{" "}
              <a href="https://getbootstrap.com/">Bootstrap</a>, by{" "}
              <a href="https://twitter.com/mdo">@mdo</a>.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Home;
