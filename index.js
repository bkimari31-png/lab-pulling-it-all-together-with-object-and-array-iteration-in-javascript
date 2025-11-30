function numPointsScored(playerName) {
  const game = gameObject();
  for (const team in game) {
    if (game[team].players[playerName]) return game[team].players[playerName].points;
  }
  return null;
}

function shoeSize(playerName) {
  const game = gameObject();
  for (const team in game) {
    if (game[team].players[playerName]) return game[team].players[playerName].shoe;
  }
  return null;
}

// ---------------------- Team Info ---------------------- //
function teamColors(teamName) {
  const game = gameObject();
  for (const team in game) {
    if (game[team].teamName === teamName) return game[team].colors;
  }
  return [];
}

function teamNames() {
  const game = gameObject();
  return [game.home.teamName, game.away.teamName];
}

// ---------------------- Player Numbers & Stats ---------------------- //
function playerNumbers(teamName) {
  const game = gameObject();
  for (const team in game) {
    if (game[team].teamName === teamName) {
      return Object.values(game[team].players).map(player => player.number);
    }
  }
  return [];
}

function playerStats(playerName) {
  const game = gameObject();
  for (const team in game) {
    if (game[team].players[playerName]) return game[team].players[playerName];
  }
  return {};
}

// ---------------------- Advanced Challenge ---------------------- //
function bigShoeRebounds() {
  const game = gameObject();
  let largestShoe = 0;
  let rebounds = 0;
  for (const team in game) {
    for (const player in game[team].players) {
      const stats = game[team].players[player];
      if (stats.shoe > largestShoe) {
        largestShoe = stats.shoe;
        rebounds = stats.rebounds;
      }
    }
  }
  return rebounds;
}

// ---------------------- Most Points & Winning Team ---------------------- //
function mostPointsScored() {
  const game = gameObject();
  let maxPoints = 0;
  let topScorer = '';
  for (const team in game) {
    for (const player in game[team].players) {
      if (game[team].players[player].points > maxPoints) {
        maxPoints = game[team].players[player].points;
        topScorer = player;
      }
    }
  }
  return topScorer;
}

function winningTeam() {
  const game = gameObject();
  const scores = {};
  for (const team in game) {
    scores[game[team].teamName] = Object.values(game[team].players).reduce((sum, player) => sum + player.points, 0);
  }
  return scores[game.home.teamName] > scores[game.away.teamName] ? game.home.teamName : game.away.teamName;
}

// ---------------------- Longest Name & Steals ---------------------- //
function playerWithLongestName() {
  const game = gameObject();
  let longestName = '';
  for (const team in game) {
    for (const player in game[team].players) {
      if (player.length > longestName.length) longestName = player;
    }
  }
  return longestName;
}

function doesLongNameStealATon() {
  const game = gameObject();
  const longestNamePlayer = playerWithLongestName();
  let maxSteals = 0;

  for (const team in game) {
    for (const player in game[team].players) {
      if (game[team].players[player].steals > maxSteals) {
        maxSteals = game[team].players[player].steals;
      }
    }
  }

  const longestPlayerSteals = (() => {
    for (const team in game) {
      if (game[team].players[longestNamePlayer]) {
        return game[team].players[longestNamePlayer].steals;
      }
    }
  })();

  return longestPlayerSteals === maxSteals;
}

// ---------------------- Exports for Jest ---------------------- //
module.exports = {
  gameObject,
  numPointsScored,
  shoeSize,
  teamColors,
  teamNames,
  playerNumbers,
  playerStats,
  bigShoeRebounds,
  mostPointsScored,
  winningTeam,
  playerWithLongestName,
  doesLongNameStealATon
};