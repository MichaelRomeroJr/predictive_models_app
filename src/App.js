import React, { useState, Alert, Button , useRef} from 'react';

import './App.css';
import xtype from 'xtypejs'
import { useCSVReader } from 'react-papaparse';
import * as Papa from 'papaparse';
// import blank from 'b.jfif';
import trainingdata from "./2023.json"


function changeColor(upVoteBtn, btnToggle){
	// console.log(btnToggle)
	upVoteBtn.style.backgroundColor = "transparent";

	// if (btnToggle){
	// 	upVoteBtn.style.backgroundColor = "LightGray";
	// 	btnToggle = false;
	// } else{
	// 	upVoteBtn.style.backgroundColor = "transparent";
	// 	btnToggle = true;
	// }

	upVoteBtn.style.backgroundColor = "LightGray";

	var button_ids = ["Poisson1Button", "Poisson2Button", "SVMButton", "RegressionButton"]
	button_ids = button_ids.filter(e => e !== upVoteBtn.id);
	console.log(button_ids)
	let i = 0;
	while (i < button_ids.length) {
		// console.log(scores[i]);
		var buttontoturnoff = document.getElementById(button_ids[i]);
		buttontoturnoff.style.backgroundColor = "transparent";
		i++;
	}

	return btnToggle
}


