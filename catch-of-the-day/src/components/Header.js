import React from 'react';

// class Header extends React.Component {
		render() {
				return(
					<header className="top">
						<h1>Catch 
						<span className="ofThe">
							<span className="of">of</span>
							<span className="the">the</span>
						</span>
						Day</h1>
						{ /**<h3 className="tagline">Fill me In</h3> */ }
					<h3 className="tagline"><span>{this.props.tagline}</span></h3> 
					{/* this is how you pass dynamic
					data in react. tagline class is already defined in App.js component and 
					you've given it props like tagline etc*/}



					</header>
				)
		}
// }

export default Header;