import { Card } from "react-bootstrap";

const dsresume = "/assets/datascienceresume.pdf"
const csresume = "/assets/softwareengineeringresume.pdf"

export function DataScience() {
  return (
    <Card style={{ width: "65vw", height: "100vh" }}>
      <iframe src={dsresume} width="100%" height="100%" frameBorder="0" seamless={true} />
    </Card>
  );
}

export function SoftwareEngineering() {
  return (
    <div className="pdf-container">
    <iframe 
      src={`${csresume}#toolbar=0&navpanes=0&scrollbar=0`}
      className="pdf-frame"
      seamless={true}
    />
  </div>
    // <Card style={{ width: "65vw", height: "100vh" }}>
    //   <iframe src={csresume} width="100%" height="100%" frameBorder="0" seamless={true} />
    // </Card>
  );
}