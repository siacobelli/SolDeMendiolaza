import "./App.css";
import { Admin, Resource } from "";
import supabaseDataProviderI from './components/supabaseProvider';
import LoginForm from "./components/LoginForm";

function App() {
  return (
    <Admin loginPage={LoginForm} dataProvider={supabaseDataProviderI}>
    </Admin>
  );
}

export default App;
