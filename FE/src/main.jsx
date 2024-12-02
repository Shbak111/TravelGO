import App from "./App.jsx";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AttractionPage from "./pages/AttractionPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import MainPage from "./pages/MainPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Review from "./pages/Review.jsx";
import ReviewDetail from "./pages/ReviewDetail.jsx";
import ReviewAdd from "./pages/ReviewAdd.jsx";
import MyPage from "./pages/MyPage.jsx";
import PlanPage from "./pages/PlanPage.jsx";
import PlanDetail from "./pages/PlanDetail.jsx";
import PlanAdd from "./pages/PlanAdd.jsx";
import PlanUpdate from "./pages/PlanUpdate.jsx";
import MyPlans from "./pages/MyPlans.jsx";
import MyPlanDetail from "./pages/MyplanDetail.jsx";
import ReviewUpdate from "./pages/ReviewUpdate.jsx";
import Shop from "./pages/Shop.jsx";
import MyPageUpdate from "./pages/MyPageUpdate.jsx";
import MyPlanUpdate from "./pages/MyPlanUpdate.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <MainPage />,
      },
      {
        path: "attraction",
        element: <AttractionPage />,
        requiresAuth: false,
      },
      {
        path: "signup",
        element: <SignUpPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "plan",
        element: <PlanPage />,
        children: [
          {
            path: "detail/:plan_id",
            element: <ProtectedRoute />,
            children: [
              {
                path: "",
                element: <PlanDetail />,
              },
            ],
          },
          {
            path: "add",
            element: <ProtectedRoute />,
            children: [
              {
                path: "",
                element: <PlanAdd />,
              },
            ],
          },
        ],
      },
      {
        path: "plan/update/:plan_id",
        element: <ProtectedRoute />,
        children: [
          {
            path: "",
            element: <PlanUpdate />,
          },
        ],
      },
      {
        path: "review",
        element: <Review />,
        children: [
          {
            path: "detail/:review_id",
            element: <ReviewDetail />,
            children: [
              {
                path: "update",
                element: <ProtectedRoute />,
                children: [
                  {
                    path: "",
                    element: <ReviewUpdate />,
                  },
                ],
              },
            ],
          },
          {
            path: "add",
            element: <ProtectedRoute />,
            children: [
              {
                path: "",
                element: <ReviewAdd />,
              },
            ],
          },
        ],
      },
      {
        path: "mypage",
        element: <ProtectedRoute />,
        children: [
          {
            path: "",
            element: <MyPage />,
          },
          {
            path: "plans",
            element: <MyPlans />,
          },
        ],
      },
      {
        path: "mypage/myplan/:myplan_id",
        element: <MyPlanDetail />,
      },
      {
        path: "mypage/myplan/update/:myplan_id",
        element: <MyPlanUpdate />,
      },
      {
        path: "shop",
        element: <Shop />,
      },
      {
        path: "/mypage/item",
        element: <ProtectedRoute />,
        children: [
          {
            path: "",
            element: <MyPageUpdate />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(<RouterProvider router={router} />);
