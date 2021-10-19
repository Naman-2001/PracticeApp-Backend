const mongoose = require("mongoose");
const URL =
  "mongodb+srv://naman075:OJjTcQne6vuJOrAb@cluster0.lummb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
(async () => {
  try {
    await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.log("DB error: ", error.toString());
  }
})();

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("DB connected successfully");
});
