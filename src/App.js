import React, { useState, Alert, Button , useRef} from 'react';

import './App.css';
import xtype from 'xtypejs'

// import blank from 'b.jfif';


const App = () => {
	const away_team_input = useRef();
	const home_team_input = useRef();
	const year_of_season_input = useRef();

	function possionModel1(){
		// 2 methods: predicit specific match (have home/away team names)
		// 		check accuracy of model by entire season (year string)

		let home_team = home_team_input.current.value;
		let away_team = away_team_input.current.value;

		var file_name = ""
		if (season_year != 'Year' && season_year.length != 0) { // test by season
			file_name =  "2024_PoissonFormula"

			var model_output_file_name = season_year + "_results"
			var model_output_dictionary = require('../data/poisson/' + model_output_file_name + '.json');
			var string_percent_accurate = model_output_dictionary['model1_accuracy%'] + '% accurate'
			var output_text = "Poisson Averages to predict ML: " + 
				model_output_dictionary['model1_accuracy%'] + '%'
		}

		if (home_team.length != 0) { // test by matchup
			file_name =  "2024_PoissonFormula"
			var model_output_dictionary = require('../data/poisson/' + home_team + '-' + away_team + '.json');
			var string_winner = "Winner: " +  model_output_dictionary['Method 1 Winner'] + '. <br>'
			var string_final_score = "Final Score: " + model_output_dictionary['Home Goals'] + 
				'-' + model_output_dictionary['Away Goals']
			var output_text = string_winner + string_final_score
		}

		var model_description_text = "Model Description: " + 
			"For a given match, the Dixon Coles model calculates the expected goals for both teams. " +
			"Using the Poisson distribution and the expected goals, we can then determine the probability of various match outcomes. " +
			"P(X_i,j =x, Y_j,i =y) = (e−^λ*λ^x)/x! * (e^−μ*μ^y)/y! where λ=α_i*β_j*γ μ=α_j*β_i" +
			"In this equation, i and j refer to the home and away teams, respectively; " +
			"α and β denote each team’s attack and defensive strength, respectively, " +
			"while γ represents the home advantage factor. " +
			"So, we need to calculate α and β for each team, as well as γ" +
 			"(the home field advantage term)."

		// Display Results (graphic/text output)
		const myImage = document.getElementById("my-image"); 

		// change img.src url and output text
		if (file_name.length != 0) {
			myImage.hidden = false
			myImage.src = require("../data/poisson/" + file_name + ".jpg") 
			const model_output_text = document.getElementById("model_output_id"); 
			model_output_text.innerHTML = output_text

			const model_descriton = document.getElementById("model_description"); 
			model_descriton.innerHTML = model_description_text
		}
	}

	function possionModel2(){
		let home_team = home_team_input.current.value;
		let away_team = away_team_input.current.value;

		var file_name = ""

		if (season_year != 'Year' && season_year.length != 0) { // test season
			file_name = season_year + "_season" 
			var model_output_file_name = season_year + "_results"
			var model_output_dictionary = require('../data/poisson/' + model_output_file_name + '.json');
			var pointspread_as_ml = "Poisson pmf pointspread to predict ML: " + 
				model_output_dictionary['model_2_pointspread_as_ml_accuracy%'] + "%"
			var pointspread_accuracy = "Poisson pmf predicts exact match score " + 
				model_output_dictionary['model_2_pointspread_exact_accuracy'] + "%"
			var output_text = pointspread_as_ml  + '<br>' + pointspread_accuracy
		}
		if (home_team.length != 0) { // test matchup
			file_name =  home_team + "-" + away_team + "-pmf"
			var model_output_dictionary = require('../data/poisson/' + home_team + '-' + away_team + '.json');
			var string_winner = "Winner: " +  model_output_dictionary['Method 2 Winner'] + '. <br>'
			var string_final_score = "Point Spread: " + model_output_dictionary['Point Spread'] + 
				" by " + model_output_dictionary['Point Spread %'] + "%"
			var output_text = string_winner + string_final_score
		}

		var model_description_text = "Model Description: " +
			"Observe the Poisson Distribution of each point spread. " +
			"Pick the point spread with the highest probability. " +
			"Most likely point spread determines Money Line."
	
		// set image element
		const myImage = document.getElementById("my-image");
		// change img.src url and output text
		if (file_name.length != 0) {
			myImage.src = require("../data/poisson/" + file_name + ".jpg") 
			const model_output_text = document.getElementById("model_output_id");
			model_output_text.innerHTML = output_text

			const model_descriton = document.getElementById("model_description"); 
			model_descriton.innerHTML = model_description_text
		}
	}

	function svmModel3(){
		let home_team = home_team_input.current.value;
		let away_team = away_team_input.current.value; 
		
		var file_name = ""

		if (season_year != 'Year' && season_year.length != 0) { // test season
			file_name = season_year + "_" + "season"			
			var model_output_file_name = season_year + "_results"
			var model_output_dictionary = require('../data/svm/' + model_output_file_name + '.json');
			var model_3_ml_accuracy_perc = "SVM to predict ML: " + 
				model_output_dictionary['model_3_ml_accuracy%'] + "%"
			var output_text = model_3_ml_accuracy_perc  + '<br>'
		}
		if (home_team.length != 0) { // test matchup
			file_name = "model_2_2023_" + home_team + "-" + away_team
			var output_text = "coming soon"
		}

		var model_description_text = "Model Description: " +
			"SVM can be used to predict winners of a soccer game by analyzing historical match data, " +
			"including features like team performance, player statistics, and game conditions. " +
			"By mapping this data into a high-dimensional space, " +
			"the SVM algorithm can identify patterns and decision boundaries that distinguish between winning and losing outcomes. " +
			"Once trained, the SVM model can predict the probability of a team winning a future game based on similar input features."

		// set image element
		const myImage = document.getElementById("my-image");

		// change img.src url and output text
		if (file_name.length != 0) {
			myImage.src = require("../data/svm/" + file_name + ".jpg")
			const model_output_text = document.getElementById("model_output_id"); 
			model_output_text.innerHTML = output_text

			const model_descriton = document.getElementById("model_description"); 
			model_descriton.innerHTML = model_description_text
		}
	}

	function regressionModel4(){
		let home_team = home_team_input.current.value; 
		let away_team = away_team_input.current.value; 
		
		var file_name = ""
		if (season_year != 'Year' && season_year.length != 0) { // test season
			file_name = season_year + "_season"
			var model_output_file_name = season_year + "_season"
			var model_output_dictionary = require('../data/regression/' + model_output_file_name + '.json');
			var model_3_ml_accuracy_perc = "Regression to predict ML: " + 
				model_output_dictionary['model_4_ml_accuracy%'] + "%"
			var output_text = model_3_ml_accuracy_perc  + '<br>'
		}
		if (home_team.length != 0) { // test matchup
			file_name = home_team + "-" + away_team
			var model_output_dictionary = require('../data/regression/' + home_team + '-' + away_team + '.json');
			var string_winner = "Winner: " +  model_output_dictionary['Winner'] + " by " 
				+ model_output_dictionary['Probabilty'] + "%"
			var output_text = string_winner
		}

		var model_description_text = "Model Description: " +
			"Regression analysis can predict winners of a soccer game by modeling the relationship between various input features, " +
			"such as team statistics, player performance, and game conditions, and the game's outcome. " + 
			"By fitting a regression model to historical data, it can quantify the impact of these factors on the likelihood of winning. " + 
			"The model can then be used to estimate the probability of a team's victory in future matches based on similar data inputs."

		// set image element
		const myImage = document.getElementById("my-image");

		// change img.src url and output text
		if (file_name.length != 0) {
			myImage.src = require("../data/regression/" + file_name + ".jpg") 
			const model_output_text = document.getElementById("model_output_id"); 
			model_output_text.innerHTML = output_text
		}
	}

	function rnnModel5(){		
		// set image element
		const myImage = document.getElementById("my-image");
		var file_name = ""
		myImage.src = ""
		// change img.src url and output text
		const model_output_text = document.getElementById("model_output_id"); 
		model_output_text.innerHTML = "coming soon"
		const model_descriton = document.getElementById("model_description"); 
		model_descriton.innerHTML = ""
	}
	
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
					{/* pick logo */}
					{/* 
					<img src="logo.png" alt="Logo" className="w-8 h-8"
					/> 
					*/}
					<h1 className="text-xl font-bold">Machine Learning Sandbox</h1>
				</div>
			</header>

			<main className="flex space-x-4">
				<div>
					<img id="my-image" src=""
						class="my-image"
						hidden
						>
					</img>
					<div id="model_output_id"></div>
					<div id="model_description"></div>
				</div>

				{/* space between data display and right column
				<div className="w-3/4 bg-gray-100 p-4"> </div> */
				}

				<div className="w-1/4 space-y-4"> {/* Right Column*/}
					
					<div className="space-y-2">
						Predict Specific Matchup
						<div className="flex space-x-2">
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
						<select value={season_year} onChange={changeSeasonYear}>
							<option value="Year"></option>
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
						<button className="border-2 border-black py-2 px-4 w-full flex items-center space-x-2"
							onClick={svmModel3}
						>
							<span>Support Vector Machine</span>
						</button>
						<button className="border-2 border-black py-2 px-4 w-full flex items-center space-x-2"
							onClick={regressionModel4}
						>
							<span>Regression</span>
						</button>
						<button className="border-2 border-black py-2 px-4 w-full flex items-center space-x-2 border-black"
							onClick={rnnModel5}
						>
							<span>Recurrent Neural Network</span>
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
		
		<br/>
		<div>
			About: 
			Test different machine learning models to predict outcomes of soccer matches. <br/>
			<li>Test by season - back test historical data to see how accurate model is accross entire season. </li>
			<li>Predict Matchup - enter home team and away team and predict money line (winner). </li>
				
			Disclaimer: This is a demo version. Valid teams for predictions are 
			Argentina, Belgium, Brazil, England, France, Italy,
        	Netherlands, Portugal, Spain, and United States.
		</div> 
		</div>
	);
};

export default App;