const App = () => {
	const away_team_input = useRef();
	const home_team_input = useRef();
	const year_of_season_input = useRef();

	var poisson1modelbuttontoggle = true;
	var poisson2modelbuttontoggle = true;
	var svmmodelbuttontoggle = true;
	var regressionmodelbuttontoggle = true;

	function possionModel1(){
		// 2 methods: predicit specific match (have home/away team names)
		// 		check accuracy of model by entire season (year string)

		
		var modelbuttonelem = document.getElementById("Poisson1Button");
		poisson1modelbuttontoggle = changeColor(modelbuttonelem, poisson1modelbuttontoggle)

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
			"P(X_i,j =x, Y_j,i =y) = (e−^λ*λ^x)/x! * (e^−μ*μ^y)/y! where λ=α_i*β_j*γ μ=α_j*β_i " +
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
			model_output_text.hidden = false

			const model_descriton = document.getElementById("model_description"); 
			model_descriton.innerHTML = model_description_text
			model_descriton.hidden = false

			const data_table = document.getElementById("data-table");
			data_table.hidden = true
		}
	}

	function possionModel2(){

		var modelbuttonelem = document.getElementById("Poisson2Button");
		poisson2modelbuttontoggle = changeColor(modelbuttonelem, poisson2modelbuttontoggle)

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
			myImage.width = 100
			const model_output_text = document.getElementById("model_output_id");
			model_output_text.innerHTML = output_text
			model_output_text.hidden = false

			const model_descriton = document.getElementById("model_description"); 
			model_descriton.innerHTML = model_description_text
			model_descriton.hidden = false

			const data_table = document.getElementById("data-table");
			data_table.hidden = true
		}
	}

	function svmModel3(){

		var modelbuttonelem = document.getElementById("SVMButton");
		svmmodelbuttontoggle = changeColor(modelbuttonelem, svmmodelbuttontoggle)

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
			model_output_text.hidden = false

			const model_descriton = document.getElementById("model_description"); 
			model_descriton.innerHTML = model_description_text
			model_descriton.hidden = false

			const data_table = document.getElementById("data-table");
			data_table.hidden = true
		}
	}

	function regressionModel4(){

		var modelbuttonelem = document.getElementById("RegressionButton");
		regressionmodelbuttontoggle = changeColor(modelbuttonelem, regressionmodelbuttontoggle)

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
			myImage.hidden = false

			const model_output_text = document.getElementById("model_output_id"); 
			model_output_text.innerHTML = output_text
			model_output_text.hidden = false

			const model_descriton = document.getElementById("model_description"); 
			model_descriton.innerHTML = model_description_text
			model_descriton.hidden = false

			const data_table = document.getElementById("data-table");
			data_table.hidden = true
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

		show_data()
	};

	function show_data(){

		home_team_input.current.value = ""
		away_team_input.current.value = ""
		const data_table = document.getElementById("data-table");
		data_table.hidden = false
	} 
	// display training data
	const useSortableData = (items, config = null) => {
		const [sortConfig, setSortConfig] = React.useState(config);
	  
		const sortedItems = React.useMemo(() => {
		  let sortableItems = [...items];
		  if (sortConfig !== null) {
			sortableItems.sort((a, b) => {
			  if (a[sortConfig.key] < b[sortConfig.key]) {
				return sortConfig.direction === 'ascending' ? -1 : 1;
			  }
			  if (a[sortConfig.key] > b[sortConfig.key]) {
				return sortConfig.direction === 'ascending' ? 1 : -1;
			  }
			  return 0;
			});
		  }
		  return sortableItems;
		}, [items, sortConfig]);
	  
		const requestSort = (key) => {
		  let direction = 'ascending';
		  if (
			sortConfig &&
			sortConfig.key === key &&
			sortConfig.direction === 'ascending'
		  ) {
			direction = 'descending';
		  }
		  setSortConfig({ key, direction });
		};
	  
		return { items: sortedItems, requestSort, sortConfig };
	  };
	  
	  const ProductTable = (props) => {

		var sortable_data = trainingdata["defualt"]
		if ((season_year != "") && (season_year!="Year")){
			sortable_data = trainingdata[season_year]

			const model_output_id = document.getElementById("model_output_id");
			const model_description = document.getElementById("model_description");
			const my_image = document.getElementById("my-image");

			console.log("change .hidden")
			model_output_id.hidden = true
			model_description.hidden = true
			// if (my_image.hidden)
			my_image.hidden = true
			
		}
		console.log("season_year: " + season_year + ".")
		if ((season_year == "") || (season_year=="Year")){
			console.log("no year: hide data-table")

			const data_table = document.getElementById("data-table");
			// const model_output_id = document.getElementById("model_output_id");
			// const model_description = document.getElementById("model_description");
			// const my_image = document.getElementById("my-image");
			if (data_table){
				console.log("change .hidden")
				data_table.hidden = true
				// model_output_id.hidden = true
				// model_description.hidden = true
				// my_image.hidden = true
			}
		}


		// const { items, requestSort, sortConfig } = useSortableData(props.products);
		const { items, requestSort, sortConfig } = useSortableData(sortable_data)
		const getClassNamesFor = (name) => {
		  if (!sortConfig) {
			return;
		  }
		  return sortConfig.key === name ? sortConfig.direction : undefined;
		};

		return (
		  <table>
			<caption>{season_year} Data</caption>
			<thead>
			  <tr>

				<th>
					<button
					type="button"
					onClick={() => requestSort('date')}
					className={getClassNamesFor('date')}
					>
					Date
					</button>
				</th>

				<th>
				  <button
					type="button"
					onClick={() => requestSort('home')}
					className={getClassNamesFor('home')}
				  >
					Home
				  </button>
				</th>

				<th>
				  <button
					type="button"
					onClick={() => requestSort('away')}
					className={getClassNamesFor('away')}
				  >
					Away
				  </button>
				</th>
				
				<th>
				  <button
					type="button"
					onClick={() => requestSort('homegoals')}
					className={getClassNamesFor('homegoals')}
				  >
					Home <br></br>Goals
				  </button>
				</th>

				<th>
				  <button
					type="button"
					onClick={() => requestSort('awaygoals')}
					className={getClassNamesFor('awaygoals')}
				  >
					Away <br></br>Goals
				  </button>
				</th>

				<th>
				  <button
					type="button"
					onClick={() => requestSort('match')}
					className={getClassNamesFor('matach')}
				  >
					Match
				  </button>
				</th>

				<th>
				  <button
					type="button"
					onClick={() => requestSort('homeattack')}
					className={getClassNamesFor('homeattack')}
				  >
					Home <br></br>Attack
				  </button>
				</th>

				<th>
				  <button
					type="button"
					onClick={() => requestSort('awayattack')}
					className={getClassNamesFor('awayattack')}
				  >
					Away <br></br>Attack
				  </button>
				</th>

				<th>
				  <button
					type="button"
					onClick={() => requestSort('homedefence')}
					className={getClassNamesFor('homedefence')}
				  >
					Home <br></br>Defence
				  </button>
				</th>

				<th>
				  <button
					type="button"
					onClick={() => requestSort('awaydefence')}
					className={getClassNamesFor('awaydefence')}
				  >
					Away <br></br>Defence
				  </button>
				</th>
				<th>
				  <button
					type="button"
					onClick={() => requestSort('result')}
					className={getClassNamesFor('result')}
				  >
					Result
				  </button>
				</th>

			  </tr>
			</thead>
			<tbody>
			  {items.map((item) => (
				// <tr key={item.id}>
				//   <td>{item.name}</td>
				//   <td>${item.price}</td>
				//   <td>{item.stock}</td>
				// </tr>
				<tr key={item.id}>
					<td>{item.date}</td>
					<td>{item.home}</td>
					<td>{item.away}</td>
					<td>{item.homegoals}</td>
					<td>{item.awaygoals}</td>
					<td>{item.match}</td>
					<td>{item.homeattack}</td>
					<td>{item.awayattack}</td> 
					<td>{item.homedefence}</td> 
					<td>{item.awaydefence}</td> 
					<td>{item.result}</td> 
				</tr>
			  ))}
			</tbody>
		  </table>
		);

		if (season_year=="") {
			console.log('load empty season')
			return;
		}
		
	}

	function get_training_data(){
		var training_data_json = {}
		if (season_year==2023){training_data_json=trainingdata[season_year]} 
		if (season_year==2022){training_data_json=trainingdata[season_year]} 
		return trainingdata[2023]
	}

	return (

		<div className="container mx-auto p-4">

			<header className="flex justify-between items-center py-4">
				<div className="flex items-center space-x-2">
					{/* pick logo */}
					{/* <img src="logo.png" alt="Logo" className="w-8 h-8"/> */}
					<h1 className="text-xl font-bold">Machine Learning Sandbox</h1>
				</div>
			</header>

			<main className="flex space-x-4">
				<div className='left-column'>
					<img id="my-image" src=""
						className="my-image"
						hidden
						
						>
					</img>
					<div id="model_output_id"></div>
					<div id="model_description"></div>
					<div id="data-table" class="data-table" hidden>
						<ProductTable
							products={ trainingdata["defualt"]}
							// products={ trainingdata[2023]
							//	[
							// { id: 1, name: 'Cheese', price: 4.9, stock: 20 },
							// { id: 2, name: 'Milk', price: 1.9, stock: 32 },
							// { id: 3, name: 'Yoghurt', price: 2.4, stock: 12 },
							// { id: 4, name: 'Heavy Cream', price: 3.9, stock: 9 },
							// { id: 5, name: 'Butter', price: 0.9, stock: 99 },
							// { id: 6, name: 'Sour Cream ', price: 2.9, stock: 86 },
							// { id: 7, name: 'Fancy French Cheese 🇫🇷', price: 99, stock: 12 },
							//	]
							//}
						/>
					</div>
				</div>

				{/* space between data display and right column
				<div className="w-3/4 bg-gray-100 p-4"> </div> */
				}

				<div 
					className="w-1/4 space-y-4"
					style={{background:"lightblue"}}	
				> {/* Right Column*/}
					
					<div className="space-y-2">
						Predict Specific Matchup
						<div className="flex space-x-2">
							<input id="home_team_input"
								type="text" style={{}}
								ref={home_team_input}  
								placeholder='Home Team'
								size="10" 
								className="border-2 border-black"							/>
							<input id="away_team_input"
								type="text" style={{}}
								ref={away_team_input}  
								placeholder='Away Team'
								size="10" 
								className="border-2 border-black"
							/>
						</div>
						Test Accuracy By Season
						<div className="flex space-x-3"> 
						<select value={season_year} 
							onChange={changeSeasonYear}
							className="border-2 border-black">
							<option value="Year"></option>
							<option value="2023">2023</option>
							<option value="2022">2022</option>
						</select>
						</div>
					</div>

					<div className="space-y-2"> {/* Models */}
						<button
							id="Poisson1Button" 
							className="border-2 border-black py-2 px-4 w-full flex items-center space-x-2"
							onClick={possionModel1}

						>
							<span>Poisson Model 1</span>
						</button>
						<button
							id="Poisson2Button" 
							className="border-2 border-black py-2 px-4 w-full flex items-center space-x-2"
							onClick={possionModel2}
						>
							<span>Poisson Model 2</span>
						</button>
						<button
							id="SVMButton" 
							className="border-2 border-black py-2 px-4 w-full flex items-center space-x-2"
							onClick={svmModel3}
						>
							<span>Support Vector Machine</span>
						</button>
						<button
							id="RegressionButton" 
							className="border-2 border-black py-2 px-4 w-full flex items-center space-x-2"
							onClick={regressionModel4}
						>
							<span>Regression</span>
						</button>
						<button
							id="RNNModel" 
							className="border-2 border-black py-2 px-4 w-full flex items-center space-x-2 border-black"
							onClick={rnnModel5}
						>
							<span>Recurrent Neural Network</span>
						</button>
					</div>

					<p>Train w/ your own data (coming soon) </p>
					<div className="space-y-2"> {/* Upload Data */}		
						<button className="border-2 border-black bg-gray-200 py-2 px-4 rounded">Upload Data</button>
						{/* <button className="bg-gray-200 py-2 px-4 rounded">Save Data</button> */}
						{/* <button className="bg-gray-200 py-2 px-4 rounded">Clear all</button> */}
					</div>
					{/* <div className="space-y-2">
						<button className="bg-gray-200 py-2 px-4 rounded">Train</button>
					</div> */}
				</div>

			</main>

		{/* <br/> */}
		<div style={{background:"Azure"}}	>
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
