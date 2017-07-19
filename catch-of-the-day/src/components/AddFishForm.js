import React from 'react';

class AddFishForm extends React.Component {
	createFish(event) {
		event.preventDefault();
		console.log("gonna make some fish!!");
		/*
		how do we uptream the fish data to App component which is couple of
			level up? Hmm, that is where props comes into the picture. 
		   We pass down data via props.		
		*/

		const fish = { 
			name: this.name.value,
			price:this.price.value,
			status:this.status.value,
			desc: this.desc.value,
			image:this.image.value,
		}
		//console.log(fish); 
		
		this.props.addFish(fish);
		this.fishForm.reset(); // to reset the form after submitting
		
		// Now we have fish object but how do we actually get it to our app or get it to state?
		/* Your state is always tied to specific component. In our case, it's App component. 
		   Each component can have it's own state. In our case, fish state is refernced at three 
		   places and those are App, Order, Inventory components.*/
		   /*App is our parent component which then pass the state down to other components*/
	}
    render() {
        return(
          <form  ref={(input) => this.fishForm = input} className="fish-edit" onSubmit={(e) => this.createFish(e)}>
          	<input ref={(input) => this.name = input} type="text" placeholder="Fish Name"/>
          	<input ref={(input) => this.price = input} type="text" placeholder="Fish Price"/>
          	<select ref={(input) => this.status = input} >
          		<option value="available">Fresh!</option>
          		<option value="unavailable">Sold Out!</option>
          	</select>
          	<textarea ref={(input) => this.desc = input} type="text" placeholder="Fish Desc"></textarea>
          	<input ref={(input) => this.image = input} type="text" placeholder="Fish Image"/>
          	<button type="submit">+ Add Item</button>
          </form>
        )
    }
}
AddFishForm.propTypes = {
	addFish:React.PropTypes.func.isRequired
}
export default AddFishForm;