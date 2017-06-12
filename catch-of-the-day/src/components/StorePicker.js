import React from 'react';
import { getFunName } from '../helpers';
class StorePicker extends React.Component {
	// to bind Store Picker comaponent to this keyword
	/*constructor() {
		super();
		this.goToStore = this.goToStore.bind(this); //this inside bind method means StorePicker
	}
*/
	goToStore(event) {
			// first grab the text from the box
			//second we're going to transition from / to /store/:storeId. storeId is a variable.
			event.preventDefault();  /*Prevents the default behaviour of the form that is refreshing 
			                           the page or route to another page to send other data along 
			                           with it when u click the button*/
			/*This is how you fetch value in Jquery--> const value = $('input').val(); */

			console.log("You clicked the url");
			/* if you try to print the value of this which is null now. So how do we bind this to 
			 StorePicker component? */
			const storeId = this.storeInput.value; 
			console.log(`going to ${storeId}`)
			this.context.router.transitionTo(`/store/${storeId}`);



	}

	render() {
		// return React.createElement('p', { className: 'Testing'}, 'I love you');
		// jsx code below
		return(
			<form className='store-selector' onSubmit={this.goToStore.bind(this)}> 
				{/* or (e) => this.goToStore(e) another way to bind this with component StorePicker*/} 
				{ /* this is how you comment in jsx */}
				<h2>Please Enter a Store</h2>
				<input type="text" required placeholder="Store Name" 
				defaultValue={ getFunName() } ref={ (input) => { this.storeInput = input; }}/>
				<button type="submit">Visit Store -></button>
			</form>
			
		)
	}
}

export default StorePicker;

StorePicker.contextTypes = {
	router: React.PropTypes.object
}

/* Before ES6 React, you would write your code in the way that is written below. And here, this
would be bind to actual component StorePicker without any fuss */

/*var StorePicker = React.createClass({
	goToStore(){
		Console.log(this); // this == StorePicker
	},
	render(){
		return(){
			<h1>Hi</h1>
		}
	}
});*/