import React from "react";

function Header() {
  return (
    <header>
      <div>
        <nav class="navbar navbar-expand-lg navbar-light fixed-top">
          <div class="container-fluid">
            <a class="navbar-brand" href="/">
              Online Judge
            </a>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav ms-auto">
                <li class="nav-item">
                  <a class="nav-link" href="/explore">
                    Explore
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/contest">
                    Contest
                  </a>
                </li>
                <li class="nav-item">
                  <a href="/signin" className="btn btn-outline-secondary">Sign In</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
