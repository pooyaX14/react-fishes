import React from 'react';
import Header from './Header'; 
import Order from './Order';
import Inventory from './Inventory';
import * as sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';

class App extends React.Component { // parent component
  constructor() {
    // In order to use this keyword, one must call super()
    super();

    this.addFish = this.addFish.bind(this);
    this.removeFish = this.removeFish.bind(this);
    this.loadSamples = this.loadSamples.bind(this);
    this.addToOrder = this.addToOrder.bind(this);
    this.removeFromOrder = this.removeFromOrder.bind(this);
    this.updateFish = this.updateFish.bind(this);
    //get initialState
    this.state = { // storing fish form data in state.
      fishes:{},
      order :{}
    };
  }
/*so we have our fishes state linking to our firebase database*/
  componentWillMount() {
    // this runs right before the <App> is rendered
    this.ref = base.syncState(`${this.props.params.storeId}/fishes`, 
    {
      context:this,
      state:'fishes'
    });

    // check if there is any order in localStorage

    const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);
    if(localStorageRef) {
      // update our App component's order state
      this.setState({
        order:JSON.parse(localStorageRef) // converting String<{"fish1:2", fish3:1 ...}> back to Object
      });
    }
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }
  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem(`order-${this.props.params.storeId}`, 
      JSON.stringify(nextState.order));
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
  updateFish(key, updatedFish) {
    const fishes = {...this.state.fishes};
    fishes[key] = updatedFish;
    this.setState({fishes});
  }
  removeFish(key) {
    const fishes = {...this.state.fishes};
     // delete fishes[key]; 
     // we could've done it but due to weirdness of firebase we can't use this line
     fishes[key] = null;
     this.setState({fishes});
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
    console.log(`order key is : "${order[key]}"`);
    
    // update our state
    this.setState({order:order});
    console.log("inside addToOrder app.js-->" + JSON.stringify(order[key]));

  }
  removeFromOrder(key){
    const order = {...this.state.order};
    delete order[key];
    this.setState({ order });
  }

  render() {
    console.log("this.state.fishes", this.state.fishes)
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
        <Order 
          fishes={this.state.fishes} 
          order={this.state.order}
          params={this.props.params}
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory 
        add={ this.addFish } 
        removeFish={this.removeFish}
        loadSamples={ this.loadSamples}
        fishes={this.state.fishes}
        updateFish={this.updateFish}
        />
      </div>
    )
  }
}

App.propTypes = {
  params: React.PropTypes.object.isRequired
}
export default App;

