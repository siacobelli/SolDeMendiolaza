import "./App.css";
import { Admin, CustomRoutes, Resource, ListGuesser } from "react-admin";
import { dataProvider, authProvider } from "./components/supabaseProvider";
import { LoginPage, SetPasswordPage } from "ra-supabase-ui-materialui";
import { BrowserRouter, Route } from "react-router-dom";

import HuespedesList from "./components/huespedes";
import PersonalList from "./components/personal";

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
        <Resource name="huespedes" list={HuespedesList} />
        <Resource name="personal" list={PersonalList} />
      </Admin>
    </BrowserRouter>
  );
}

export default App;
