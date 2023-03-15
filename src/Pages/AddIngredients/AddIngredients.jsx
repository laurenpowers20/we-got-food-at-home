import { useAuthState} from "react-firebase-hooks/auth";
import { useState, useEffect } from "react";
import axios from "axios";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../services/firebase";

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

  // const route = useRouter();
  const [user, loading] = useAuthState(auth);
  // state of the form
  const [item, setItem] = useState({ itemName: "" });

  // function for submitting the post

  const addItem = async (e) => {
    e.preventDefault();

    //new item
    const collectionRef = collection(db, "items");
    await addDoc(collectionRef, {
      ...item,
      user: user.uid,
    });
    setItem({ itemName: "" });
  };
  console.log(item)

  useEffect(() => {
    // checkUser();
  }, [user, loading]);

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
      <div className="input-box">
        <form onSubmit={addItem}>
          <textarea
            value={item.itemName}
            onChange={(e) => setItem({ ...item, itemName: e.target.value })}
            className=""
          ></textarea>
          <button className="add-item">Add Item</button>
        </form>
        <ul className="listed-items"></ul>
      </div>
    </div>
  );
}

export default AddIngredients;
