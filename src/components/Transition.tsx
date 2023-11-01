const transition = (OgComponent: React.FC) => {
    return (props: any) => (
        <>
            <OgComponent {...props} /> 
        </>
    )
}

export default transition;

// Utilisez une fonction qui retourne directement du JSX lorsque vous définissez un composant 
// standard qui n'a pas besoin de variations ou de comportements supplémentaires.

// Utilisez une fonction qui retourne une fonction qui retourne du JSX (fonction d'ordre supérieur) 
// lorsque vous souhaitez encapsuler une logique réutilisable ou créer des composants qui peuvent être modifiés ou étendus de manière flexible.