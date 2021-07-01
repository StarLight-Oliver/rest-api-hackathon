const express = require("express");

const router = express.Router();

const Film = require("./models/film")

// routes go here

//Update - EB

const readFilm = (req, film) => {
	if (film === undefined) {
		film = {}
	}

	film.Title = req.body.Title;
	film.Year = req.body.Year;
	film.Runtime = req.body.Runtime;
	film.Plot = req.body.Plot;
	film.Poster = req.body.Poster;

	return film
}

router.put('/film/:id', async (req, res) => {
    try {
    	let film = await Film.findById(req.params.id);
        film = readFilm(req, film);
        film.save();
        res.send(film);

    } catch {
        res.status(404);
        res.send({ error: "Database error Film did not updated." });
    }
})

//Patch Update Many - EB
/*router.patch('/films/:id', async (req, res) => {
    try {
        const film = await Film.findById(req.params.id);

        film.title = req.body.title || film.title;
        film.description = req.body.description || film.description;
        film.dateRelease = req.body.dateRelease || film.dateRelease;
		film.actors = req.body.actors || film.actors;
		film.reviews = req.body.reviews || film.reviews;
        film.save();
        res.send(film);
    } catch (e) {
		console.log(e);
        res.status(404);
        res.send({ error: "Database error Film did not updated. (Film not found)" })
    }
})*/


// Delete - EB
router.delete('/film/:id', async (req, res) => {
    try {
        const film = await Film.findByIdAndRemove(req.params.id);
        res.send(film);
    } catch {
        res.status(404);
        res.send({ error: "Film doesn't exist" })
    }
});


router.post("/film", async (req, res) => {

	try {
	const film = new Film(readFilm(req));

	await film.save();

	res.send(film);
	} catch (e) {
		res.status(404).send(e.name + ': ' + e.message);
	}
})

router.get("/film/:id", async(req, res) => {
	try {
		const film = await Film.findById(req.params.id);
		res.send(film);
	} catch {
		res.status(404).send("No film found");
	}
})

router.get("/film", async(req, res) => {
	
	try {
		const film = await Film.find();
		res.send(film);

	} catch {
		res.status(404).send("No film found");
	}
})


module.exports = router;