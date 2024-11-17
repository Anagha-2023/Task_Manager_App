import app from "./app.js";
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  console.log("Server started")
  res.send("server started")
})
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  
})