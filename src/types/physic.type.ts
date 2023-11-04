import { Vec2 } from "p2-es";
import { MedievalSkillInfoProps } from "../game/physic/MedievalPaddle";
import { WesternSkillInfoProps } from "../game/physic/WesternPaddle";
import { NinjaSkillInfoProps } from "../game/physic/NinjaPaddle";
import { RetroSkillInfoProps } from "../game/physic/RetroPaddle";

export type Vector3 = { x: number, y: number, z: number };
export type SkillInfoProps = MedievalSkillInfoProps | WesternSkillInfoProps | NinjaSkillInfoProps | RetroSkillInfoProps;

export function formatTuple(tuple: Vec2): Vector3 {
    return {
        x: parseFloat(tuple[0].toFixed(2)),
        y: parseFloat(tuple[1].toFixed(2)),
        z: 0
    };
}