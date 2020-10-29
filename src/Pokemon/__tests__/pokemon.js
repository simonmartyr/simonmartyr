"use strict";
const { TestScheduler } = require("jest");
const pokemon = require("../pokemon");

describe("Can Create", () => {
  it("creates pokemon", () => {
    return pokemon.refreshPokemon().then((x) => {
      expect(x).toBeDefined();
    });
  });
});
