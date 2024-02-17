import { Link } from "react-router-dom";

function Four04() {
  return (
    <div>
      <br />
      <div>
        <h1>The page you’re looking for can’t be found.</h1>
        <Link to="/">
          <h3 style={{color:"red"}}> click here to return back to home page</h3>
        </Link>
      </div>
    </div>
  );
}

export default Four04;
