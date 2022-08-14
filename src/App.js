import './App.css';
import { Routes,Route,useNavigate,useParams } from 'react-router';
import React, { useEffect, useState, useContext, createContext, } from 'react';
import {Toolsbar,Admin} from './toolsbar'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { AddMovie } from './AddMovie.1';
import { api } from './api.1';
import { MyContext } from "./context";


var dum=[]
function App() {
 
    
  return (
   <div>
        <Routes>
          <Route path="/" element={<Toolsbar/>}>
          <Route index path="home" element={<Movies />}></Route>
          <Route  path="/bookYourSeats/:id" element={<BookYourSeats />}></Route>
          <Route  path="bookedYourSeats/" element={<BookedYourSeats />}></Route>
          <Route  path="/login" element={<Login/>}></Route>
          <Route  path="/signup" element={<SignUp/>}></Route>
         
          <Route  path="/ConfirmYourseats" element={<Confirmseats/>}></Route>
         
          </Route>
          <Route  path="/admin" element={<Admin/>}>
          <Route  path="addMovie" element={<AddMovie/>}></Route>
          <Route index path="home" element={<Movies />}></Route>
          
          </Route>
        </Routes>

    {/* <Routes>
   
   
    <Route index path="home" element={<Movies />}></Route>
    <Route  path="/bookYourSeats/:id" element={<BookYourSeats />}></Route>
     <Route  path="bookedYourSeats/" element={<BookedYourSeats />}></Route>
     <Route  path="/login" element={<Login/>}></Route>
     <Route  path="/signup" element={<SignUp/>}></Route>
        
        <Route  path="/ConfirmYourseats" element={<Confirmseats/>}></Route>
    </Route>
    </Routes> */}
    
   

   </div>

  );
}
function Confirmseats(){
  var [booked,setbooked]= useState(dum);
  return(
         <div className="tickets">
          <div>
                   <h5> Your ticket are booked !</h5>
                       <h4>{booked}</h4>
                       <h3>Get your ticket from your mail tq!</h3>
          </div>
                 

         </div> 
  )
  
}
function SignUp(){
  const navigate = useNavigate()
  let [username, setemail] = useState()
  let [password, setpassword] = useState()
  let signin =()=>{
        let newusers = {
          username,
          password
        }
    fetch(`${api}/signup`, {
      method: "POST",
      body: JSON.stringify(newusers),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(data => data.json()).then(() => navigate("/login"));
  }
  return(
   
 <div>
      <div className="document">
        <div className='container'>
          <div className='heading'>
            <i className="fa fa-book fa-4x" aria-hidden="true"></i>
            <span className='heading-name'>Book yours</span>
          </div>
          <div className='form'>
            <div>
              <form className='form-details'>
                <TextField id="outlined-basic"
                  label="username" variant="outlined"
                  style={{ width: 300 }}
                  onChange={(e) => setemail(e.target.value)}
                />

                <TextField id="outlined-basic"
                  label="password" variant="outlined"
                  style={{ width: 300 }}
                  onChange={(e) => setpassword(e.target.value)}
                />

                <div className='button'>
                  <Button variant="contained" type="button"
                    style={{ marginRight: 20 }}
                    onClick={signin}
                    >sign up</Button>
                 
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
function Login(){

  const navigate = useNavigate()
  let adminkey = 123456;
  let [username, setusername] = useState()
  let [password, setpassword] = useState()
  let [key, setkey] = useState()
  let [state , setsetstate] = useState(false)
     
const { setUser,user,setbutton1 } = useContext(MyContext)

  let loginn =()=>{

    let oldusers = {
      username,
      password
    }
    setUser(oldusers);
fetch(`${api}/login`, {
  method: "POST",
  body: JSON.stringify(oldusers),
  headers: {
    "Content-Type": "application/json"
  }
})
  .then(data =>data.json()).then(res=>{
    if(res.msg =="invalid creditial"){
     setsetstate(true)
    }else{
          if(key==adminkey){
            setbutton1(false)
            navigate("/admin")
          }else{
            setbutton1(false)
            navigate("/ConfirmYourseats")
          }
        
    }
});
}
  return(
   
 <div>
      <div className="document">
        <div className='container'>
          <div className='heading'>
            <i className="fa fa-book fa-4x" aria-hidden="true"></i>
            <span className='heading-name'>Book yours</span>
          </div>
          <div className='form'>
            <div>
              <form className='form-details'>
                <TextField id="outlined-basic"
                  label="username" variant="outlined"
                  style={{ width: 300 }}
                  onChange={(e) => setusername(e.target.value)}
                />

                <TextField id="outlined-basic"
                  label="password" variant="outlined"
                  style={{ width: 300 }}
                  onChange={(e) => setpassword(e.target.value)}
                />
                  <TextField id="outlined-basic"
                  label="optional for admin" variant="outlined"
                  style={{ width: 300 }}
                  onChange={(e) => setkey(e.target.value)}
                />

                <div className='button'>
                  <Button variant="contained" type="button"
                    style={{ marginRight: 20 }}
                    onClick={loginn}
                    >Log In</Button>
                  <Button variant="contained" type="button" onClick={()=>navigate("/signup")} >Sign in</Button>

                </div>
                <div>{state?"invalid credential":""}</div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
function Movies(){

  const [movie,setmovie]=useState([])
    
  fetch(`${api}/home`)
  .then(data=>data.json().then(mov=>setmovie(mov)))
 
      return(
        <div className='row'>
          {movie.map(mov=> <Getmovies mov={mov}/> )}
          </div>
   
      )         
}
function Getmovies({mov}){
   const navigate = useNavigate()
  let [like, setlike] = useState(0)
  let id = mov.id
  return(
    <div className='col-lg-4'>
    <img src={mov.pic}/> 
    <h3>{mov.name}<span>{mov.rating}</span></h3>
    <p>{mov.description}</p>
    <button onClick={()=>setlike(like+1)}>like{like}</button>
    <div className="ticket-book">
    <Button variant="contained" onClick={()=>navigate("/bookYourSeats/"+id)}>Book Now</Button>
    </div>
    
    </div>
  )
}
function BookYourSeats(){
 const {id}=useParams()
 const navigate = useNavigate()
 let [loading,setloading] =useState(true) 
   const style = {
    width:"690px"
  }
  
     const  [seat,setseat] = useState();
         


  fetch(`${api}/bookYourSeats/${id}`)
  .then(data=>data.json().then(mov=>setseat(mov)))
         
  
  function order(id){
    if(document.getElementById(id).className=="seats" ){
      document.getElementById(id).className="booking"
    }else if(document.getElementById(id).className=="blocked" ){
      alert("seats are blocked")
    }
    
    else {
      document.getElementById(id).className="seats"
    }
     
  }
 var [bookedseats,setbookedseats]=useState(0)
 

    const confirmBook=()=>{
      
      var seats = document.querySelectorAll(".booking")
      for(let i=0;i<seats.length;i++){
        var att=seats[i].getAttribute("id");
        dum.push(att)
      }
      setbookedseats(dum)
    
               
    }
    const confirm=()=>{
        setloading(false);
      if(bookedseats.length <= 0   && bookedseats.length != NaN){
        alert ("you must blocked your seat")
      }
      else{
        const obj = {};
        dum.forEach(function(k) {
         obj[k] = "blocked";
       });
        
       fetch(`${api}/bookYourSeats/${id}`,{
         method:"PUT",
         body:JSON.stringify(obj),
         headers:{
           "Content-Type":"application/json"
         }
       }).then(data=>data.json()).then(()=>navigate("/login"))
       
        
        
      }

    }
  
    
   
  return(
    <div className="_block">    
          <div id="layout" style={style}>

            {seat ? 
             <table>
             <tbody>
              <tr> <td ><div className="seats-named" style={style}><div><h3>PREMIUM</h3></div></div></td></tr>
              <tr>
                <td><div className='seats'>AA</div> 
                <td><div id="A1" name="A1" className={seat[0].A1}  onClick={()=>order("A1")}>1</div></td>
                <td><div id="A2" name="A2" className={seat[0].A2} onClick={()=>order("A2")}>2</div></td>
                <td><div id="A3"  name="A3" className={seat[0].A3} onClick={()=>order("A3")}>3</div></td>
                <td><div id="A4" name="A4" className={seat[0].A4} onClick={()=>order("A4")}>4</div></td>
                <td><div id="A5" name="A5" className={seat[0].A5} onClick={()=>order("A5")}>5</div></td>
                <td><div id="A6" name="A6" className={seat[0].A6} onClick={()=>order("A6")}>6</div></td>
               <td><div id="A7" name="A7" className={seat[0].A7} onClick={()=>order("A7")}>7</div></td>
                <td><div id="A8" name="A8" className={seat[0].A8} onClick={()=>order("A8")}>8</div></td>
                <td><div id="A9" name="A9" className={seat[0].A9} onClick={()=>order("A9")}>9</div></td>
                <td><div id="A10" name="A10" className={seat[0].A10} onClick={()=>order("A10")}>10</div></td>
                <td><div id="A11" name="A11" className={seat[0].A11} onClick={()=>order("A11")}>11</div></td>
                <td><div id="A12" name="A12" className={seat[0].A12} onClick={()=>order("A12")}>12</div></td>
                 <td><div id="A13" name="A13" className={seat[0].A13} onClick={()=>order("A13")}>13</div></td>
                 <td><div id="A14" name="A14" className={seat[0].A14} onClick={()=>order("A14")}>14</div></td>
                 <td><div id="A15" name="A15" className={seat[0].A15} onClick={()=>order("A15")}>15</div></td>
                </td>
              </tr>
              <tr>
              <td><div className='seats'>BB</div> 
              <td><div id="B1" name="B1" className={seat[0].B1} onClick={()=>order("B1")}>1</div></td>
              <td><div id="B2" name="B2" className={seat[0].B2} onClick={()=>order("B2")}>2</div></td>
              <td><div id="B3" name="B3" className={seat[0].B3} onClick={()=>order("B3")}>3</div></td>
              <td><div id="B4" name="B4" className={seat[0].B4} onClick={()=>order("B4")}>4</div></td>
              <td><div id="B5" name="B5" className={seat[0].B5} onClick={()=>order("B5")}>5</div></td>
              <td><div id="B6" name="B6" className={seat[0].B6} onClick={()=>order("B6")}>6</div></td>
              <td><div id="B7" name="B7" className={seat[0].B7} onClick={()=>order("B7")}>7</div></td>
              <td><div id="B8" name="B8" className={seat[0].B8} onClick={()=>order("B8")}>8</div></td>
              <td><div id="B9" name="B9" className={seat[0].B9} onClick={()=>order("B9")}>9</div></td>
              <td><div id="B10" name="B10" className={seat[0].B10} onClick={()=>order("B10")}>10</div></td>
              <td><div id="B11" name="B11" className={seat[0].B11} onClick={()=>order("B11")}>11</div></td>
              <td><div id="B12" name="B12" className={seat[0].B12} onClick={()=>order("B12")}>12</div></td>
              <td><div id="B13" name="B13" className={seat[0].B13} onClick={()=>order("B13")}>13</div></td>
              <td><div id="B14" name="B14" className={seat[0].B14} onClick={()=>order("B14")}>14</div></td>
              <td><div id="B15" name="B15" className={seat[0].B15} onClick={()=>order("B15")}>15</div></td>
           
               </td>    
              </tr>
              <tr> <td ><div className="seats-named" style={style}><div><h3>NORMAL</h3></div></div></td></tr>
              <tr>
              <td><div className='seats'>CC</div>
              <td><div id="C1" name="C1" className={seat[0].C1} onClick={()=>order("C1")}>1</div></td>
              <td><div id="C2" name="C2" className={seat[0].C2} onClick={()=>order("C2")}>2</div></td>
              <td><div id="C3" name="C3" className={seat[0].C3} onClick={()=>order("C3")}>3</div></td>
              <td><div id="C4" name="C4" className={seat[0].C4} onClick={()=>order("C4")}>4</div></td>
              <td><div id="C5" name="C5" className={seat[0].C5} onClick={()=>order("C5")}>5</div></td>
              <td><div id="C6" name="C6" className={seat[0].C6} onClick={()=>order("C6")}>6</div></td>
              <td><div id="C7" name="C7" className={seat[0].C7} onClick={()=>order("C7")}>7</div></td>
              <td><div id="C8" name="C8" className={seat[0].C8} onClick={()=>order("C8")}>8</div></td>
              <td><div id="C9" name="C9" className={seat[0].C9} onClick={()=>order("C9")}>9</div></td>
              <td><div id="C10" name="C10" className={seat[0].C10} onClick={()=>order("C10")}>10</div></td>
              <td><div id="C11" name="C11" className={seat[0].C11} onClick={()=>order("C11")}>10</div></td>
              <td><div id="C12" name="C12" className={seat[0].C12} onClick={()=>order("C12")}>10</div></td>
              <td><div id="C13" name="C13" className={seat[0].C13} onClick={()=>order("C13")}>10</div></td>
              <td><div id="C14" name="C14" className={seat[0].C14} onClick={()=>order("C14")}>10</div></td>
              <td><div id="C15" name="C15" className={seat[0].C15} onClick={()=>order("C15")}>10</div></td>
              </td>   
              </tr>
              <tr>
              <td><div className='seats'>DD</div>
              <td><div id="D1" name="D1" className={seat[0].D1} onClick={()=>order("D1")}>1</div></td>
              <td><div id="D2" name="D2" className={seat[0].D2} onClick={()=>order("D2")}>2</div></td>
              <td><div id="D3" name="D3" className={seat[0].D3} onClick={()=>order("D3")}>3</div></td>
              <td><div id="D4" name="D4" className={seat[0].D4} onClick={()=>order("D4")}>4</div></td>
              <td><div id="D5" name="D5" className={seat[0].D5} onClick={()=>order("D5")}>5</div></td>
              <td><div id="D6" name="D6" className={seat[0].D6} onClick={()=>order("D6")}>6</div></td>
              <td><div id="D7" name="D7" className={seat[0].D7} onClick={()=>order("D7")}>7</div></td>
              <td><div id="D8" name="D8" className={seat[0].D8} onClick={()=>order("D8")}>8</div></td>
              <td><div id="D9" name="D9" className={seat[0].D9} onClick={()=>order("D9")}>9</div></td>
              <td><div id="D10" name="D10" className={seat[0].D10} onClick={()=>order("D10")}>10</div></td>
              <td><div id="D11" name="D10" className={seat[0].D11} onClick={()=>order("D11")}>11</div></td>
              <td><div id="D12" name="D10" className={seat[0].D12} onClick={()=>order("D12")}>12</div></td>
              <td><div id="D13" name="D10" className={seat[0].D13} onClick={()=>order("D13")}>13</div></td>
              <td><div id="D14" name="D10" className={seat[0].D14} onClick={()=>order("D14")}>14</div></td>
              <td><div id="D15" name="D10" className={seat[0].D15} onClick={()=>order("D15")}>15</div></td>
              </td>   
              </tr>
              <tr> <td ><div className="seats-named" style={style}><div><h3>LOW</h3></div></div></td></tr>
              <tr>
              <td><div className='seats'>EE</div>
              <td><div id="E1" name="E1" className={seat[0].E1} onClick={()=>order("E1")}>1</div></td>
              <td><div id="E2" name="E2" className={seat[0].E2} onClick={()=>order("E2")}>2</div></td>
              <td><div id="E3" name="E3" className={seat[0].E3} onClick={()=>order("E3")}>3</div></td>
              <td><div id="E4" name="E4" className={seat[0].E4} onClick={()=>order("E4")}>4</div></td>
              <td><div id="E5" name="E5" className={seat[0].E5} onClick={()=>order("E5")}>5</div></td>
              <td><div id="E6" name="E6" className={seat[0].E6} onClick={()=>order("E6")}>6</div></td>
              <td><div id="E7" name="E7" className={seat[0].E7} onClick={()=>order("E7")}>7</div></td>
              <td><div id="E8" name="E8" className={seat[0].E8} onClick={()=>order("E8")}>8</div></td>
              <td><div id="E9" name="E9" className={seat[0].E9} onClick={()=>order("E9")}>9</div></td>
              <td><div id="E10" name="E10" className={seat[0].E10} onClick={()=>order("E10")}>10</div></td>
              <td><div id="E11" name="E11" className={seat[0].E11} onClick={()=>order("E11")}>11</div></td>
              <td><div id="E12" name="E12" className={seat[0].E12} onClick={()=>order("E12")}>12</div></td>
              <td><div id="E13" name="E13" className={seat[0].E13} onClick={()=>order("E13")}>13</div></td>
              <td><div id="E14" name="E14" className={seat[0].E14} onClick={()=>order("E14")}>14</div></td>
              <td><div id="E15" name="E15" className={seat[0].E15} onClick={()=>order("E15")}>15</div></td>
              </td> 
              </tr>

               
 
            <tr><td><Button variant="contained" onClick={confirmBook}>confirm</Button></td></tr>
            <tr><td><Button variant="contained"  onClick={confirm}>{`${ loading ? "pay amount" : "Loading.." } ${bookedseats.length*200}`}</Button></td></tr>
            </tbody>
            </table>
            : "Loading"}
        </div>
       
    </div>
  )
}
function BookedYourSeats(){
  

  var [seats, setseats]=useState(dum)
  return(
    <div>
      <h1>
        {seats}
      </h1>

    </div>
  )
}





export default App;