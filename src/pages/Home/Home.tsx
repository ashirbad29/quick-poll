import React from 'react';
import { DeleteIcon } from '../../assets/Icons';
const Home = () => {
	return (
		<div className='bg-gray-100 flex-1'>
			<div className='p-4 sm:p-9 w-full md:max-w-4xl mx-auto'>
				<div>
					<h1 className='text-2xl font-bold mb-3 text-gray-700'>
						Create Poll <span>💡</span>
					</h1>
					<p className='text-gray-400 text-lg font-medium'>
						Complete below fields to create a Poll
					</p>
				</div>

				<section className='my-6'>
					<div>
						<h3 className='text-lg font-semibold text-gray-500 mb-3'>
							Poll Question
						</h3>
						<textarea
							name='questions'
							className='w-full p-4 text-lg font-medium text-gray-700 focus:ring-4 ring-purple-300 outline-none rounded-md placeholder-gray-300 border resize-none'
							placeholder='Which is your favorite Programming Language?'
						></textarea>
						<div className='my-2'>
							<h3 className='text-lg font-semibold text-gray-500 mb-1'>
								Option 1
							</h3>
							<div className='w-full flex gap-3 items-center'>
								<input
									type='text'
									placeholder='option 1'
									className='w-full p-2 text-lg outline-none focus:ring-2 ring-purple-300 rounded-md border placeholder-gray-300'
								/>
								<DeleteIcon className='h-5 w-5 cursor-pointer text-red-500' />
							</div>
						</div>
					</div>
				</section>
			</div>
		</div>
	);
};

export default Home;
