import React, {useState, useEffect} from 'react';
import './App.css';

function App() {
  const [pageNumber, setPageNumber] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [posts, setPosts] = useState([]);
  
  const pages = new Array(numberOfPages).fill(null).map((v, i) => i)

    useEffect(() => {
      fetch(`http://localhost:4000/posts?page=${pageNumber}`)
      .then(response => response.json())
      .then(({totalPages, posts}) => {
        setPosts(posts);
        setNumberOfPages(totalPages)
        console.log(totalPages, posts);
      })
    }, [pageNumber]);

    const gototPrevious = () => {
      setPageNumber(Math.max(0, pageNumber-1));
    }

    const gototNext = () => {
      setPageNumber(Math.min(numberOfPages-1, pageNumber + 1));
    };


  return (
    <div className="App">
      <h3>Pageof {pageNumber + 1}</h3>
      {posts.map((post) => (
        <div className="post" key={post._id}>
          <h3>{post.title}</h3>
          <p>{post.text}</p>
        </div>
      ))}

      <button onClick={gototPrevious}>Previous</button>
      {pages.map((pageIndex) => (
        <button key={pageIndex} onClick={() => setPageNumber(pageIndex)}>
          {pageIndex + 1}
        </button>
      ))}
      <button onClick={gototNext} >Next</button>
    </div>
  );
}
export default App;
