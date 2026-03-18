function EventCard({ event, handleRegister, registered }) {
  const isRegistered = registered.includes(event.id);
  const today = new Date();
  const eventDate = new Date(event.date);
  const isUpcoming = eventDate >= today;
  return (
    <div className="card">
      <h3>{event.title}</h3>
      <div className="info">
        <p>📍 {event.location}</p>
        <p>📅 {event.date}</p>
      </div>
      {/* BONUS TAG */}
      <p className={isUpcoming ? "tag-upcoming" : "tag-past"}>
        {isUpcoming ? "Upcoming" : "Past"}
      </p>
      {/* BUTTON LOGIC */}
      {isUpcoming ? (
        <button
          onClick={() => handleRegister(event.id)}
          className={isRegistered ? "unregister" : ""}
        >
          {isRegistered ? "Unregister ❌" : "Register ✅"}
        </button>
      ) : (
        <button className="closed" disabled>
          Event Closed 🚫
        </button>
      )}
    </div>
  );
}
export default EventCard;