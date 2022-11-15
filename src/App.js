import React,{useState, useRef} from 'react';
import {useDataFetchHelper, useImageLazyLoadingHelper, useScrollInfiniteHelper} from './components/helperFunction'
import './App.css';
import SectionImage from './components/SectionImage';

function App() {
  const [data, setData] = useState([])
  const [pages, setPages] = useState(0)

  let bottomBoundaryRef = useRef(null);

  useDataFetchHelper(setData,data,pages)
  useImageLazyLoadingHelper(data)
  useScrollInfiniteHelper(bottomBoundaryRef, setPages, pages);

  return (
    <div>
      <SectionImage data={data} />
      <div style={{ border: '1px solid red' }} ref={bottomBoundaryRef}></div>
    </div>
  );
}

export default App;
