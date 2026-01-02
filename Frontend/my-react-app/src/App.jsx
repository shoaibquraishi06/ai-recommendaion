import { useState } from "react";
import ProductList from "./components/ProductList";
import PreferenceInput from "./components/PreferenceInput";
import Recommendations from "./components/Recommendations";
import shoes1 from "./assets/nikeshoes.avif";
import shoes2 from "./assets/nikeshoes2.avif";
import shoes3 from "./assets/nikeshoes3.avif";
import shoes4 from "./assets/nikeshoes4.avif";
import shoes5 from "./assets/nikeshoes5.avif";
// import shoes6 from "./assets/nikeshoes6.avif";
import "./App.css"


const products = [
   { id: 1,
     name: "nike shoes",
      price: 450,
      imageUrl: shoes1,
       category: "phone" },
  { id: 2,
     name: "nike shoes",
      price: 580,
      imageUrl: shoes2,
       category: "phone" },
  { id: 3, 
    name: "nike shoes",
      price: 250,
       imageUrl: shoes3,
       category: "phone" },
  { id: 4,
     name: "nike shoes",
      price: 600,
       imageUrl: shoes4,
       category: "laptop" },
  { id: 5,
     name: "nike shoes",
      price: 900,
       imageUrl: shoes5, 
      category: "laptop" },
  // { id: 6,
    
  //   name: "iPhone 17", 
  //   price: 300, 
  //    imageUrl: shoes6,
  //   category: "laptop" },

];






export default function App() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getRecommendations = async (preference) => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ preference }),
      });

      if (!res.ok) throw new Error("Server error");

      const data = await res.json();
      setRecommendations(data);
    } catch {
      setError("Failed to fetch recommendations");
      setRecommendations([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1>AI Product Recommendation System</h1>

      <ProductList products={products} />

      <PreferenceInput onSubmit={getRecommendations} />

      {loading && <p>Finding best products...</p>}
      {error && <p style={styles.error}>{error}</p>}

      <Recommendations data={recommendations} />
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "600px",
    margin: "40px auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  error: {
    color: "red",
  },
};
