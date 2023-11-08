import { Vec2 } from "p2-es";
import Bot from "./Bot";
import { MAP_HEIGHT, PADDLE_HEIGHT, PADDLE_POSITION } from "../../game.constants";

export default class MedievalBot extends Bot {
    constructor() {
        super();
    }

    private lineIntersection(lineStart: Vec2, lineEnd: Vec2, segmentStart: Vec2, segmentEnd: Vec2): boolean {
        const det = (a: Vec2, b: Vec2) =>
            a[0] * b[1] - a[1] * b[0];

        const direction1: Vec2 = [lineEnd[0] - lineStart[0], lineEnd[1] - lineStart[1]];
        const direction2: Vec2 = [segmentEnd[0] - segmentStart[0], segmentEnd[1] - segmentStart[1]];

        const detT = det(direction1, direction2);

        if (detT === 0) {
            // Les deux lignes sont parallèles, il n'y a pas d'intersection
            return false;
        }

        const distT: Vec2 = [segmentStart[0] - lineStart[0], segmentStart[1] - lineStart[1]];

        const t = det(distT, direction2) / detT;
        const u = det(distT, direction1) / detT;

        return t >= 0 && t <= 1 && u >= 0 && u <= 1;
    }

    public handlePowerEvent(): void {
        this.key.power = false;
        const center: Vec2 = [1, MAP_HEIGHT / 4];
        if (this.ballVelocity[0] > 0) {
            if (this.botPosition[1] < 0
                && (this.lineIntersection(
                    this.ballPosition,
                    this.predict.position,
                    [center[0] - 0.25, -center[1] - 0.25],
                    [center[0] - 0.25, -center[1] + 0.25])
                    || this.lineIntersection(
                        this.ballPosition,
                        this.predict.position,
                        [center[0] + 0.25, -center[1] - 0.25],
                        [center[0] + 0.25, -center[1] + 0.25]))) {
                this.key.power = true;
            } else if (this.botPosition[1] > 0
                && (this.lineIntersection(
                    this.ballPosition,
                    this.predict.position,
                    [center[0] - 0.25, center[1] - 0.25],
                    [center[0] - 0.25, center[1] + 0.25])
                    || this.lineIntersection(
                        this.ballPosition,
                        this.predict.position,
                        [center[0] + 0.25, center[1] - 0.25],
                        [center[0] + 0.25, center[1] + 0.25]))) {
                this.key.power = true;
            }
        } // TMP - else if (this.ballVelocity[1] < 0)
        return;
    }

    public handleUltiEvent(): void {
        this.key.ulti = false;
        if (this.ballVelocity[0] > 0
            && this.ballPosition[0] > PADDLE_POSITION - 1
            && Math.abs(this.ballPosition[1] - this.botPosition[1]) > PADDLE_HEIGHT + 0.5)
            this.key.ulti = true; 
        return;
    }
}