import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);
import { useState } from 'react';

const InstructorChart = ({courses}) => {

    const [currentChart, setCurrentChart] = useState('students');
    const getRandomColors = (numColors) => { 

        const colors = [];

        for (let i = 0; i < numColors; i++) { 

            const randomColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
            colors.push(randomColor);
        }

        return colors
    }

    //create data for chart displaying student info

    const chartDataForStudent = {
        labels: courses.map((course, index) => course.courseName),
        datasets: [
            {
                data: courses.map((course, index) => course.totalStudentsEnrolled),
                backgroundColor : getRandomColors(courses.length),
            }
        ]
    }

    //create data for chart displaying income info

    const chartDataForIncome = {
        labels: courses.map((course, index) => course.courseName),
        datasets: [
            {
                data: courses.map((course, index) => course.totalAmountGenerated),
                backgroundColor : getRandomColors(courses.length),
            }
        ]
    }

    //options
    const options = {

    }
    

  return (
      <div className="w-full bg-richblack-800 rounded-md p-5">
          <p className="text-xl font-semibold">Visualize</p>
          <div className="flex flex-row gap-3 my-2">
              <button
                  onClick={() => setCurrentChart('students')}
                  className={`${currentChart === 'students' ? 'bg-richblack-900 text-yellow-50': 'bg-richblack-700' } px-3 py-2 text-sm rounded-sm `}
              >Students</button>
              <button
                  onClick={() => setCurrentChart('income')}
                  className={`${currentChart === 'income' ? 'bg-richblack-900 text-yellow-50': 'bg-richblack-700' } px-3 py-1 rounded-sm text-sm`}
              >Income</button>
          </div>
          <div className="w-full flex items-center justify-center">
              <div className=" mx-auto">
              <Pie
                  data={currentChart === 'students' ? chartDataForStudent : chartDataForIncome}
                  options={options}
                  />
                  </div>
          </div>
    </div>
  )
}

export default InstructorChart