import axios from "axios";
import md5 from "md5";

const publicKey: string = process.env.NEXT_PUBLIC_PUBLIC_KEY || "";
const privateKey: string = process.env.NEXT_PUBLIC_PRIVATE_KEY || "";
const timestamp: number = new Date().getTime();
const url: string = "http://gateway.marvel.com/v1/public/characters";
const LIMIT: number = 10;
const hash: string = md5(timestamp + privateKey + publicKey);

export default function ConexaoApiPersonagem(
  buscarNome: string,
  offset: number
) {
  const params = new URLSearchParams();
  buscarNome ? params.append("nameStartsWith", buscarNome) : null;
  params.append("limit", LIMIT.toString());
  params.append("offset", offset.toString());
  params.append("ts", timestamp.toString());
  params.append("apikey", publicKey);
  params.append("hash", hash);

  return axios.get(`${url}`, { params });
}
