import { useState } from "react";
import "./App.css";

const api = {
  key: "fVJySBTMkjeQ6MN6n39agr8sNt5QycoIBFGg2kfX",
  baseUrl: "https://api.nasa.gov/planetary/apod?api_key=",
};

function App() {
  const [data, setData] = useState({});
  const [readMore, setReadMore] = useState(false);

  const fetchData = () => {
    fetch(`${api.baseUrl}${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setData(result);
      });
  };

  if (!data.title) {
    fetchData();
  }

  if (data.title) {
    return (
      <div className="app">
        <div className="colorFilter">
          <main>
            <h1 className="title">{data.title}</h1>
            <h3 className="date">{data.date}</h3>
            <div className="frame">
              {data.media_type == "image" ? (
                <img className="image" src={data.hdurl} alt=""></img>
              ) : (
                <iframe className="video" src={data.url}>
                  {" "}
                  test
                </iframe>
              )}
            </div>
            <p className="description">
              {readMore
                ? data.explanation
                : `${data.explanation.substring(0, 200)}...`}
              <button className="btn" onClick={() => setReadMore(!readMore)}>
                {readMore ? "show less" : "read more"}
              </button>
            </p>
            <footer className="footer">Developped by thomas mauran</footer>
          </main>
        </div>
      </div>
    );
  } else {
    return (
      <main className="app">
        <h1 className="title">Fetching data</h1>
      </main>
    );
  }
}

export default App;
