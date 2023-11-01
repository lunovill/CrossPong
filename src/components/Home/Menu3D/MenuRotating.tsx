import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { useThree } from "@react-three/fiber";
import chroma from "chroma-js";
import { useActualRefMenu, useMeshState, useRotationValue } from "../../ContextBoard";

type rotatingMenuProps = {
    children: React.ReactNode;
};

export function RotatingMesh({ children }: rotatingMenuProps) {

    const { rotation, setRotation, setNeedToRotate, needToRotate } = useRotationValue();
	
    const colorScale = chroma.scale(['#72979e', '#75729e', '#729e79', '#cc4242', '#8bbac9'])
    const groupRef = useRef<THREE.Group>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [lastY, setLastY] = useState<number | null>(null);
    const { camera, gl } = useThree();
    const [rotationSpeed, setRotationSpeed] = useState(0);
    const targetRotations = [1.245, 2.837, 4.39, 5.95];
    const { meshRefs } = useMeshState();
    const tabRef = [meshRefs.Play, meshRefs.AboutUS, meshRefs.ChatBox, meshRefs.Profile]
    const { setActualRef } = useActualRefMenu();
    const [toRotate, setToRotate] = useState<number | null>(null);

    const updateBackgroundColor = () => {
        if (groupRef.current) {
            const rotationValue = groupRef.current.rotation.x % (Math.PI * 2);
            const normalizedRotationValue = rotationValue / (Math.PI * 2);
            const color = colorScale(normalizedRotationValue).hex();
            document.body.style.backgroundColor = color;
        }
    };

    const handleWheelEvent = (e: WheelEvent) => {
        if (groupRef.current) {
            const delta = e.deltaY;
            groupRef.current.rotation.x += delta * 0.01;
            groupRef.current.rotation.x = groupRef.current.rotation.x % (2 * Math.PI);
        }
    };

    useEffect(() => {
        const handleMouseDown = () => setIsDragging(true);
        const handleMouseUp = () => setIsDragging(false);
        const handleMouseLeave = () => setIsDragging(false);

		gl.domElement.addEventListener('wheel', handleWheelEvent, { passive: true });
        gl.domElement.addEventListener('mousedown', handleMouseDown);
        gl.domElement.addEventListener('mouseup', handleMouseUp);
        gl.domElement.addEventListener('mouseleave', handleMouseLeave);
        return () => {
            gl.domElement.removeEventListener('wheel', handleWheelEvent);
            gl.domElement.removeEventListener('mousedown', handleMouseDown);
            gl.domElement.removeEventListener('mouseup', handleMouseUp);
            gl.domElement.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [gl.domElement]);

    useFrame((state) => {
        if (groupRef.current!.rotation.x !== rotation && needToRotate === true) {
            setNeedToRotate(false);
            setToRotate(rotation);
            targetRotations.map((target, index) => {
                if (target === rotation) {
                    setActualRef(tabRef[index]);
                }
            })
            updateBackgroundColor();
            setToRotate(rotation);
        }
        else if (toRotate !== 0 && toRotate !== null) {
            const currentRotation = groupRef.current!.rotation.x % (2 * Math.PI);
            const targetRotation = toRotate % (2 * Math.PI);

            // Calcul des distances pour les deux directions
            const clockwiseDistance = (targetRotation - currentRotation + 2 * Math.PI) % (2 * Math.PI);
            const counterClockwiseDistance = (currentRotation - targetRotation + 2 * Math.PI) % (2 * Math.PI);

            let newSpeed;
            if (clockwiseDistance < counterClockwiseDistance) {
                newSpeed = 0.1;
            } else {
                newSpeed = -0.1;
            }
            setRotationSpeed(newSpeed);
            let newRotation = currentRotation + rotationSpeed;
            // Condition pour arrêter la rotation
            if (Math.abs(newRotation - targetRotation) < 0.1) {
                newRotation = targetRotation;
                setRotationSpeed(0);
                setRotation(newRotation);
                setToRotate(null);
            }
            newRotation = newRotation % (2 * Math.PI);
            if (newRotation < 0) {
                newRotation += 2 * Math.PI;
            }
            groupRef.current!.rotation.x = newRotation;
            updateBackgroundColor();
        }
        else if (isDragging && lastY !== null) {
            const deltaY = state.mouse.y - lastY;
            if (groupRef.current) {
                const newRotationX = groupRef.current.rotation.x - deltaY * 3;
                if (newRotationX < 0)
                    groupRef.current.rotation.x = 2 * Math.PI - newRotationX % (Math.PI * 2);
                else
                    groupRef.current.rotation.x = newRotationX % (Math.PI * 2);
                updateBackgroundColor();
            }
        }
        else if (!isDragging && groupRef.current && rotation !== groupRef.current.rotation.x && toRotate === null) {
            const closestTarget = targetRotations.reduce((prev, curr) =>
                Math.abs(curr - groupRef.current!.rotation.x % (Math.PI * 2)) <
                    Math.abs(prev - groupRef.current!.rotation.x % (Math.PI * 2))
                    ? curr
                    : prev
            );
            const newSpeed = Math.sign(closestTarget - groupRef.current.rotation.x) * 0.05;
            setRotationSpeed(newSpeed);
            let newRotation = groupRef.current.rotation.x + rotationSpeed;
            if (Math.abs(newRotation - closestTarget) < 0.1) {
                targetRotations.map((target, index) => {
                    if (target === closestTarget) {
                        setActualRef(tabRef[index]);
                    }
                })
                newRotation = closestTarget;
                setRotationSpeed(0); // Arrêter la rotation
                setRotation(groupRef.current!.rotation.x);
            }
            if (newRotation < 0) {
                groupRef.current.rotation.x = 2 * Math.PI - newRotation % (Math.PI * 2);
            } else {
                groupRef.current.rotation.x = newRotation % (Math.PI * 2);
            }
            updateBackgroundColor();
        }
        setLastY(state.mouse.y);
    });

    return (
        <group ref={groupRef}>
            {children}
        </group>
    );
}