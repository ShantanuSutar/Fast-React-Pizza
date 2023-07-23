import { useNavigate, useRouteError } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();
  const error = useRouteError(); // useRouteError is a hook that returns the error object that was passed to the errorElement prop of the route that matched the current path.

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{error.data || error.message}</p>
      {/* The error object has a data property that we can use to pass additional information about the error. */}
      <button onClick={() => navigate(-1)}>&larr; Go back</button>
    </div>
  );
}

export default NotFound;
