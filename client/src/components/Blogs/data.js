

import './App.css';
import {useState} from 'react';
function App() {
    const [blogs,setBlogs]=useState([
        {title:"Raja",experience:"10+ Years"},
        {name:"Mano",experience:"2 Years"},
        {name:"Tom",experience:"5+ Years"},
    ])
   
    const addRow=()=>{
        let newEmp={name:"Random User1",experience:"6 Years"}
        setEmps([...emps,newEmp])
    }

    const updateRow=()=>{
        let index=0
        let newEmp=emps[index]
        newEmp["name"]="Modfied User";
        emps[index]=newEmp
        setEmps([...emps])
    }

    const deleteRow = () => {
        //let name="Mano"
        //setEmps(emps.filter(emp => emp.name !== name))
        let copy_emp=[...emps]
        copy_emp.splice(0,1)
        setEmps(copy_emp)
    }


    return ( 
    <div className = "App" >
       {emps.map( (emp,index)=>
       (
          <div key={index}>
              <h3>{emp.name}</h3>
              <p>{emp.experience}</p>
          </div>
       )
       )}
       <button onClick={addRow}>Add</button>
       <button onClick={updateRow}>Update</button>
       <button onClick={deleteRow}>Delete</button>


     </div>
    );
}

export default App;
