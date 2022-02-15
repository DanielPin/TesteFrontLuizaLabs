import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import ConexaoApiPersonagem from "../infra/conexaoApiPersonagem";
import style from "../styles/Listar.module.css";
import Pagination from "./Pagination";

const LIMIT: number = 10;

export default function Listar() {
  const [personagem, setPersonagem] = useState([{}]);
  const [buscaNome, setBuscaNome] = useState("");
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    ConexaoApiPersonagem(buscaNome, offset).then((response) => {
      setPersonagem(response.data.data.results),
        setOffset(response.data.data.offset),
        setTotal(response.data.data.total);
    });
  }, [buscaNome, offset]);

  return (
    <>
      <div className={style.container}>
        <div className={style.box}>
          <h2 className={style.h2Busca}>Busca</h2>
          <input
            className={style.inputBusca}
            type="text"
            placeholder="Buscar por nome"
            value={buscaNome}
            onChange={(ev) => setBuscaNome(ev.target.value)}
          />
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell align="center" sx={{fontWeight: 'bold'}}>Nome</TableCell>
                  <TableCell align="center" sx={{fontWeight: 'bold'}}>Detalhes</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {personagem.map((row: any, index: any) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" align="center">
                      {row.name}
                    </TableCell>
                    <TableCell align="center">
                      <Link
                        href={{ pathname: `/detalhes`, query: { id: row.id } }}
                      >
                        <VisibilityIcon sx={{cursor: 'pointer'}} />
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Pagination
            limit={LIMIT}
            total={total}
            offset={offset}
            setOffset={setOffset}
          />
        </div>
      </div>
    </>
  );
}
