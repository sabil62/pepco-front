import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
// import Comparison from "../../container/pages/comparison/comparison";
import Login from "../../container/pages/login/login";
import MainContentLayout from "../../layout/mainContent/mainContentLayout";
import Upload from "../../container/pages/upload/upload";
import ProtectedAppRoute from "./protectedAppRoute";
import Logout from "../../container/pages/logout/logout";
import Test from "../../container/pages/test/test";
import Info from "../../container/pages/info/info";
// import ComparisonNew from "../../container/pages/comparison/comparison_new";
import Mapping from "../../container/pages/mapping/mapping";
import Client from "../../container/pages/client/client";
import Validate from "../../container/pages/validate/validate";

const logicPaths = [
  {
    path: "",
    element: (
      <ProtectedAppRoute>
        <Info />
      </ProtectedAppRoute>
    ),
  },
  {
    path: "upload",
    element: (
      <ProtectedAppRoute>
        <Upload />
      </ProtectedAppRoute>
    ),
  },
  {
    path: "compform",
    element: (
      <ProtectedAppRoute>
        {" "}
        <Mapping />
      </ProtectedAppRoute>
    ),
  },
  {
    path: "client",
    element: (
      <ProtectedAppRoute>
        {" "}
        <Client />
      </ProtectedAppRoute>
    ),
  },
  {
    path: "validate",
    element: (
      <ProtectedAppRoute>
        {" "}
        <Validate />
      </ProtectedAppRoute>
    ),
  },
];

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" />,
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
    path: "test",
    element: <Test />,
  },
  {
    path: "logic",
    element: <MainContentLayout />,
    children: logicPaths,
  },
  {
    path: "*",
    element: (
      <div className="font-bold text-3xl text-center mt-[150px]">
        No Routes Available
      </div>
    ),
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
