import { hostname } from "../utils/config";
export const getData = async () => {
    await fetch(`${hostname}/empsDetails/`, {method: "GET"})
    .then(response=>{ return response?.json()}).then(
      response =>{
      localStorage.setItem('list', JSON.stringify(response));
    });  
  };

 export const getStatusData = async () => {
    await fetch(`${hostname}/Status`, {method: "GET"})
   .then(response=>{ return response.json()})
   .then(response=>{return localStorage.setItem('status', JSON.stringify(response))});
 };