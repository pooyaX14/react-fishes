import React from 'react';

class StorePicker extends React.Component {
	render() {
		// return React.createElement('p', { className: 'Testing'}, 'I love you');
		// jsx code below
		return(
			<form className='store-selector'>
				{ /* this is how you comment in jsx */}
				<h2>Please Enter a Store</h2>
				<input type="text" required placeholder="StoreName"/>
				<button type="submit">Visit Store -></button>
			</form>
			
		)
	}
}

export default StorePicker;