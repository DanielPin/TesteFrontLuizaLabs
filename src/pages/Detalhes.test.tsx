import { render, screen, waitFor } from "@testing-library/react";
import Detalhes from "./detalhes";
import "@testing-library/jest-dom";

import { act } from "react-dom/test-utils";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Teste  da tela de listagem", () => {
  it("Listagem com 2 personagens", async () => {
    await mockedAxios.get.mockImplementation(() =>
      Promise.resolve({
        data: {
          data: {
            results: [
              {
                id: 1,
                name: "spider",
                description: "uma aranha",
                thumbnail: {
                  path: "http://i.annihil.us/u/prod/marvel/i/mg/3/50/526548a343e4b",
                  extension: "jpg",
                },
                comics: {
                  available: 2,
                  items: [
                    {
                      name: "comic1",
                    },
                  ],
                },
                series: {
                  available: 2,
                  items: [
                    {
                      name: "serie1",
                    },
                  ],
                },
                stories: {
                  available: 2,
                  items: [
                    {
                      name: "historia1",
                    },
                  ],
                },
              },
            ],
          },
        },
      })
    );

    const { personagem } = await Detalhes.getInitialProps({
      query: { id: 1 },
    });

    await render(<Detalhes personagem={personagem} />);

    expect(screen.getByRole('img', { name: /complex/i })).toBeInTheDocument();
    expect(screen.getByText(/voltar/i)).toBeInTheDocument();
    expect(screen.getByText(/id:/i)).toBeInTheDocument();
    expect(screen.getByText(/nome:/i)).toBeInTheDocument();
    expect(screen.getByText(/descrição:/i)).toBeInTheDocument();
    expect(screen.getByText(/histórias:/i)).toBeInTheDocument();
    expect(screen.getByText(/total de comics que apareceu:/i)).toBeInTheDocument();
    expect(screen.getByText(/3 comics que apareceu:/i)).toBeInTheDocument();
    expect(screen.getByText(/total de series que apareceu:/i)).toBeInTheDocument();
    expect(screen.getByText(/3 series que apareceu:/i)).toBeInTheDocument();
    waitFor(() => expect(screen.getAllByText(/1/i)).toBeInTheDocument());
    expect(screen.getByText(/spider/i)).toBeInTheDocument();
    waitFor(() => expect(screen.getAllByText(/2/i)).toBeInTheDocument());
    waitFor(() => expect(screen.getAllByRole('listitem')).toBeInTheDocument());
  });
});
