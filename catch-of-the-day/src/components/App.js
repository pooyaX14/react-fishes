import React from 'react';
import Header from './Header'; 
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';

class App extends React.Component { // parent component
	constructor() {
		// In order to use this keyword, one must call super()
		super();

		this.addFish = this.addFish.bind(this);
		this.loadSamples = this.loadSamples.bind(this);
		this.addToOrder = this.addToOrder.bind(this);
		//get initialState
		this.state = { // storing fish form data in state.
			fishes:{},
			order :{}
		};
	}

	componentWillMount() {
		this.ref = base.syncState(`${this.props.params.storeId}/fishes`, 
		{
			context:this,
			state:'fishes'
		});
	}

	componentWillUnmount() {
		base.removeBinding(this.ref);
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
//console.log(fishes);
	addToOrder(key) {
		// take a copy of our state
		const order = {...this.state.order};

		// update or add the new number of fish ordered
		order[key] = order[key]+1 || 1;
		
		// update our state
		this.setState({order:order});

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
							.map(key => <Fish key={ key } index={key} details={ this.state.fishes[key]} 
								addToOrder={this.addToOrder}/>) 
							/*need to add key props so that it can differentiate which fish was edited*/
							// key={key} this is for react to handle keys 
							// index={key} if you want to pass down the keys to other components; you'll 
							// create componenet to do that. we created index props here to do that.
						}
					</ul>
				</div>
				<Order fishes={this.state.fishes} order={this.state.order}/>
				<Inventory add={ this.addFish } loadSamples={ this.loadSamples}/>
			</div>
		)
	}
}

export default App;