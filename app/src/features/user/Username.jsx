import { useSelector } from 'react-redux';

function Username() {
  const username = useSelector((state) => state.user.username); // useSelector() is a React Redux hook that returns the value of the username property from the Redux store

  if (!username) return null; // If there's no username, we don't render anything

  return (
    <div className="hidden text-sm font-semibold md:block">{username}</div>
  );
}

export default Username;
