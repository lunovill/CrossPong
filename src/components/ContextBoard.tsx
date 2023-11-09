import { createContext, useContext, useRef } from "react";
import { useState } from 'react';
import { Group, Mesh } from "three";

// LoadingContext

export const LoadingContext = createContext<String | undefined | null>(undefined);

export function useLoadingState() {
	const context = useContext(LoadingContext);
	if (!context) {
		throw new Error('useLoadingState must be used within a LoadingProvider');
	}
	return context;
}


//Mesh Refs

type MeshRefsType = {
	group_menu: React.RefObject<Group>;
	AboutUS: React.RefObject<Mesh>;
	Profile: React.RefObject<Mesh>;
	Github: React.RefObject<Mesh>;
	Play: React.RefObject<Mesh>;
	Position: number
	// ajoutez d'autres refs ici
};

type MeshContextType = {
	meshRefs: MeshRefsType;
	setMeshRefs: React.Dispatch<React.SetStateAction<MeshRefsType>>;
};

export const MeshContext = createContext<MeshContextType | undefined>(undefined);

type MeshProviderProps = {
	children: React.ReactNode;
};
export const MeshProvider = ({ children }: MeshProviderProps) => {
	const group_menuRef = useRef<Group>(null);
	const aboutUsRef = useRef<Mesh>(null);
	const profileRef = useRef<Mesh>(null);
	const githubRef = useRef<Mesh>(null);
	const playRef = useRef<Mesh>(null);

	const [meshRefs, setMeshRefs] = useState<MeshRefsType>({
		group_menu: group_menuRef,
		AboutUS: aboutUsRef,
		Profile: profileRef,
		Github: githubRef,
		Play: playRef,
		Position: 0
	});

	return (
		<MeshContext.Provider value={{ meshRefs, setMeshRefs }}>
			{children}
		</MeshContext.Provider>
	);
};

export function useMeshState() {
	const context = useContext(MeshContext);
	if (!context) {
		throw new Error('useMeshState must be used within a MeshProvider');
	}
	return context;
}

// ActualRefMenu

type ActualRefMenuType = {
	actualRef: React.RefObject<Mesh>;
	setActualRef: React.Dispatch<React.SetStateAction<React.RefObject<Mesh>>>;
};

export const ActualRefMenu = createContext<ActualRefMenuType | undefined>(undefined);

export function useActualRefMenu() {
	const context = useContext(ActualRefMenu);
	if (!context) {
		throw new Error('useActualRefMenu must be used within a ActualRefMenuProvider');
	}
	return context;
}



//ActualRotationMenu

type rotationMenuType = {
	rotation: number;
	setRotation: React.Dispatch<React.SetStateAction<number>>;
	needToRotate: boolean;
	setNeedToRotate: React.Dispatch<React.SetStateAction<boolean>>;
};

const RotationContext = createContext<rotationMenuType | undefined>(undefined);


export const useRotationValue = () => {
	const context = useContext(RotationContext);
	if (!context) {
		throw new Error('useRotationValue must be used within a RotationProvider');
	}
	return context;
};

interface inGameContextType {
	setInGame: React.Dispatch<React.SetStateAction<boolean>>;
	inGame: boolean;
}

export const inGameContext = createContext<inGameContextType | null>(null);

export function useInGameState() {
	const context = useContext(inGameContext);
	if (!context) {
		throw new Error('useinGameState must be used within a inGameProvider');
	}
	return context;
}

type RotationProviderProps = {
	children: React.ReactNode;
};
export const RotationProvider = ({ children }: RotationProviderProps) => {
	const [rotation, setRotation] = useState<number>(1.245);
	const [needToRotate, setNeedToRotate] = useState<boolean>(false);
	return (
		<RotationContext.Provider value={{ rotation, setRotation, needToRotate, setNeedToRotate }}>
			{children}
		</RotationContext.Provider>
	);
};