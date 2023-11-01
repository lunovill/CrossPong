import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

interface GuardedRouteProps extends RouteProps {
  // Si l'utilisateur est authentifié, isAuth sera vrai. Sinon, faux.
  isAuth: boolean;
}

const GuardedRoute: React.FC<GuardedRouteProps> = ({ isAuth, ...routeProps }) => {
  if (isAuth) {
    return <Route {...routeProps} />;
  } else {
    // Rediriger vers la page de connexion si l'utilisateur n'est pas authentifié
    return <Redirect to="/login" />;
  }
};

export default GuardedRoute;