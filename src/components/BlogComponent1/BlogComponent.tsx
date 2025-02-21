import './BlogComponent.css';
import { blogs, Type, BlogEntry } from "../../data/writing";
import { useRef, useState } from 'react';
import { Modal } from 'react-bootstrap';
import ReactMarkdown from "react-markdown";

export default function Blog() {
  const containerRef = useRef(null);
  const [show, setShow] = useState(-1);

  const handleClose = () => setShow(-1);
  const handleShow = (index: number) => setShow(index);

  const displayPDF = (entry: BlogEntry): JSX.Element => {
    if (entry.type === Type.PAPER) {
      return (
        <div className="pdf-container">
          <iframe 
            src={`${entry.pdf}#toolbar=0&navpanes=0&scrollbar=0`}
            className="pdf-frame"
            frameBorder="0"
            seamless={true}
          />
        </div>
      );
    }
    return <></>;
  };

  const displayMedia = (entry: BlogEntry): JSX.Element => {
    if (entry.type === Type.MEDIA) {
      let embedUrl = entry.media ? entry.media : '';
      if (embedUrl.includes('youtube.com/watch?v=')) {
        const videoId = embedUrl.split('v=')[1].split('&')[0];
        embedUrl = `https://www.youtube.com/embed/${videoId}`;
      } else if (embedUrl.includes('youtu.be/')) {
        const videoId = embedUrl.split('youtu.be/')[1];
        embedUrl = `https://www.youtube.com/embed/${videoId}`;
      }
  
      return (
        <div style={{ height: "80vh", width: "100%" }}>
          <iframe 
            src={embedUrl}
            width="100%" 
            height="100%" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          />
        </div>
      );
    }
    return <></>;
  };

  return (
    <div ref={containerRef} className='blog-container'>
      {blogs.map((entry, index) => (
        <div key={index}>
          <div
            className="blog-item transparent-element flex items-center gap-4 p-4"
            onClick={() => handleShow(index)}
            style={{ cursor: 'pointer' }}
          >
            <div className="flex-grow">
              <h2 className="text-xl font-semibold">{entry.title}</h2>
              <p className="text-[0.65rem] text-gray-500">{entry.type ? entry.type : 'Note'}</p>
              <div className="flex justify-between mt-2 text-sm text-gray-400">
                <span>{entry.date ? new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(entry.date)) : ""}</span>
              </div>
            </div>
            <img
              className='blog-image'
              src={`/assets/thumbnails/${entry.image}`}
              alt={entry.title}
            />
          </div>

          <Modal
            className="modal-open"
            size="xl"
            show={show === index}
            fullscreen={window.innerWidth < 768 || window.innerHeight < 600 ? true : "xl-down xl-up"}
            onHide={handleClose}
            contentClassName="modal-content"
          >
            <Modal.Header closeButton>
              <Modal.Title>{entry.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ color: 'rgba(255, 255, 255, 0.822)' }}>
              {displayPDF(entry)}
              {displayMedia(entry)}
              {entry.text && <ReactMarkdown>{entry.text}</ReactMarkdown>}
            </Modal.Body>
          </Modal>
        </div>
      ))}
    </div>
  );
}