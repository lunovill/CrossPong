const transition = (OgComponent: React.FC) => {
    return (props: any) => (
        <>
            <OgComponent {...props} /> 
        </>
    )
}

export default transition;
