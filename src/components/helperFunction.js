import {useEffect, useCallback, useRef} from 'react';
import axios from 'axios';


export const useScrollInfiniteHelper = (bottomBoundaryRef, setPages, pages) => {
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
}


export const useImageLazyLoadingHelper = (data) => {
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

      const imagesRef = useRef(null);
    
      useEffect(() => {
        imagesRef.current = document.querySelectorAll('.imageClass');
    
        if (imagesRef.current) {
          imagesRef.current.forEach(img => imgObserver(img));
        }
      }, [imgObserver, imagesRef, data]);
}

export const useDataFetchHelper = (setData, data, pages) => {
    useEffect(() => {
        // https://picsum.photos/v2/list?page=${pages}&limit=10
        axios.get(`https://jsonplaceholder.typicode.com/photos?_start=${pages}&_limit=10`)
             .then((res) => {
              console.log(res.data)
              setData([...data,...res.data])
             })
             .catch((err) => {
              console.log(err)
             })
    },[pages])
}