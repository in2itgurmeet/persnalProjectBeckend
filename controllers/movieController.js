const Movie = require('../models/movie');

exports.createMovie = async (req, res) => {
  try {
    const { posterRef, ...movieData } = req.body;
    const newMovie = new Movie({
      ...movieData,
      addedBy: req.user.username,
      posterRef: posterRef || null, // ✅ optional link
    });

    await newMovie.save();

    // Optional: Update Upload doc to link back
    if (posterRef) {
      await Upload.findByIdAndUpdate(posterRef, { modelRef: newMovie._id, modelType: "Movie" });
    }

    res.status(201).json({
      success: true,
      message: "Movie created successfully",
      movie: newMovie,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};



exports.getMovies = async (req, res) => {
    try {
        const movies = await Movie.find();
        res.status(200).json({ success: true, movies });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.getMovieById = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) return res.status(404).json({ success: false, message: 'Movie not found' });

        res.status(200).json({ success: true, movie });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.updateMovie = async (req, res) => {
    try {
        const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!movie) return res.status(404).json({ success: false, message: 'Movie not found' });

        res.status(200).json({ success: true, message: 'Movie updated successfully', movie });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// ✅ Like / Unlike Movie
exports.likeMovie = async (req, res) => {
  try {
    const movieId = req.params.id;
    const movie = await Movie.findById(movieId);
    if (!movie) return res.status(404).json({ success: false, message: "Movie not found" });

    movie.likes += 1;
    await movie.save();

    res.json({ success: true, message: "Like added", likes: movie.likes });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Rate Movie (User gives 1–10 rating)
exports.rateMovie = async (req, res) => {
  try {
    const { rating } = req.body; // frontend se rating (1–10)
    const movieId = req.params.id;

    if (rating < 1 || rating > 10)
      return res.status(400).json({ success: false, message: "Rating must be between 1 and 10" });

    const movie = await Movie.findById(movieId);
    if (!movie) return res.status(404).json({ success: false, message: "Movie not found" });

    // New average rating formula
    const totalVotes = movie.votes + 1;
    const newRating = ((movie.imdbRating * movie.votes) + rating) / totalVotes;

    movie.imdbRating = parseFloat(newRating.toFixed(1));
    movie.votes = totalVotes;
    await movie.save();

    res.json({
      success: true,
      message: "Rating updated successfully",
      imdbRating: movie.imdbRating,
      votes: movie.votes
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


exports.deleteMovie = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) return res.status(404).json({ success: false, message: 'Movie not found' });

        if (movie.addedBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ success: false, message: 'Forbidden: You can only delete your own movie' });
        }

        await movie.deleteOne();
        res.status(200).json({ success: true, message: 'Movie deleted successfully' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

