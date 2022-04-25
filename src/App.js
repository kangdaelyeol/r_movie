import React, { useEffect, useState } from 'react';
import './app.css';

const App = () => {
	const [loading, setLoading] = useState(true);
	const [movie, setMovie] = useState([]);
	const getMovie = async () => {
		const json = await (
			await fetch(
				'https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year'
			)
		).json();
		console.log(json);
		setLoading(false);
		setMovie(json.data.movies);
	};

	useEffect(() => {
		getMovie();
	}, []);

	return (
		<div className='App'>
			{loading ? (
				'Loading...'
			) : (
				<ul className='movies'>
					{movie.map((item) => (
						<div className='movie_grid_item'>
							<div className='movie_wrapper'>
								<div className='movie_info_wrapper'>
									<div key={item.id} className='movie_info_part'>
										<img
											className='info_left'
											src={item.medium_cover_image}
											alt={item.title}
										/>
										<div className='info_right'>
											<h3 className='info_right_title'>{item.title}</h3>
											<div className='info_right_gernes'>
												{item.genres.map((genre) => (
													<span className='gerne' key={genre}>
														{genre}{' '}
													</span>
												))}
											</div>
										</div>
									</div>
								</div>
								<div className='movie_summary_part'>
									<h2 className='summary_title'>{item.title}</h2>
									<p className='summary'>{item.summary.length === 0 ? <p>No Summary</p> : item.summary}</p>
								</div>
							</div>
						</div>
					))}
				</ul>
			)}
		</div>
	);
};

export default App;
