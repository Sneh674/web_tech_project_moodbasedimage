import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './components/Home';
import Detect from './components/Detect';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/detect",
      element: <Detect />,
    }
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App
