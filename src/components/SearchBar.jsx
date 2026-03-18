function SearchBar({ searchText, setSearchText }) {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search events..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
    </div>
  );
}
export default SearchBar;