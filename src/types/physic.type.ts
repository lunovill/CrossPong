import { Vec2 } from "p2-es";

export type Vector3 = { x: number, y: number, z: number };

export function formatTuple(tuple: Vec2): Vector3 {
    return {
        x: parseFloat(tuple[0].toFixed(2)),
        y: parseFloat(tuple[1].toFixed(2)),
        z: 0
    };
}