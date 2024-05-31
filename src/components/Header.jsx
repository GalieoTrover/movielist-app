import searchIcon from "../assets/images/searchIcon.svg";
import favicon from "../assets/images/favicon.png"

const Header = ({ searchTerm, getSearchTerm, fetchSearchResults }) => {
  return (
    <header>
      <div className="container">
        <div className="header--section">
          <div className="header--logo">
            <img src={favicon} alt="Logo" className="logo-img" /><h1>MovvieList App</h1>
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