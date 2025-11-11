import React from "react";
import Layout from "../components/Layout"


export const Admin = () => {
  return (
    <>
      <Layout>
        <Dashboard />
      </Layout>
    </>
  )
}

const Dashboard = () => {
  return (
    <>
      <div className="grid grid-cols-5 grid-rows-5 gap-4 place-items-center">
        <div className="col-span-3 col-start-2 place-items-center gap-4">
            <div className="radial-progress  m-4"
              style={{ "--value": "70", "--size": "12rem", "--thickness": "2px" } /* as React.CSSProperties */ } 
              aria-valuenow={70} role="progressbar">70%</div>
            <h2 className="text-2xl text-accent">Mental Score</h2>
        </div>
        
        <div className="col-span-2 row-start-2"><Rating rating={{ name: "Depression", level: 77}} /></div>
        <div className="col-span-2 col-start-4 row-start-2"><Rating rating={{ name: "Anxiety", level: 77}} /></div>
        <div className="col-span-2 row-start-3"><Rating rating={{ name: "Somatic", level: 77}} /></div>
        <div className="col-span-2 col-start-4 row-start-3"><Rating rating={{ name: "Burnout", level: 77}} /></div>
        <div className="col-span-5 row-start-4">6</div>
        <div className="col-span-5 row-start-5">7</div>
      </div>
    </>
  )
}

const Rating = ({rating, mask}) => {
  return(
    <>
      <div className="place-items-center">
        <div className="rating rating-xl rating-half m-4">
          <div type="radio" name="rating-11" className="mask mask-star-2 mask-half-1 bg-green-500" aria-label="0.5 star" />
          <div type="radio" name="rating-11" className="mask mask-star-2 mask-half-2 bg-green-500" aria-label="1 star" />
          <div type="radio" name="rating-11" className="mask mask-star-2 mask-half-1 bg-green-500" aria-label="1.5 star" aria-current="true" />
          <div type="radio" name="rating-11" className="mask mask-star-2 mask-half-2 bg-green-500" aria-label="2 star" />
          <div type="radio" name="rating-11" className="mask mask-star-2 mask-half-1 bg-green-500" aria-label="2.5 star" />
          <div type="radio" name="rating-11" className="mask mask-star-2 mask-half-2 bg-green-500" aria-label="3 star" />
          <div type="radio" name="rating-11" className="mask mask-star-2 mask-half-1 bg-green-500" aria-label="3.5 star" />
          <div type="radio" name="rating-11" className="mask mask-star-2 mask-half-2 bg-green-500" aria-label="4 star" />
          <div type="radio" name="rating-11" className="mask mask-star-2 mask-half-1 bg-green-500" aria-label="4.5 star" />
          <div type="radio" name="rating-11" className="mask mask-star-2 mask-half-2 bg-green-500" aria-label="5 star" />
        </div>
        <h2 className="text-xl">{rating.name}</h2>
      </div>
    </>
  )
}
  
