const Lights = () => {
    return (
        //changer la couleur du pointLight selon le theme?
        <>
            <directionalLight position={[9, 9, 4]} intensity={4.5} color={"#f2d5d3"} />
            <ambientLight intensity={1} />
			<ambientLight intensity={0.5} color={"#2abccf"} />
            <pointLight position={[2, 2, 2]} intensity={4} color={"white"} /> 
			<directionalLight position={[0, 0, 4]} intensity={1.5} color={"#f2d5d3"} />
        </>
    )
}

export default Lights