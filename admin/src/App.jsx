import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Contact from "./pages/Contact";
import Order from "./pages/Order";
import Menu from "./pages/Menu";
import CategoryForm from "./components/menuListComponents/CategoryForm";
import MenuForm from "./components/menuListComponents/MenuForm";
import LoginComponent from "./components/LoginComponent/LoginComponent";
import ProtectedRoutes from "./ProtectedRoutes";
import EditMenuForm from "./components/menuListComponents/EditMenuForm";
import UserDetails from "./pages/UserDetails";
import EditCategory from "./components/menuListComponents/EditCategory";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* no token required path */}
        <Route path="/" element={<LoginComponent />} />

        {/* token required path */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoutes>
              <Dashboard />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/dashboard/orders"
          element={
            <ProtectedRoutes>
              <Order />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/dashboard/menu_list"
          element={
            <ProtectedRoutes>
              <Menu />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/dashboard/contact_details"
          element={
            <ProtectedRoutes>
              <Contact />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/dashboard/category_form"
          element={
            <ProtectedRoutes>
              <CategoryForm />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/dashboard/menu_form"
          element={
            <ProtectedRoutes>
              <MenuForm />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/dashboard/edit_menu_form/:id"
          element={
            <ProtectedRoutes>
              <EditMenuForm />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/dashboard/edit_category_form/:id"
          element={
            <ProtectedRoutes>
              <EditCategory />
            </ProtectedRoutes>
          }
        />

        <Route path="/dashboard/user_details" element={<UserDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
