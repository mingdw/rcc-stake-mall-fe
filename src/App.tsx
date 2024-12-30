import React from "react";
import {RouterProvider} from "react-router-dom";
import router from "./router/router";
import  './assets/css/bootstrap.min.css'
import  './assets/css/materialdesignicons.min.css'
import  './assets/css/style.min.css'
function App() {
  return <RouterProvider router={router}></RouterProvider>
}

export default App
