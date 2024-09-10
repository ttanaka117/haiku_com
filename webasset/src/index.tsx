import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "virtual:uno.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { TopPage } from "./pages/TopPage";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { AdminPage } from "./pages/AdminPage";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import topPageReducer from "./slice/topPageSlice";
import haikuSlice from "./slice/haikuSlice";
import { LetterDetailPage } from "./pages/LetterDetailPage";
import { PoetDetailPage } from "./pages/PoetDetailPage";
import { PrimeReactProvider } from "primereact/api";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/top",
        element: <TopPage />,
      },
      {
        path: "letter_detail/:letterId",
        element: <LetterDetailPage />,
      },
      {
        path: "poet_detail/:poetId",
        element: <PoetDetailPage />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminPage />,
  },
]);
export const apolloClient = new ApolloClient({
  uri: import.meta.env.VITE_APOLLO_CLIENT_URL,
  cache: new InMemoryCache(),
});
export const store = configureStore({
  reducer: {
    topPage: topPageReducer,
    haikuStore: haikuSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ApolloProvider client={apolloClient}>
        <PrimeReactProvider>
          <RouterProvider router={router} />
        </PrimeReactProvider>
      </ApolloProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
