// import React from 'react';
// import AddFishForm from './AddFishForm';

// class Inventory extends React.Component {
// 	constructor(){
// 	  super();
// 	  this.renderInventory = this.renderInventory.bind(this);
// 	  this.handleChange = this.handleChange.bind(this);
// 	}
// 	handleChange(e, key) {
// 		const fish = this.props.fishes[key];
// 		//take a copy of that fish and update it with the new data
// 		// const updatedFish = Object.assign({}, fish);
// 		const updatedFish = {
// 			...fish,
// 			[e.target.name]:e.target.value
// 		}
// 		//console.log(e.target.name, e.target.value);
// 		// console.log(updatedFish);
// 		this.props.updateFish(key, updatedFish);
// 	}
// 	renderInventory(key) {
// 		const fish = this.props.fishes[key];
// 		return (
// 			<div className="fish-edit" key={key}>
// 				<input type="text" name="name" value={fish.name} placeholder="Fish Name" 
// 				onChange={(e) => this.handleChange(e, key)}/>
// 				<input type="text" name="price" value={fish.price} placeholder="Fish Price"
// 				onChange={(e) => this.handleChange(e, key)}/>
// 				<select type="text" name="status" value={fish.status} placeholder="Fish Status"
// 				onChange={(e) => this.handleChange(e, key)}>
// 					<option value="available">Fresh!</option>
// 					<option value="unavailable">Sold Out!</option>
// 				</select>
// 				<textarea type="text" name="desc" value={fish.desc} placeholder="Fish Desc"
// 				onChange={(e) => this.handleChange(e, key)}></textarea>
// 				<input type="text" name="image" value={fish.image} placeholder="Fish Image" 
// 				onChange={(e) => this.handleChange(e, key)}/>
// 				<button onClick={ ()=> this.props.removeFish(key) }>Remove Fish</button>
// 			{/*understand when to pass argument in the function? like key and event?*/}
// 			</div>
// 		)
// 	}
//     render() {
//         return(
//         	<div>
// 	          <h2>Inventory is defined</h2>
// 	          {Object.keys(this.props.fishes).map(this.renderInventory)}
// 	          <AddFishForm addFish={ this.props.add}/>
//         	  <button onClick={ this.props.loadSamples }>Load Sample Fishes</button>
//         	</div>
//         )
//     }
// }
// Inventory.propTypes = {
// 	fishes:React.PropTypes.object.isRequired,
// 	add:React.PropTypes.func.isRequired,
// 	loadSamples:React.PropTypes.func.isRequired,
// 	updateFish:React.PropTypes.func.isRequired
// }

// export default Inventory;
import React from 'react';
import AddFishForm from './AddFishForm';
import base from '../base';
import firebase from '@firebase/app';
require('firebase/auth');

// require('firebase/auth');

class Inventory extends React.Component {
  constructor() {
    super();
    this.renderInventory = this.renderInventory.bind(this);
    this.renderLogin = this.renderLogin.bind(this);
    this.authenticate = this.authenticate.bind(this);
    this.logout = this.logout.bind(this);
    this.authHandler = this.authHandler.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      uid: null,
      owner: null
    }
  }

  componentDidMount() {
  	var that = this;
    // base.onAth((user) => {
    firebase.default.auth().onAuthStateChanged(function(user) {
      if(user) {
        that.authHandler({ user });
      }
    });
  }

  handleChange(e, key) {
    const fish = this.props.fishes[key];
    // take a copy of that fish and update it with the new data
    const updatedFish = {
      ...fish,
      [e.target.name]: e.target.value
    }
    this.props.updateFish(key, updatedFish);
  }

  authenticate(provider) {
    // base.authWithOAuthPopup(provider, this.authHandler);
    if(provider === 'github') {
    	const provider = new firebase.auth.GithubAuthProvider();
    	 // provider.addScope('repo');
    	 firebase.auth().signInWithPopup(provider).then(this.authHandler);
    }
    else if(provider === 'facebook') {
		const provider = new firebase.auth.FacebookAuthProvider();
		firebase.auth().signInWithPopup(provider).then(this.authHandler);
    }
    else if(provider === 'twitter') {
    	const provider = new firebase.auth.TwitterAuthProvider();
    	firebase.auth().signInWithPopup(provider).then(this.authHandler);
    }
  }

  logout() {
    // firebase.unauth();
    firebase.auth().signOut().then(() => {
  	//return value is null
  		this.setState({ uid: null,
  			owner:null })
	});
  }

  authHandler(authData)  {
    console.log(authData);
    // if (err) {
    //   console.error(err);
    //   return;
    // }

    // grab the store info
    const storeRef = firebase.database().ref(this.props.storeId);

    // query the firebase once for the store data
    storeRef.once('value', (snapshot) => {
      const data = snapshot.val() || {};

      // claim it as our own if there is no owner already
      if(!data.owner) {
        storeRef.set({
          owner: authData.user.uid
        });
      }

      this.setState({
        uid: authData.user.uid,
        // owner: data.owner || authData.user.uid
        owner: authData.user.uid
      });
    });

  }

  renderLogin() {
    return (
      <nav className="login">
        <h2>Inventory</h2>
        <p>Sign in to manage your store's inventory</p>
        <button className="github" onClick={() => this.authenticate('github')}>Log In with Github</button>
        <button className="facebook" onClick={() => this.authenticate('facebook')} >Log In with Facebook</button>
        <button className="twitter" onClick={() => this.authenticate('twitter')} >Log In with Twitter</button>
      </nav>
    )
  }

  renderInventory(key) {
    const fish = this.props.fishes[key];
    return (
      <div className="fish-edit" key={key}>
        <input type="text" name="name" value={fish.name} placeholder="Fish Name" onChange={(e) => this.handleChange(e, key)} />
        <input type="text" name="price" value={fish.price} placeholder="Fish Price"  onChange={(e) => this.handleChange(e, key)}/>

        <select type="text" name="status" value={fish.status} placeholder="Fish Status" onChange={(e) => this.handleChange(e, key)}>
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>

        <textarea type="text" name="desc" value={fish.desc} placeholder="Fish Desc" onChange={(e) => this.handleChange(e, key)}></textarea>
        <input type="text" name="image" value={fish.image} placeholder="Fish Image" onChange={(e) => this.handleChange(e, key)}/>
        <button onClick={() => this.props.removeFish(key)}>Remove Fish</button>
      </div>
    )
  }

  render() {
  	console.log(this.state.uid)
    console.log(this.state.owner)
    const logout = <button onClick={this.logout}>Log Out!</button>;

    // check if they are no logged in at all
    if(!this.state.uid) {
      return <div>{this.renderLogin()}</div>
    }

    // Check if they are the owner of the current store
    if(this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>Sorry you aren't the owner of this store!</p>
          {logout}
        </div>
      )
    }

    return (
      <div>
        <h2>Inventory</h2>
        {logout}
        {Object.keys(this.props.fishes).map(this.renderInventory)}
        <AddFishForm addFish={this.props.addFish}/>
        <button onClick={this.props.loadSamples}>Load Sample Fishes</button>
      </div>
    )
  }

  static propTypes = {
    fishes: React.PropTypes.object.isRequired,
    updateFish: React.PropTypes.func.isRequired,
    removeFish: React.PropTypes.func.isRequired,
    addFish: React.PropTypes.func.isRequired,
    loadSamples: React.PropTypes.func.isRequired,
    storeId: React.PropTypes.string.isRequired
  };
}

export default Inventory;
