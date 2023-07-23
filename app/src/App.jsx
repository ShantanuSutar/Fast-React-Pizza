import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./ui/Home.jsx";
import Error from "./ui/Error.jsx";
import Menu, { loader as MenuLoader } from "./features/menu/Menu.jsx";
import Cart from "./features/cart/Cart.jsx";
import CreateOrder from "./features/order/CreateOrder";
import Order from "./features/order/Order.jsx";
import AppLayout from "./ui/AppLayout.jsx";

const router = createBrowserRouter([
  {
    element: <AppLayout />, // AppLayout is the root component of our app.
    errorElement: <Error />, // The element to render when an error occurs
    children: [
      {
        path: "/", // The path is relative to the parent route
        element: <Home />, // The element to render when the path matches
      },
      {
        path: "/menu",
        element: <Menu />,
        loader: MenuLoader, // The loader to call when the path matches
        errorElement: <Error />, // The element to render (instead of the Menu component) when an error occurs
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/order/new",
        element: <CreateOrder />,
      },
      {
        path: "/order/:orderId",
        element: <Order />,
      },
    ],
  },
]);

// createBrowserRouter returns a <RouterProvider> component that we can use to wrap our app. This component will provide the router context to all the components that use the useNavigate hook or the useMatch hook.

function App() {
  return <RouterProvider router={router} />;
}

export default App;
