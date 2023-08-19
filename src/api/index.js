import { hostname } from "../utils/config";

 export const getStatusData = async () => {
    let data = await fetch(`${hostname}/Status`, {method: "GET"})
   .then(response=>{ return response.json()})
   .then(response=>{return response});
   return data;
 };