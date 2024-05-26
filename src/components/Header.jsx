import searchIcon from "../assets/images/searchIcon.svg";

const Header = ({ searchTerm, getSearchTerm, fetchSearchResults }) => {
  return (
    <header>
      <div className="container">
        <div className="header--section">
          <div className="header--logo">
            <h1>MovieList App</h1>
          </div>
          <div className="header--search">
            <input
              type="text"
              value={searchTerm}
              onChange={getSearchTerm}
              placeholder="Search for a movie..."
              className="header--search-input"
            />
            <button className="header--search-icon" onClick={fetchSearchResults}>
              <img src={searchIcon} alt="search-icon" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
