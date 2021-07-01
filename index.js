const express = require("express");
const mongoose =  require("mongoose");
const routes = require("./routes");

const port = 99456;

const options = {
	useNewUrlParser: true, 
	useUnifiedTopology: true
}

mongoose.connect("mongodb://localhost/films", options).then(
	() => {
		const app = express();
		
		app.use(express.json());

		app.use("/api", routes);

		const server = app.listen(port, () => {
			console.log(`Server started successfully on port number ${server.address().port}`);
		});

	}
)

