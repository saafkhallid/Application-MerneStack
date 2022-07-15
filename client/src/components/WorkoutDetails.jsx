import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import formatDistance from "date-fns/formatDistanceToNow";
// import formatDistanceToNow from "date-fns/formatDistanceToNow";


const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();

  const DeleteClick = async () => {
    const response = await fetch(
      "http://localhost:8000/api/workouts/" + workout._id,
      {
        method: "DELETE",
      }
    );
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json });
    }
  };
  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (kg): </strong>
        {workout.load}
      </p>
      <p>
        {formatDistance(new Date(workout.createdAt), { addSuffix: true })}
      </p>

      <span className="material-symbols-outlined" onClick={DeleteClick}>
        delete
      </span>
    </div>
  );
};

export default WorkoutDetails;
