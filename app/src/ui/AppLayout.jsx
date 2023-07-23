import { Outlet, useNavigation } from "react-router-dom";
import CartOverview from "../features/cart/CartOverview";
import Header from "./Header";
import Loader from "./Loader";

const AppLayout = () => {
  const navigation = useNavigation(); // useNavigation is a hook that returns the current navigation state.
  const isLoading = navigation.state === "loading"; // The navigation state can be "loading", "navigating" or "settled".
  return (
    <div className="layout">
      {isLoading && <Loader />}
      <Header />
      <main>
        <Outlet />
        {/* Outlet is a placeholder for the child route components to render into. */}
      </main>
      <CartOverview />
    </div>
  );
};

export default AppLayout;
