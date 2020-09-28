import React, { useState, useEffect } from 'react'
import 'react-table-v6/react-table.css'
import axios from 'axios'
import ReactTable from 'react-table-v6'
import './app.css'


const App = () => {

  const [employeeState, setEmployeeState] = useState({
    employees: [],
    columns: [
      {
        Header: 'Name',
        accessor: 'name'
      },
      {
        Header: 'Phone',
        accessor: 'phone'
      },
      {
        Header: 'Email',
        accessor: 'email'
      },
      {
        Header: 'Age',
        accessor: 'age'
      },
      {
        Header: 'Gender',
        accessor: 'gender'
      },
    ]
  })


  useEffect(() => {
    axios.get('https://randomuser.me/api?results=25')
      .then(({ data }) => {        
        let employees = data.results.map(employee => ({
          name: `${employee.name.first} ${employee.name.last}`,
          email: employee.email,
          phone: employee.phone,
          age: employee.dob.age,
          gender: employee.gender
        }))

        setEmployeeState({ ...employeeState, employees })
      })
      .catch(err => console.error(err))
  }, [])

  return (
    <>
    <div className="topBar">
    <h1>Employee Directory</h1>
    <small>Click on tabs to filter</small>
      </div>
    <ReactTable
      data={employeeState.employees}
      columns={employeeState.columns}
    />
    </>
  )
}

export default App