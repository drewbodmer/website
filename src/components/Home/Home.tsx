import './Home.css';
import { useEffect, useState } from 'react';


export function Home() {
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 1000);  // Wait 1 second before starting fade out
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <div className='home'>
        <div className={`transparent-element banner-text title-background  ${isInitialLoad ? 'initial-load' : ''}`} style={{ paddingTop: "1rem", paddingBottom: "1rem" }}>
          <h3 className="title">Drew Bodmer</h3>
          <h5 className="subtitle">Software Engineer | Levee Health</h5>
        </div>
      </div>
    </>
  );
}