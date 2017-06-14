import React from 'react';
import { formatPrice } from '../helpers';

class Fish extends React.Component {
	render() {
		// a little bit data massging
		/*const details = this.props.details or const { details } = this.props*/
		 const details = this.props.details;
		 // console.log(details);

		return(
			<li className="menu-fish">
				<img src={details.image} alt={this.props.details.name} />
				<h3 className="fish-name">
					{details.name}
					<span className="price">{formatPrice(details.price)}</span>
				</h3>
				<p>{details.desc}</p>
				<button>Add to Cart</button>
			</li>
		)
	}
}

export default Fish;