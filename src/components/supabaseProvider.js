import { supabaseDataProvider } from "ra-supabase-core";
import { supabaseAuthProvider } from "ra-supabase-core";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_API_KEY;

console.log("this is the proc env: %s", supabaseUrl);
const supabase = createClient(supabaseUrl, supabaseKey);

const authProvider = supabaseAuthProvider(supabase, {
  getIdentity: async (user) => {
    return {
      id: user.id,
      fullName: user.email,
    };
  },
});

const dataProvider = supabaseDataProvider({
  instanceUrl: supabaseUrl,
  apiKey: supabaseKey,
  supabaseClient: supabase,
});

export { dataProvider, authProvider };
