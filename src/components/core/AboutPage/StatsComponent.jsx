import React from 'react';

const StatsComponent = () => {

  const stats = [
      {count : "5k", label : "Active Students"},
      {count : "10+", label : "Mentors"},
      {count : "200+", label : "Courses"},
      {count : "50+", label : "Awards"},
  ]

  return (

    <section className="bg-richblack-700 py-10 my-24">
      <div className="w-11/12 mx-auto" >
        <div className="flex gap-10 justify-evenly flex-wrap" >
          {
            stats.map((element, key) => (

              <div className="text-center" key={key}>
                <h1 className="text-richblack-5 font-bold text-[30px]" >{element.count}</h1>
                <h1>{element.label}</h1>
              </div>
            ))
          }
         </div>
        </div>
    </section>
  )
}

export default StatsComponent;