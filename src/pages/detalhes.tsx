import { Grid, Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Link from "next/link";
import ConexaoApiDetalhePersonagem from "../infra/conexaoApiDetalhePersonagem";
import style from "../styles/Detalhes.module.css";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

export default function Detalhes({ personagem }: any) {
  return (
    <>
      <Link href={{ pathname: `/` }}>
        <span className={style.span}>Voltar</span>
      </Link>

      <div className={style.container}>
        <Paper
          elevation={24}
          sx={{
            p: 2,
            margin: "auto",
            flexGrow: 1,
            maxWidth: 1000,
          }}
        >
          <Grid container spacing={2}>
            <Grid item>
              <Img alt="complex" src={personagem[0].image} />
            </Grid>

            <Grid item xs={24} sm container spacing={2}>
              <Grid item sx={{ p: 2 }}>
                <Typography variant="body2">
                  <b> ID: </b> {personagem[0].id}
                </Typography>

                <Typography variant="body2">
                  <b> NOME: </b> {personagem[0].nome}
                </Typography>

                <Typography variant="body2">
                  <b> DESCRIÇÃO: </b> {personagem[0].descricao}
                </Typography>

                <Typography variant="body2">
                  <b> Histórias: </b> {personagem[0].stories}
                </Typography>

                <Typography variant="body2">
                  <b> Total de comics que apareceu: </b> {personagem[0].comics}
                </Typography>

                <Typography variant="body2">
                  <b> 3 Comics que apareceu: </b>
                  {personagem[0].comicsLista.map((comic, index) => {
                    if (index <= 2) {
                      return <li key={comic}>{comic}</li>;
                    }
                  })}
                </Typography>

                <Typography variant="body2">
                  <b> Total de series que apareceu: </b>
                  {personagem[0].seriesTotal}
                </Typography>

                <Typography variant="body2">
                  <b>3 Series que apareceu: </b>
                  {personagem[0].series.map((serie, index) => {
                    if (index <= 2) {
                      return <li key={serie}>{serie}</li>;
                    }
                  })}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </div>
    </>
  );
}

Detalhes.getInitialProps = async ({ query: { id } }) => {
  const { data } = await ConexaoApiDetalhePersonagem(id);

  const personagem = data.data.results.map((personagem) => {
    return {
      id: personagem.id,
      nome: personagem.name,
      comics: personagem.comics.available,
      image:
        personagem.thumbnail.path +
        "/portrait_xlarge" +
        "." +
        personagem.thumbnail.extension,
      seriesTotal: personagem.series.available,
      stories: personagem.stories.available,
      descricao: personagem.description,
      comicsLista: personagem.comics.items.map((comic) => {
        return comic.name;
      }),
      series: personagem.series.items.map((serie) => {
        return serie.name;
      }),
    };
  });

  return { personagem };
};
