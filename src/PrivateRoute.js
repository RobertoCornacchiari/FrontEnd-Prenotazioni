import React from "react";
import { Route, Redirect } from "react-router-dom";

// it redirects to "/" path (home page) if not logged in
function PrivateRoute({ component: Component, ...rest}) {
	const vero = {...rest.codiceUnivoco}!=0;
	return (
		<Route {...rest}
			render={props => {
				return vero ? <Component {...props} contesto={props.contesto}/> : <Redirect to="/" />;
			}}
		/>
	);
}

export default PrivateRoute;