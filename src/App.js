import axios from 'axios';
import React,{useState, useEffect, useCallback, useRef} from 'react';
import './App.css';
import SectionImage from './components/SectionImage';

function App() {
  const [data, setData] = useState([])
  const [pages, setPages] = useState(0)

  useEffect(() => {
    axios.get(`https://picsum.photos/v2/list?page=${pages}&limit=10`)
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


  const imagesRef = useRef(null);

  const imgObserver = useCallback(node => {
    const intObs = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.intersectionRatio > 0) {
          const currentImg = en.target;
          const newImgSrc = currentImg.dataset.src;

          if (!newImgSrc) {
            console.error('Image source is invalid');
          } else {
            currentImg.src = newImgSrc;
          }
          intObs.unobserve(node);
        }
      });
    })
    intObs.observe(node);
  }, []);

  useEffect(() => {
    imagesRef.current = document.querySelectorAll('.imageClass');

    if (imagesRef.current) {
      imagesRef.current.forEach(img => imgObserver(img));
    }
  }, [imgObserver, imagesRef, data]);

  return (
    <div>
      <SectionImage data={data} />
      <div style={{ border: '1px solid red' }} ref={bottomBoundaryRef}></div>
    </div>
  );
}

export default App;
