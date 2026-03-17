import NavBar from "../../Components/NavBar/NavBar";
import Footer from "../../Components/Footer/Footer";
import { Outlet } from "react-router-dom";

const MainLayout = ({ cartQuantity }) => {
  return (
    <>
      <NavBar cartQuantity={cartQuantity} />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;