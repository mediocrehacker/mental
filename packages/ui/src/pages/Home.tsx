import React from "react";
import { Link } from "react-router";

export const Home = () => {
  return(
    <div className="flex w-full h-screen flex-col">
      <div className="card bg-base-300 rounded-box grid h-20 place-items-center">
        <Link className="btn"
          to={{
            pathname: "admin",
          }}
        >Admin</Link>
      </div>
      <div className="divider">OR</div>
      <div className="card bg-base-300 rounded-box grid h-20 place-items-center"><Link className="btn"
          to={{
            pathname: "user",
          }}
        >User</Link></div>
    </div>
  )
}

