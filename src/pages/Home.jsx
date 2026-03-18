import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import StatsBar from "../components/StatsBar";
import EventCard from "../components/EventCard";
function Home() {
  const [events, setEvents] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [registered, setRegistered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState("all");
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data) => {
        const mappedData = data.map((item, index) => ({
          id: item.id,
          title: item.title,
          location: "Bangalore",
          date: index % 2 === 0 ? "2026-05-10" : "2024-01-10",
        }));
        setEvents(mappedData);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);
  const handleRegister = (id) => {
    if (registered.includes(id)) {
      setRegistered(registered.filter((item) => item !== id));
    } else {
      setRegistered([...registered, id]);
    }
  };
  const filteredEvents = events
    .filter((event) =>
      event.title.toLowerCase().includes(searchText.toLowerCase())
    )
    .filter((event) => {
      if (filterType === "all") return true;
      const today = new Date();
      const eventDate = new Date(event.date);
      if (filterType === "upcoming") return eventDate >= today;
      if (filterType === "past") return eventDate < today;
      return true;
    });
  return (
    <div>
      <Navbar />
      <SearchBar searchText={searchText} setSearchText={setSearchText} />
      <StatsBar count={registered.length} />
      {/* FILTER BUTTONS */}
      <div className="filter-buttons">
        <button
          onClick={() => setFilterType("all")}
          className={filterType === "all" ? "active" : ""}
        >
          All
        </button>
        <button
          onClick={() => setFilterType("upcoming")}
          className={filterType === "upcoming" ? "active" : ""}
        >
          Upcoming
        </button>
        <button
          onClick={() => setFilterType("past")}
          className={filterType === "past" ? "active" : ""}
        >
          Past
        </button>
      </div>
      {/* Loading */}
      {loading && <p className="center">Loading events...</p>}
      {/* Empty state */}
      {!loading && filteredEvents.length === 0 && (
        <p className="center">No events found</p>
      )}
      {/* Event Grid */}
      <div className="grid">
        {filteredEvents.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            handleRegister={handleRegister}
            registered={registered}
          />
        ))}
      </div>
    </div>
  );
}
export default Home;