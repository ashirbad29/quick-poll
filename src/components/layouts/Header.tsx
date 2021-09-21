import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
	return (
		<div className='py-16 flex justify-center border-dankPurple border-t-8'>
			<div className='flex flex-col items-center'>
				<Link to='/' className='text-3xl font-bold'>
					Fast Poll <span>⚡</span>
				</Link>
				<p className='mt-4 text-lg font-medium'>
					Create Anonomoys polls for free
				</p>
			</div>
		</div>
	);
};

export default Header;
