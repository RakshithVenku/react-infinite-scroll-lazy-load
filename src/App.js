import axios from 'axios';
import React,{useState, useEffect, useCallback, useRef} from 'react';
import './App.css';
import SectionImage from './components/SectionImage';

function App() {
  const [data, setData] = useState([])
  const [pages, setPages] = useState(0)

  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/photos?_start=${pages}&_limit=10`)
         .then((res) => {
          console.log(res.data)
          setData([...data,...res.data])
         })
         .catch((err) => {
          console.log(err)
         })
  },[pages])

  let bottomBoundaryRef = useRef(null);

  const scrollObserver = useCallback(
    node => {
      new IntersectionObserver(entries => {
        entries.forEach(en => {
          if (en.intersectionRatio > 0) {
            setPages(pages + 1)
          }
        });
      }).observe(node);
    },
    [pages]
  );

  useEffect(() => {
    if (bottomBoundaryRef.current) {
      scrollObserver(bottomBoundaryRef.current);
    }
  }, [scrollObserver, bottomBoundaryRef]);

  return (
    <div>
      <SectionImage data={data} />
      <div style={{ border: '1px solid red' }} ref={bottomBoundaryRef}></div>
    </div>
  );
}

export default App;
