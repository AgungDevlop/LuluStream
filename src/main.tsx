import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Contact } from "./pages/Contact.tsx";
import { PlayVideo } from "./pages/PlayVideo.tsx";
import { Download } from "./pages/Download.tsx";
import Redirect from "./pages/Redirect.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // Menambahkan rute 'index' untuk menangani halaman utama (path: "/")
      // Ini akan merender PlayVideo tanpa ID, berfungsi sebagai halaman utama/pencarian
      {
        index: true,
        element: <PlayVideo />,
      },
      // Rute-rute ini tetap sama untuk memutar video berdasarkan ID
      { path: ":id", element: <PlayVideo /> },
      { path: "e/:id", element: <PlayVideo /> },
      { path: "f/:id", element: <PlayVideo /> },
      { path: "d/:id", element: <PlayVideo /> },
      { path: "v/:id", element: <PlayVideo /> },
      { path: "play/:id", element: <PlayVideo /> },
      { path: "f/:id", element: <PlayVideo /> },
      { path: "view/:id", element: <PlayVideo /> },
      { path: "share/:id", element: <PlayVideo /> },
      { path: "download", element: <Download /> },
      { path: "contact", element: <Contact /> },
      { path: "s/:id", element: <Redirect /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);