const { string } = require('joi');
const mongoose = require('mongoose');

const castSchema = new mongoose.Schema({
    actorName: { type: String, required: true },
    description: { type: String },
    castImg: { type: String }
});

const crewSchema = new mongoose.Schema({
    memberName: { type: String, required: true },
    description: { type: String },
    crewImg: { type: String }
});

const categorySchema = new mongoose.Schema({
    layout: { type: Number, required: true },
    moviePrice: { type: Number, required: true }
});

const showtimeDateSchema = new mongoose.Schema({
    showDate: { type: Date, required: true },
    showTime: [{ type: String, required: true }]
});

const showSchema = new mongoose.Schema({
    venue: { type: Number, required: true },
    screen: { type: Number, required: true },
    category: [categorySchema],
    showtimesdate: [showtimeDateSchema]
});

const movieSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  runTime: { type: Number },
  eventType: { type: String },
  imdbRating: { type: Number, default: null },
  likes: { type: Number, default: 0 },
  votes: { type: Number, default: 0 },
  currentlyPlaying: { type: Boolean, default: true },
  ageLimit: { type: Number, default: 0 },
  releasingOn: { type: Date },
  languages: [Number],
  genres: [Number],
  format: [Number],
  tag: [Number],
  releaseMonth: [Number],
  dateFilter: [Date],
  categories: [{ layout: Number, moviePrice: Number }],
  cast: [{ actorName: String, description: String, castImg: String }],
  crew: [{ memberName: String, description: String, crewImg: String }],
  city: [Number],
  show: [
    {
      venue: Number,
      screen: Number,
      category: [{ layout: Number, moviePrice: Number }],
      showtimesdate: [{ showDate: Date, showTime: [String] }],
    },
  ],
  posterRef: { type: mongoose.Schema.Types.ObjectId, ref: "Upload" }, // ✅ new
  addedBy: { type: String, required: true },
}, { timestamps: true });


module.exports = mongoose.model('Movie', movieSchema);
