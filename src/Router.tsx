import { createBrowserRouter } from "react-router-dom";
import Popular from "./Routes/Popular";
import Comingsoon from "./Routes/Comingsoon";
import Root from "./Root";
import Nowplaying from "./Routes/Nowplaying";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Popular />,
      },
      {
        path: "/movies/:movieId",
        element: <Popular />,
      },
      {
        path: "/coming-soon",
        element: <Comingsoon />,
      },
      {
        path: "coming-soon/movies/:movieId",
        element: <Comingsoon />,
      },
      {
        path: "/now-playing",
        element: <Nowplaying />,
      },
      {
        path: "/now-playing/movies/:movieId",
        element: <Nowplaying />,
      },
    ],
  },
]);

export default router;
