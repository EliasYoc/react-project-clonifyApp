import "./BgApp.css";

function BgApp() {
  return (
    <svg
      className="svg"
      id="visual"
      viewBox="0 0 900 600"
      width="900"
      height="600"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      version="1.1"
    >
      <rect className="svg__bg" x="0" y="0" height="600" fill="#000c01"></rect>
      <g className="svg__circles" fill="#009473">
        <circle r="104" cx="389" cy="43"></circle>
        <circle r="52" cx="99" cy="579"></circle>
        <circle r="69" cx="45" cy="92"></circle>
        <circle r="96" cx="858" cy="476"></circle>
        <circle r="59" cx="815" cy="117"></circle>
      </g>
    </svg>
  );
}

export default BgApp;
