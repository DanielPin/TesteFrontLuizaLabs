import style from "../styles/Pagination.module.css";

const MAX_ITEMS: number = 9;
const MAX_A_ESQUERDA: number = (MAX_ITEMS - 1) / 2;

const Pagination = ({ limit, total, offset, setOffset }) => {
  const paginaAtual: number = offset ? offset / limit + 1 : 1;
  const totalPaginas: number = Math.ceil(total / limit);
  const primeiraPagina: number = Math.max(paginaAtual - MAX_A_ESQUERDA, 1);

  function onPageChange(pagina) {
    setOffset((pagina - 1) * limit);
  }

  return (
    <>
      <ul className={style.pagination}>
        <li>
          <button
            onClick={() => onPageChange(paginaAtual - 1)}
            disabled={paginaAtual === 1}
          >
            Anterior
          </button>
        </li>

        {Array.from({ length: Math.min(MAX_ITEMS, totalPaginas) })
          .map((_, index: number) => index + primeiraPagina)
          .map((page: number) => (
            <li key={page}>
              <button
                onClick={() => onPageChange(page)}
                className={page === paginaAtual ? style.paginationActive : ""}
              >
                {page}
              </button>
            </li>
          ))}

        <li>            
          <button
            onClick={() => onPageChange(paginaAtual + 1)}
            disabled={paginaAtual === totalPaginas}
          >
            Próxima
          </button>
        </li>
      </ul>
    </>
  );
};

export default Pagination;
