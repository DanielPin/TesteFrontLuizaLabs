import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import axios from "axios";
import Listar from "./Listar";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Teste  da tela de listagem", () => {
  it("Listagem com 2 personagens", async () => {
    await mockedAxios.get.mockImplementation(() =>
      Promise.resolve({
        data: {
          data: {
            offset: 0,
            limit: 10,
            total: 9,
            results: [
              {
                id: 1,
                name: "spider",
              },
              {
                id: 2,
                name: "iron",
              },
            ],
          },
        },
      })
    );

    await render(<Listar />);

    expect(screen.getByRole("columnheader", { name: /nome/i })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: /detalhes/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /próxima/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /anterior/i })).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /busca/i })).toBeInTheDocument();
    expect(screen.getByRole("rowheader", { name: /spider/i })).toBeInTheDocument();
    expect(screen.getByRole("rowheader", { name: /iron/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /1/i })).toBeInTheDocument();
  });
});
