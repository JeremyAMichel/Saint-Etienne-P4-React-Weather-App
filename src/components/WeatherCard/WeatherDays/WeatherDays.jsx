import "./WeatherDays.css";

function WeatherDays({ days, activeDay, handleDayClick }) {
  const daysOfWeek = [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ];

  return (
    <div className="card-action">
      {days.map((day, index) => {
        const date = new Date(day);

        return (
          <a
            href="#"
            key={index}
            className={index === activeDay && "active-day"}
            onClick={(e) => {
              e.preventDefault();
              handleDayClick(index);
            }}
          >
            {daysOfWeek[date.getDay()]}
          </a>
        );
      })}
    </div>
  );
}

export default WeatherDays;
