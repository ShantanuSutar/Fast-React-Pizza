import { useLoaderData } from 'react-router-dom';
import { getMenu } from '../../services/apiRestaurant';
import MenuItem from './MenuItem';

function Menu() {
  const menu = useLoaderData(); // useLoaderData() is a React Router hook that returns the data returned by the loader() function.

  return (
    <ul className=" divide-y divide-stone-200 px-2">
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}

export async function loader() {
  const menu = await getMenu();
  return menu;
} // loader() is a function that returns a Promise that resolves to the data that we want to pass to the component.

export default Menu;
