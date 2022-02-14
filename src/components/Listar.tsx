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
import ConexaoApi from "../infra/conexaoApi";
import style from "../styles/Listar.module.css";

export default function Listar() {
  const [personagem, setPersonagem] = useState([{}]);
  const [buscaNome, setBuscaNome] = useState("");
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    ConexaoApi(buscaNome, offset).then((response) => {
      setPersonagem(response.data.data.results),
        setOffset(response.data.data.offset)
    });
  }, [buscaNome, offset]);

  return (
    <>
      <div className={style.container}>
        <div className={style.box}>
          <h2>Busca</h2>
          <input
            type="text"
            placeholder="busca por nome"
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
                  <TableCell align="center">Nome</TableCell>
                  <TableCell align="center">Detalhes</TableCell>
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
                        <VisibilityIcon />
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  );
}
