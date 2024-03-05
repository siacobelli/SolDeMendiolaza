import "./App.css";
import { Admin, CustomRoutes, Resource } from "react-admin";
import { dataProvider, authProvider } from "./components/supabaseProvider";
import { LoginPage, SetPasswordPage } from "ra-supabase-ui-materialui";
import { BrowserRouter, Route } from "react-router-dom";

import { PointOfSale, AssignmentInd, Hotel, Paid } from "@mui/icons-material";

import movimientos from "./components/movimientos";
import convenios from "./components/convenios";

import huespedes from "./components/huespedes";
import personal from "./components/personal";

import horasMensualesPersonal from "./components/horasMensualesPersonal";

function App() {
  return (
    <BrowserRouter basename="/SolDeMendiolaza">
      <Admin
        dataProvider={dataProvider}
        authProvider={authProvider}
        loginPage={LoginPage}
      >
        <CustomRoutes noLayout>
          <Route path={SetPasswordPage.path} element={<SetPasswordPage />} />
        </CustomRoutes>
        <Resource name="movimientos" {...movimientos} icon={PointOfSale} />
        <Resource name="convenios" {...convenios} icon={Paid} />

        <Resource name="huespedes" {...huespedes} icon={Hotel} />
        <Resource name="personal" {...personal} icon={AssignmentInd} />
        <Resource
          name="horasMensualesPersonal"
          {...horasMensualesPersonal}
          icon={AssignmentInd}
        />
      </Admin>
    </BrowserRouter>
  );
}

export default App;
