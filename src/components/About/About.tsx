import "./About.css";

export function About() {
    return (
      <div className="about-background transparent-element">
        <h1 style={{ paddingTop: "5vh" }} className="subtitle aboutheader">
          About Me
        </h1>
        <hr className="solid" style={{ color: "white", width: "80%", margin: "auto", marginBottom: "5vh" }}></hr>
        <div style={{ width: "40vw", margin: "auto" }}>
          <div style={{ float: "left" }}>
            <img src="/assets/profile.jpg" style={{ width: "15vw", borderRadius: "50%" }} />
          </div>
          <div >
            <p className="subtitle aboutbody">
              I'm a software engineer and BSCS graduate from Northeastern University, with 4+ years of experience at various
              companies ranging from tiny startups to F500 companies. I'm really interested in how complex problems can be solved 
              with code, and especially in the newly-developed market for applying LLM models to a wide range of fields.
              <br></br>
              <br></br>
              I'm currently working in health tech, trying to improve outcomes and costs for specialty care clinics. In my free time,
              I love to write (code and non-code), play soccer, ski, and travel. I often try to film and edit travel videos.
            </p>
          </div>
          <hr className="solid" style={{ color: "white", width: "80%", margin: "auto", marginBottom: "0vh" }}></hr>
          <ul id="Homelist">
            <li id="Homelistitem" className="subtitle socials-links">
              <a className="subtitle socials-links" style={{ textDecoration: "none" }} href="https://www.linkedin.com/in/drew-bodmer">Linkedin</a>
            </li>
            <li id="Homelistitem" className="subtitle socials-links" >
              <a className="subtitle socials-links" style={{ textDecoration: "none" }} href="https://github.com/drewbodmer">GitHub</a>
            </li>
            <li id="Homelistitem" className="subtitle socials-links" >
              drew.bodmer@gmail.com
            </li>
          </ul>
        </div>
      </div>
    )
}