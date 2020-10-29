"use strict";

const { TestScheduler } = require("jest");
const simonsQuest = require("../gamification");

describe("Can Create Class", () => {
  it("simonsQuest creates without params", () => {
    var game = new simonsQuest({});
    expect(game).toBeDefined();
  });

  it("simonsQuest creates withoutXp params", () => {
    var game = new simonsQuest({
      currentLevel: 20,
    });
    expect(game).toBeDefined();
  });

  it("simonsQuest creates withoutLevel params", () => {
    var game = new simonsQuest({
      currentXp: 20,
    });
    expect(game).toBeDefined();
  });

  it("simonsQuest creates with both params", () => {
    var game = new simonsQuest({
      currentLevel: 20,
      currentXp: 20,
    });
    expect(game).toBeDefined();
  });
});

describe("level to xp check", () => {
  let game;
  beforeEach(() => {
    game = new simonsQuest({});
  });

  test("level 5 is equal to 100xp", () => {
    expect(game.levelToXp(5)).toBe(100);
  });

  test("Level 20 is equal to 6400xp", () => {
    expect(game.levelToXp(20)).toBe(6400);
  });

  test("level 19 is equal to xp 5487", () => {
    expect(game.levelToXp(19)).toBe(5487);
  });
});

describe("xp to level check", () => {
  let game;
  beforeEach(() => {
    game = new simonsQuest({});
  });

  test("100xp is equal to level 5", () => {
    expect(game.xpToLevel(100)).toBe(5);
  });

  test("6400xp is equal to level 20", () => {
    expect(game.xpToLevel(6400)).toBe(20);
  });

  test("6399xp is equal to level 19", () => {
    expect(game.xpToLevel(6399)).toBe(19);
  });
});

describe("xp to next level check", () => {
  test("xp from level 4 to 5 is 49", () => {
    let game = new simonsQuest({ currentLevel: 4 });
    expect(game.xpToNextLevel()).toBe(49);
  });

  test("xp from level 19 to 20 is 913", () => {
    let game = new simonsQuest({ currentLevel: 19 });
    expect(game.xpToNextLevel()).toBe(913);
  });

  test("xp from xp 6399 (level  19) to 20 is 1", () => {
    let game = new simonsQuest({ currentXp: 6399 });
    expect(game.xpToNextLevel()).toBe(1);
  });
});

describe("progress to next level", () => {
  test("xp from level 4 to 5 (no gain) 0%", () => {
    let game = new simonsQuest({ currentLevel: 4 });
    expect(game.progressToNextLevel()).toBe(0);
  });

  test("xp from level 19 to 20 (no gain) 0%", () => {
    let game = new simonsQuest({ currentLevel: 19 });
    expect(game.progressToNextLevel()).toBe(0);
  });

  test("xp 6399(19) of 6400(20)  99%", () => {
    let game = new simonsQuest({ currentXp: 6399 });
    expect(game.progressToNextLevel()).toBe(99);
  });

  test("xp 76(4) of 100(5)  51%", () => {
    let game = new simonsQuest({ currentXp: 76 });
    expect(game.progressToNextLevel()).toBe(51);
  });
});

describe("getters", () => {
  test("level", () => {
    let game = new simonsQuest({ currentLevel: 4 });
    expect(game.getCurrentLevel()).toBe(4);
  });

  test("xp", () => {
    let game = new simonsQuest({ currentXp: 500 });
    expect(game.getCurrentXp()).toBe(500);
  });
});
