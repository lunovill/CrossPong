export interface Score {
	player1: string;
	scorePlayer1: number;
	scorePlayer2: number;
	player2: string;
}

export const addScoreToSessionStorage = (player1: string, scorePlayer1: number, scorePlayer2: number, player2: string) => {
	const scoresJSON = sessionStorage.getItem('scores');
	let scores: Score[] = scoresJSON ? JSON.parse(scoresJSON) : [];

	const newScore: Score = { player1, scorePlayer1, scorePlayer2, player2 };
	scores.unshift(newScore);
	scores = scores.slice(0, 10);

	const updatedScoresJSON = JSON.stringify(scores);
	sessionStorage.setItem('scores', updatedScoresJSON);
};

export const getScoresFromSessionStorage = (): Score[] => {
	const scoresJSON = sessionStorage.getItem('scores');
	return scoresJSON ? JSON.parse(scoresJSON) : [];
  };