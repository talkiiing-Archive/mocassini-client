import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Button, Navbar } from "react-daisyui";
import { Home } from "./pages/Home.tsx";
import { SignUpPage } from "./pages/SignUpPage.tsx";
import { SignInPage } from "./pages/SignInPage.tsx";
import "./App.css";
import { LOCAL_STORAGE_TOKEN_KEY } from "./api/client.ts";
import { ShoePage } from "./pages/ShoePage.tsx";
import { CartPage } from "./pages/CartPage.tsx";
import { useMe } from "./hooks/useMe.ts";
import { ProfilePage } from "./pages/ProfilePage.tsx";
import { AdminPage } from "./pages/AdminPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
  {
    path: "/signin",
    element: <SignInPage />,
  },
  {
    path: "/shoes/:id",
    element: <ShoePage />,
  },
  {
    path: "/cart",
    element: <CartPage />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
  {
    path: "/admin",
    element: <AdminPage />,
  },
]);

const App = () => {
  const { me, isLoadingMe } = useMe();

  return (
    <>
      <Navbar>
        <div className="flex-1">
          <a href="/" className="text-2xl font-bold font-mono">
            Mocassini👠
          </a>
        </div>

        <div className="flex-none">
          {!me ? (
            <Button tag="a" href="/signin" loading={isLoadingMe}>
              Войти
            </Button>
          ) : (
            <div className="flex flex-row space-x-3 items-center">
              <a href="/profile">
                {me.username} ({me.name} {me.surname})
              </a>

              <Button tag="a" href="/cart">
                Корзина
              </Button>

              <Button
                variant="link"
                onClick={() => {
                  localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
                  window.location.href = "/";
                }}
              >
                Выйти
              </Button>
            </div>
          )}
        </div>
      </Navbar>

      <div className="px-6 py-10 w-full min-h-full">
        <RouterProvider router={router} />
      </div>
    </>
  );
};

export default App;
