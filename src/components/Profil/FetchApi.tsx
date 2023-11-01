import axios from 'axios';
axios.defaults.baseURL = import.meta.env['VITE_API_URL']; // URL de base de votre API
axios.defaults.withCredentials = true; // Permet d'envoyer les cookies lors des requêtes

export interface GameRecord {
	id: number;
	playedAt: string;
	playerA: string;
	playerAId: number;
	playerB: string;
	playerBId: number;
	scoreA: number;
	scoreB: number;
}

const fetchLatestMatches = async (userId: number) => {
	try {
		const response = await axios.get(`/game/last/${userId}`);
		return response.data;
	} catch (error) {
		// console.log(error);
	}
};

export const fetchMatches = async (userId: number) => {
	try {
		const matches: GameRecord[] = await fetchLatestMatches(userId);
		return matches;
	} catch (error: any) {
		console.error("An error occurred while fetching the matches: ", error.message);
	}
};


export const getPlayerDataApi = async () => {
	const response = await fetch(`${import.meta.env['VITE_API_URL']}/players`, {
		method: 'GET',
		headers: { 'Accept': 'application/json' },
		credentials: 'include',
	});

	if (!response.ok) {
		const error = new Error() as any;
		error.statusCode = response.status;
		error.message = await response.text();

		// Essayons de parser le message d'erreur
		try {
			const parsedMessage = JSON.parse(error.message);
			if (parsedMessage.statusCode === 428) {
				error.statusCode = 428;
				error.message = parsedMessage.error;
			}
		} catch(e) {
			// Si le parsing échoue, on ne fait rien et on conserve le comportement par défaut
		}

		// console.log("Error", response);
		throw error;
	}

	const data = await response.json();
	return data;
};

export const generate2FACodeApi = async () => {

	const token = document.cookie
		.split("; ")
		.find((row) => row.startsWith("jwt_token="))
		?.split("=")[1];
	if (!token) {
		const error = new Error("Token is not available") as any;
		error.statusCode = 401; // Utilisation de 401 pour indiquer une erreur d'authentification
		throw error;
	}

	const response = await fetch(`${import.meta.env['VITE_API_URL']}/2fa/generate`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		credentials: "include",
		body: JSON.stringify({ id: "your_user_id_here" }),  // À remplacer par l'ID utilisateur approprié
	});

	if (!response.ok) {
		const errorMessage = await response.text();
		const error = new Error(errorMessage) as any;
		error.statusCode = response.status;
		throw error;
	}

	const data = await response.json();
	return data;
};


export const updatePlayerPseudoApi = async (newPseudo: string) => {
	const token = document.cookie
		.split("; ")
		.find((row) => row.startsWith("jwt_token="))
		?.split("=")[1];
	if (!token) {
		const error = new Error("Token is not available") as any;
		error.statusCode = 401; // Utilisation de 401 pour indiquer une erreur d'authentification
		throw error;
	}

	const response = await fetch(`${import.meta.env['VITE_API_URL']}/players/pseudo`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
			Authorization: `Bearer ${token}`,
		},
		credentials: "include",
		body: JSON.stringify({ pseudo: newPseudo }),
	});

	let responseData: any;

	if (response.headers.get("content-type")?.includes("application/json")) {
		responseData = await response.json();

		if (!response.ok) {
			const error = new Error as any;
			error.statusCode = response.status;
			error.message = responseData.message;
			if (response.status === 409) {
				error.message = "This pseudo is already taken!";
			}
			throw error;
		}
		return responseData;
	}
};


export const updatePlayerPhotoApi = async (newPic: string) => {
	const response = await fetch(`${import.meta.env['VITE_API_URL']}/players/photo`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
		},
		credentials: 'include', // s’assure que les cookies sont envoyés avec la requête
		body: JSON.stringify({ urlPhotoProfile: newPic }),
	});


	if (!response.ok) {
		const error = new Error as any;
		error.statusCode = response.status;
		error.message = await response.text();
		throw error;
	}

	const updatedPlayer = await response.json();
	return updatedPlayer;

};

export const getDataByPseudoApi = async (pseudo: string) => {
	const response = await fetch(`${import.meta.env['VITE_API_URL']}/players/${pseudo}`, {
		method: 'GET',
		headers: { 'Accept': 'application/json' },
		credentials: 'include',
	});

	if (!response.ok) {
		const error = new Error as any;
		error.statusCode = response.status;
		error.message = await response.text();
		throw error;
	}

	const playerData = await response.json();
	return playerData;
};