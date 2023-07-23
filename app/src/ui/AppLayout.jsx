import { Outlet } from "react-router-dom";
import CartOverview from "../features/cart/CartOverview";
import Header from "./Header";

const AppLayout = () => {
  return (
    <div>
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
