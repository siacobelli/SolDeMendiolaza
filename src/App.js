import "./App.css";
import { Admin, CustomRoutes, Resource } from "react-admin";
import { dataProvider, authProvider } from "./components/supabaseProvider";
import { LoginPage, SetPasswordPage } from "ra-supabase-ui-materialui";
import { BrowserRouter, Route } from "react-router-dom";

import { PointOfSale, AssignmentInd, Hotel } from "@mui/icons-material";

import huespedes from "./components/huespedes";
import personal from "./components/personal";
import tiposMovimiento from "./components/tiposMovimiento";
import movimientos from "./components/movimientos";

function App() {
  return (
    <BrowserRouter>
      <Admin
        dataProvider={dataProvider}
        authProvider={authProvider}
        loginPage={LoginPage}
      >
        <CustomRoutes noLayout>
          <Route path={SetPasswordPage.path} element={<SetPasswordPage />} />
        </CustomRoutes>
        <Resource name="movimientos" {...movimientos} icon={PointOfSale} />

        <Resource name="huespedes" {...huespedes} icon={Hotel} />
        <Resource name="personal" {...personal} icon={AssignmentInd} />
        <Resource name="tiposMovimiento" {...tiposMovimiento} />
      </Admin>
    </BrowserRouter>
  );
}

export default App;
