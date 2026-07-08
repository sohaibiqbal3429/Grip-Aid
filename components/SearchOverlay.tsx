export function SearchOverlay() {
  return (
    <div className="te-search-form-wrapper">
      <div className="te-search-form-inner">
        <div className="te-search-content-filed">
          <form role="search" method="get" className="te-search-form" action="/search">
            <div className="te-search-form-input">
              <div className="te-search-icon">
                <i className="fa-light fa-magnifying-glass" aria-hidden="true" />
              </div>
              <input name="q" type="search" placeholder="Search" aria-label="Search" />
              <button className="te-theme-btn" type="submit" title="Search" aria-label="Search">
                Search
              </button>
            </div>
          </form>
          <span className="te-search-close">
            <i className="fa-light fa-xmark" aria-hidden="true" />
          </span>
        </div>
      </div>
    </div>
  );
}
