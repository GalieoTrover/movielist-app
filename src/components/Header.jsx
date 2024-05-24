import searchIcon from "../assets/images/searchIcon.svg";

const Header = ({ title }) => {
  return (
    <header>
      <div className="container">
        <div className="header--section">
          <div className="header--logo">
            <h1>{title}</h1>
          </div>
          <div className="header--search">
            <input
              type="text"
              placeholder="Search for a movie..."
              className="header--search-input"
            />
            <div className="header--search-icon">
              <img src={searchIcon} alt="search-icon" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
