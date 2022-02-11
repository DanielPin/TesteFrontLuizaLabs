import axios from "axios"
import md5 from "md5"

let publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY || "";
let privateKey = process.env.NEXT_PUBLIC_PRIVATE_KEY || "";
let timestamp = new Date().getTime();
let url = "http://gateway.marvel.com/v1/public/characters";
const limit = 10;
const offset= 0;

let hash = md5(timestamp + privateKey + publicKey);

export default function Api(){
       return axios.get(`${url}`,{
           params:{
            limit:limit,
            offset:offset,
            ts:timestamp,
            apikey:publicKey,
            hash:hash
           }
       });
     
}