import Button from ".components/ui/button";
import { Route,Routes } from "react-router-dom";
import {AuthPage} from "./pages/auth"
import RouteGuard from "./components/route-guard";
import { useContext } from "react";
import { AuthContext } from "./context/auth-context";

function App(){
  const {auth}=useContext(AuthContext);
  return (
    <Routes>
      <Route path="/auth" element={<RouteGuard 
      element={<AuthPage/>}
      authenticated={auth?.authenticated}
      user={auth?.user}

      />}
      />
      <Route
        path="/instructor"
        element={
          <RouteGuard
            element={<InstructorDashboardpage />}
            authenticated={auth?.authenticate}
            user={auth?.user}
          />
        }
      />
    </Routes>
  );
}

export default App;