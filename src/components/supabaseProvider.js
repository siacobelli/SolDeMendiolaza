// supabaseProvider.js
import { supabaseDataProvider } from "ra-supabase";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://xcbrsmkvivzklrzhyhpn.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhjYnJzbWt2aXZ6a2xyemh5aHBuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDYwNTQwNjYsImV4cCI6MjAyMTYzMDA2Nn0.xaToS7jUyXxfCOcyn5ZZaW-4bZgt8HIZKkqk2fdpqi4";
console.log("creating supaclient");
const supabase = createClient(supabaseUrl, supabaseKey);

const authProvider = {
  login: ({ username, password }) =>
    supabase.auth.signIn({ email: username, password }),
  logout: () => supabase.auth.signOut(),
  checkError: ({ status }) => {
    if (status === 401 || status === 403) {
      return Promise.reject();
    }
    return Promise.resolve();
  },
  checkAuth: () => {
    console.log("check auth");
    return supabase.auth.session() ? Promise.resolve() : Promise.reject();
  },
  getPermissions: () => Promise.resolve(),
};

console.log("creating supabaseDataProvider");

const supabaseDataProviderI = supabaseDataProvider(supabase, authProvider);

export default supabaseDataProviderI;
