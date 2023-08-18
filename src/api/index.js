import { hostname } from "../utils/config";
export const getData = async () => {
    await fetch(`${hostname}/empsDetails/`, {method: "GET"})
    .then(response=>{ return response?.json()}).then(
      response =>{
      localStorage.setItem('list', JSON.stringify(response));
    });  
  };

 export const getStatusData = async () => {
    let data = await fetch(`${hostname}/Status`, {method: "GET"})
   .then(response=>{ return response.json()})
   .then(response=>{return response});
   return data;
 };