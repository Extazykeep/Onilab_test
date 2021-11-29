import { Switch, Route, Redirect } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";
import GuestRoute from "../components/GuestRoute/GuestRoute";
import AuthPage from "../../Components/AuthPage/AuthPage"
import DashboardPage from "../../Components/DashboardPage/DashboardPage"
import useAuth from "../../hooks/useAuth";


function Routes() {
  const auth = useAuth();  
  return (
    <Switch>    
      <Route exact path="/">        
         {auth.user ? 
        <Redirect to="/dashboard" />        
         :
        <Redirect to="/auth" />
        } 
      </Route>  
      <PrivateRoute path="/dashboard">
          <DashboardPage />
      </PrivateRoute>
      <GuestRoute path="/auth">
          <AuthPage />
      </GuestRoute>     
    </Switch>
  )
}
export default Routes;
