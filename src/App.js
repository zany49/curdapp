import React from 'react';
import './App.css';
import Card from '@material-ui/core/Card';
import {useState, useEffect} from 'react';
// import {useHistory} from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'antd';

function App() {
  const[cribs,setCribs] = useState([]);
  const [id,setid]=useState(null);
  const [flag,setflag]=useState(true);
  const [username,setUsername]=useState("");
  const[userpic,setUserpic]=useState("");
  const [location,setLocation]=useState("");
  const [search,setSearch]=useState("");

    function getCribs() {
      fetch("http://localhost:8000/cribs",{
        method: "GET",
      })
      .then(data=>data.json())
      .then(cribs=>setCribs(cribs))
      // .then(console.log(cribs))
    }

    function createCribs(){
      fetch("http://localhost:8000/cribs",{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({name:username,pic:userpic,location: location}),
      })
      .then(data=>data.json())
      .then((result)=>console.log(result))
      .then(()=>getCribs());
    }
    function deleteCribs(id){
      alert(id);
      fetch(`http://localhost:8000/cribs/${id}`,{
        method: "DELETE",
        
      })
      .then(data=>data.json())
      .then((result)=>console.log(result))
      .then(()=>getCribs());
    }

    function editCribs(id,name,pic,location){
      setflag(!flag)
      setid(id)
      flag ? setUsername(name) :setUsername("")
      flag ? setUserpic(pic) : setUserpic("")
      flag ? setLocation(location) : setLocation("") 
  }
  


    function updateCribs(id){
      alert(id);
      fetch(`http://localhost:8000/cribs/${id}`,{
        method: 'PUT',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({name:username,pic:userpic,location: location}),
      })
      .then(data=>data.json())
      .then((result)=>console.log(result))
      .then(()=>getCribs());
    }

    useEffect(()=>{
      getCribs();
    },[]);
  
  // console.log(cribs); 

  return (
    <div className="row py-5">
    <div className="col-md-6 offset-md-3">
    <div className="formcontrol">
    <TextField type="text" value={search}
          onChange={(event) => setSearch(event.target.value)}
          variant="standard" label="search" />
     <br />
     <br />
    
     <TextField value={username} onChange={(event) => setUsername(event.target.value)}type="text" variant="filled" label="name" />
     <br />
     <br />
     <TextField value={userpic} onChange={(event) => setUserpic(event.target.value)}type="text" variant="filled" label="pic url" />
     <br />
     <br />
     <TextField value={location} onChange={(event) => setLocation(event.target.value)}type="text" variant="filled" label="location" />
     <br />
     <br />
    {/* onClick={()=>createUser()} */}
     <Button color="secondary" onClick={()=>username!==false && userpic!==false && location!==false ?  flag ? createCribs() : updateCribs(id) :""}>
        { flag ? "Add Cribs " : "Update Cribs "}
       </Button>

     </div>
     <div className="display-fields">
       {cribs.filter((cribs) => cribs.name.includes(search.toLocaleLowerCase()))
       .map((crib,id)=>(
         
         <Cribs 
         key={id}
         id = {crib._id}
         name = {crib.name} 
         pic = {crib.pic}
         location = {crib.location}
         deletecribs={deleteCribs}
         updatecribs={updateCribs}
         editcribs={editCribs}
         
         />
         
       ))}
     </div>
     </div>      
     </div>      
    
    
  );
}


function Cribs({pic, name, location,id ,deletecribs,editcribs}){

   console.log(name);
   console.log(id);
  // const history = useHistory();
// console.log(editcribs);
  // onClick={() =>history.push(id)}

  return(
    <div className="usercard" >
    <Card  >
        <img src={pic} alt='propic' style={{borderRadius:'50%', height:'76px' , width:'75px', objectFit:'cover',margin:'20px'}}></img>
        <br />
        <h2 style={{marginLeft:'20px'}}>Name: {name}</h2> 
        <br />
        <h3 style={{marginLeft:'20px',marginBottom:'20px'}}>Location : {location}</h3>
        
        <Button onClick={()=>deletecribs(id)} style={{marginLeft:'20px',marginBottom:'20px'}} color="secondary">Delete</Button>
        
        
        <Button onClick={()=>editcribs(id,name,pic,location)} style={{marginLeft:'20px',marginBottom:'20px'}} color="primary">Edit</Button>
    </Card>
    </div>
  )


}















export default App;
