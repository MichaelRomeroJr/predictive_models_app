import React, { useState, Alert, Button , useRef} from 'react';

import './App.css';
import xtype from 'xtypejs'

const About = () => {
	const away_team_input = useRef();
	const home_team_input = useRef();
	const year_of_season_input = useRef();

	const getInitialState = () => {
		const season_year = "";
		return season_year;
	};
	const [season_year, setValue] = useState(getInitialState);
	const changeSeasonYear = (e) => {
		setValue(e.target.value);
	};

	return (

		<div className="container mx-auto p-4">

			<header className="flex justify-between items-center py-4">
				<div className="flex items-center space-x-2">
					<h1 className="text-xl font-bold">About: </h1>
				</div>
			</header>

			<main className="flex space-x-4">
				<div >
				</div>

				<div className="w-1/4 space-y-4"> {/* Right Column*/}
					<div className="space-y-2">
					</div>

				</div>
			</main>
		</div>
	);
};

export default About;
