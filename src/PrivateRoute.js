import React from "react";
import { Route, Redirect } from "react-router-dom";


// it redirects to "/" path (home page) if not logged in
function PrivateRoute({ component: Component, ...rest}) {
	const vero = rest.codice;
	console.log(rest); 
	console.log(vero);
	return (
		<Route {...rest}
			render={(props) => {
				return vero ? <Component {...props} contesto={props.contesto}/> : <Redirect to="/" />;
			}}
		/>
	);
}

export default PrivateRoute;