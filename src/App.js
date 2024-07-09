import React, { useState, Alert, Button , useRef} from 'react';

import './App.css';

const App = () => {
	const away_team_input = useRef();
	const home_team_input = useRef();
	const year_of_season_input = useRef();
	const [treeDepth, setTreeDepth] = useState(5);

	function possionModel1(){
		// Display Results for Model 1
		// 2 methods: predicit specific match (have home/away team names)
		// 		check accuracy of model by entire season (year string)
		// TODO: launch training script.py
		console.log('Poisson Model 1 click')

		// Teams or Year
		// let home_team = home_team_input.current.value;
		// let away_team = away_team_input.current.value;
		let home_team = 'Brazil';
		let away_team = 'Argentina';
		// let year_of_season = year_of_season_input.current.value;
		console.log(home_team + ' v ' + away_team)
		// if predicting specific matchup assume it's for year 2024


		// Display Results on page
		// 		get image element
		const myImage = document.getElementById("my-image");
		// 			change src url
		myImage.src = "https://www.six-sigma-material.com/images/PoissonFormula.GIF"
			

		// 		set text element
		const model_output_text = document.getElementById("model_output_id");
		var model_output_dictionary = require('../data/' + home_team + '-' + away_team + '.json');
		var string_winner = "Winner: " +  model_output_dictionary['Method 1 Winner'] + '. <br>'
		var string_final_score = "Final Score: " + model_output_dictionary['Home Goals'] + 
			'-' + model_output_dictionary['Away Goals']
		model_output_text.innerHTML = string_winner + string_final_score

		console.log('possionModel1 displayed')
		// myImage.hidden = !myImage.hidden # toggle img.hidden property
	}
	function possionModel2(){
		console.log('Poisson Model 2 click')

		let home_team = 'Brazil';
		let away_team = 'Argentina';

		// get element
		const myImage = document.getElementById("my-image");
		// toggle img.hidden property
		// if (myImage.hidden) {myImage.hidden = !myImage.hidden }
		// change img.src url
		// myImage.src = "https://i0.wp.com/statisticsbyjim.com/wp-content/uploads/2021/08/Poisson_distribution_example.png?w=576&ssl=1"
		myImage.src = require("../data/" + home_team + "-" + away_team + "-pmf.jpg")

		// 		set text element
		const model_output_text = document.getElementById("model_output_id");
		// model_output_text.innerHTML = "Model 2 Output Text";
		var model_output_dictionary = require('../data/' + home_team + '-' + away_team + '.json');
		var string_winner = "Winner: " +  model_output_dictionary['Method 2 Winner'] + '. <br>'
		var string_final_score = "Point Spread: " + model_output_dictionary['Point Spread'] + 
			" by " + model_output_dictionary['Point Spread %'] + "%"
		model_output_text.innerHTML = string_winner + string_final_score

		console.log('possionModel2 displayed')
	}

	function loadData(){
		console.log('loading data ...')
		// console.log('const showImageButton: from id show-image-button')
		// const showImageButton = document.getElementById("show-image-button");
		// console.log('const myImage: from id my-image')
		// const myImage = document.getElementById("my-image");
		// console.log('showImageButton.addEventListener')
		// showImageButton.addEventListener("click", () => {
		// 	myImage.hidden = !myImage.hidden;
		// });
	}

	const [season_year , setSeasonYear] = useState('en')
	function changeSeasonYear(event){
		// i18n.changeLanguage(event.target.value)
		setSeasonYear(event.target.value)
	  }

	return (

		<div className="container mx-auto p-4">

			<header className="flex justify-between items-center py-4">
				<div className="flex items-center space-x-2">
					{/* pick logo */}
					{/* 
					<img src="logo.png" alt="Logo" className="w-8 h-8"
					/> 
					*/}
					<h1 className="text-xl font-bold">Machine Learning Playground</h1>
				</div>
			</header>

			<main className="flex space-x-4">
				<div >
					<img id="my-image" src=""
						// hidden
						>
					</img>
					<div id="model_output_id">
					</div>
				</div>
				{/* Image and Text side by side */}
				{/* <img id="my-image" src="" 
					// hidden
					>
				</img>
				<div id="model_output_id"> 
				</div> */}


				{/* space between data display and right column
				<div className="w-3/4 bg-gray-100 p-4"> </div> */
				}

				<div className="w-1/4 space-y-4"> {/* Right Column*/}
					
					<div className="space-y-2">
						Predict Specific Matchup
						<div className="flex space-x-2">
							{/* <button className="bg-orange-500 w-8 h-8"></button>
							<button className="bg-purple-500 w-8 h-8"></button>
							<button className="bg-red-500 w-8 h-8"></button> */}
							<input id="home_team_input"
								type="text" style={{}}
								ref={home_team_input}  
								placeholder='Home Team'
								size="10" 
							/>
							<input id="away_team_input"
								type="text" style={{}}
								ref={away_team_input}  
								placeholder='Away Team'
								size="10" 
							/>
						</div>
						Test Accuracy By Season
						<div className="flex space-x-3"> 
							{/* 
							<input id="year_of_season_input"
								type="text" style={{}}
								ref={year_of_season_input}  
								placeholder='Year'
								size="10" 
							/> 
							*/}
						<select value={season_year} onChange={changeSeasonYear}>
							<option value="2023">2023</option>
							<option value="2022">2022</option>
						</select>
						</div>
					</div>

					<div className="space-y-2"> {/* Models */}
						<button
							id="PoissonModel" 
							className="border-2 border-black py-2 px-4 w-full flex items-center space-x-2"
							 onClick={possionModel1}
						>
							<span>Poisson Model 1</span>
						</button>
						<button 
							className="border-2 border-black py-2 px-4 w-full flex items-center space-x-2"
							onClick={possionModel2}
						>
							<span>Poisson Model 2</span>
						</button>
						<button className="border-2 border-black py-2 px-4 w-full flex items-center space-x-2">
							<span>Support Vector Machine</span>
						</button>
						<button className="border-2 border-black py-2 px-4 w-full flex items-center space-x-2">
							<span>Regression</span>
						</button>
						<button className="border-2 border-black py-2 px-4 w-full flex items-center space-x-2 border-black">
							<span>Artificial Neural Network</span>
						</button>
					</div>

					<p>Train w/ your own data (coming soon) </p>
					<div className="space-y-2"> {/* Upload Data */}		
						<button className="bg-gray-200 py-2 px-4 rounded">Upload Data</button>
						{/* <button className="bg-gray-200 py-2 px-4 rounded">Save Data</button> */}
						<button className="bg-gray-200 py-2 px-4 rounded">Clear all</button>
					</div>
					<div className="space-y-2">
						<button className="bg-gray-200 py-2 px-4 rounded">Train</button>
					</div>
				</div>
			</main>
		</div>
	);
};

export default App;
