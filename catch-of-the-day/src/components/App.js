import React from 'react';
import Header from './Header'; 
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';

class App extends React.Component { // parent component
	constructor() {
		// In order to use this keyword, one must call super()
		super();

		this.addFish = this.addFish.bind(this);
		this.loadSamples = this.loadSamples.bind(this);
		//get initialState
		this.state = { // storing fish form data in state.
			fishes:{},
			order :{}
		};
	}
	addFish(fi) {
			// update our state
		   const fishes = {...this.state.fishes};
		   // add in our new fish
		   const timestamp = Date.now();
		   fishes[`fish-${timestamp}`] = fi;
		   // set state
		   this.setState({ fishes:fishes });
	}

	loadSamples() {
		this.setState({
			fishes:sampleFishes
		});
	}

	render() {
		return(
			<div className="catch-of-the-day">
				<div className="menu">
					<Header tagline="Fresh Sea Food Market"/>
					<ul className="list-of-fishes">
						{
							Object
							.keys(this.state.fishes)
							.map(key => <Fish key={ key } details={ this.state.fishes[key]}/>) 
							/*need to add key props so that it can differentiate which fish was edited*/
						}
					</ul>
				</div>
				<Order />
				<Inventory add={ this.addFish } loadSamples={ this.loadSamples}/>
			</div>
		)
	}
}

export default App;