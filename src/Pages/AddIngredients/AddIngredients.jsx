import { useState } from "react";
import axios from "axios";

function AddIngredients() {
  
    const [prompttest, setPrompt] = useState("");
    const [response, setResponse] = useState("");
    const prompt = `give me a recipe using ${prompttest}`;
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      // Send a request to the server with the prompt
      axios
        .post("http://localhost:8080/chat", { prompt })
        .then((res) => {
          // Update the response state with the server's response
          setResponse(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    };
  
    return (
      <div>
        <div className="form">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={prompttest}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <button type="submit">Submit</button>
          </form>
          <p>{response}</p>
        </div>
      </div>
    );
  }
  
export default AddIngredients;