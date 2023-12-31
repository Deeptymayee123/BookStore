import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../home/Home";
import Shop from "../shop/Shop";
import About from "../Components/About";
import Blog from "../Components/Blog";
import SingleBook from "../Components/SingleBook";
import DashboardLayout from "../dashboard/DashboardLayout";
import Dashboard from "../dashboard/Dashboard";
import UploadBook from "../dashboard/UploadBook";
import ManageBooks from "../dashboard/ManageBooks";
import EditBooks from "../dashboard/EditBooks";
import Signup from "../Components/Signup";
import Login from "../Components/Login";
import Logout from "../Components/Logout";
import Success from "../paymentPages/Success.jsx";
import Failed from "../paymentPages/Failed.jsx";
import Product from "../paymentPages/Product.jsx";
import PrivateRoute from "../privateRoute/PrivateRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/book/:id",
        element: <SingleBook />,
        loader: ({ params }) =>
          fetch(`http://localhost:4000/book/${params.id}`),
      },
    ],
  },
  {
    path: "admin/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "upload",
        element: <UploadBook />,
      },
      {
        path: "manage",
        element: <ManageBooks />,
      },
      {
        path: "edit-books/:id",
        element: <EditBooks />,
        loader: ({ params }) =>
          fetch(`http://localhost:4000/book/${params.id}`),
      },
    ],
  },
  {
    path: "sign-up",
    element: <Signup />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "logout",
    element: <Logout />,
  },
  {
    path: "Product",
    element: <Product />,
  },
  {
    path: "success",
    element: <Success />,
  },
  {
    path: "failed",
    element: <Failed />,
  },
]);

export default router;
