import React from 'react';
import { formatPrice } from '../helpers';
import assorted_diet from '../static/media/assorted_diet.jpg';

class Fish extends React.Component {
	render() {
		// a little bit data massaging
		/*const details = this.props.details or const { details } = this.props*/
		/* const index = this.props.index or the below syntax. Both are same*/
		 const { details, index } = this.props;
		 // console.log(details);
		const isAvailable = details.status === 'available';
		const buttonText = isAvailable? 'Add To Order' : 'Sold Out!';
		var image = details.image
		console.log("image is ", image)
		return(
			<li className="menu-fish">
				<img src={ assorted_diet } alt={this.props.details.name} />
				<h3 className="fish-name">
					{details.name}
					<span className="price">{formatPrice(details.price)}</span>
				</h3>
				<p>{details.desc}</p>
				<button disabled={!isAvailable} 
				onClick={() => this.props.addToOrder(index)}>{buttonText}</button>
			</li>
		)
	}
}

Fish.propTypes = {
	addToOrder: React.PropTypes.func.isRequired,
	index:React.PropTypes.func.isRequired,
	details: React.PropTypes.object.isRequired
}
export default Fish;

