import "./App.css";
import { Admin, Resource } from "react-admin";
import { dataProvider, authProvider } from "./components/supabaseProvider";
import { LoginPage } from "ra-supabase-ui-materialui";
import { BrowserRouter, HashRouter } from "react-router-dom";

import movimientos from "./components/movimientos";
import convenios from "./components/convenios";

import huespedes from "./components/huespedes";
import personal from "./components/personal";

import horasMensualesPersonal from "./components/horasMensualesPersonal";
import { Home } from "./components/home";
import { MainLayout } from "./components/layout";

function App() {
  return (
    <BrowserRouter basename="/SolDeMendiolaza">
      <Admin
        disableTelemetry
        basename=""
        dataProvider={dataProvider}
        authProvider={authProvider}
        layout={MainLayout}
        dashboard={Home}
        loginPage={<LoginPage disableForgotPassword={true} />}
      >
        <Resource name="notificaciones" />
        <Resource name="movimientos" {...movimientos} />
        <Resource name="convenios" {...convenios} />

        <Resource name="huespedes" {...huespedes} />
        <Resource name="personal" {...personal} />
        <Resource name="horasMensualesPersonal" {...horasMensualesPersonal} />
      </Admin>
    </BrowserRouter>
  );
}

export default App;
