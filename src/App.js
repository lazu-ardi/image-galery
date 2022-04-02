import React, { useState, useEffect } from "react";
import ImageCard from "./components/imageCard";
import ImageSearch from "./components/imageSearch";

function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [term, setTerm] = useState("");

  // Fetching API
  useEffect(() => {
    fetch(
      `https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${term}&image_type=photo&pretty=true`
    )
      .then((res) => res.json())
      .then((data) => {
        setImages(data.hits);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [term]);

  return (
    <div className="container mx-auto">
      {/* Search Image Components */}
      <ImageSearch searchText={(text) => setTerm(text)} />

      {/* If Images are not found */}
      {!isLoading && images.length === 0 && (
        <h1 className="text-6xl text-center mx-auto mt-32">No Images Found</h1>
      )}

      {/* When Loading Images */}
      {isLoading ? (
        <h1 className="text-6xl text-center mx-auto mt-32">Loading...</h1>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {/* Image Card Components */}
          {images.map((image) => (
            <ImageCard key={image.id} image={image} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
