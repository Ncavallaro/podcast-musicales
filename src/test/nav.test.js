import React from "react";
import { render } from "@testing-library/react";
import Nav from "../components/header/nav";

describe("Componente Nav", () => {
  it("se renderiza sin errores", () => {
    render(<Nav toppodcasts={[]} />);
  });

  it("muestra 'Podcaster' como la marca de la barra de navegación", () => {
    const { getByText } = render(<Nav toppodcasts={[]} />);
    const navbarBrand = getByText("Podcaster");
    expect(navbarBrand).toBeInTheDocument();
  });

  it("muestra un spinner cuando se están cargando los toppodcasts", () => {
    const { getByRole } = render(<Nav toppodcasts={[]} />);
    const spinner = getByRole("status");
    expect(spinner).toBeInTheDocument();
  });

  it("no muestra un spinner cuando no se están cargando los toppodcasts", () => {
    const { queryByRole } = render(<Nav toppodcasts={[/* datos de toppodcasts de ejemplo */]} />);
    const spinner = queryByRole("status");
    expect(spinner).toBeNull();
  });
});
