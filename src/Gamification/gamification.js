//Honestly better than Castlevania II
class SimonsQuest {
  constructor({ currentLevel = 0, currentXp = 0 }) {
    this.setCurrentXp(currentLevel, currentXp);
  }

  setCurrentXp = (currentLevel, currentXp) => {
    if (currentXp > 0) {
      this.currentXp = currentXp;
      this.currentLevel = this.xpToLevel(currentXp);
    } else if (currentLevel > 0) {
      this.currentLevel = currentLevel;
      this.currentXp = this.levelToXp(currentLevel);
    } else {
      this.currentLevel = 0;
      this.currentXp = 0;
    }
  };
  /**
   * Formula taken from Pokemon as I lack creativity.
   * determines how much xp is required for a given level
   * @public
   * @param {number} level to convert
   * @returns {number} level converted to xp
   */
  levelToXp = (level) => {
    return Math.round((4 * Math.pow(level, 3)) / 5);
  };

  /**
   * Formula taken from Pokemon as I lack creativity.
   * determines what level based on xp
   * @public
   * @param {number} xp xp to convert
   * @returns {number} xp converted to level
   */
  xpToLevel = (xp) => {
    return Math.floor(Math.cbrt((xp * 5) / 4));
  };

  /**
   * How much xp is required for next level
   * @public
   * @returns {number} xp to next level
   */
  xpToNextLevel = () => {
    return this.levelToXp(this.currentLevel + 1) - this.currentXp;
  };

  /**
   * How much progress has been made for the next level
   * @public
   * @returns {number} % of progression
   */
  progressToNextLevel = () => {
    let nextLevelXp = this.levelToXp(this.currentLevel + 1);
    let currentLevelXp = this.levelToXp(this.currentLevel);
    let totalDiff = nextLevelXp - currentLevelXp;
    let currentDiff = this.currentXp - currentLevelXp;
    return Math.floor((currentDiff / totalDiff) * 100);
  };

  getCurrentLevel = () => this.currentLevel;
  getCurrentXp = () => this.currentXp;
}

module.exports = SimonsQuest;
