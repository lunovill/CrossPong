import { MAP_HEIGHT } from "../../game.constants";
import Bot from "./Bot";

export default class RetroBot extends Bot {
    constructor() {
        super();
    }

    public handlePowerEvent(): void {
        this.key.power = false;
        if (this.ballVelocity[0] < 0 && this.ballPosition[0] < 0
            && Math.abs(this.ballPosition[1] - this.playerPosition[1]) > MAP_HEIGHT / 4) {
            this.key.power = true;
        }
        return;
    }

    public handleUltiEvent(): void {
        this.key.ulti = false;
        if (Math.abs(this.ballVelocity[0] + this.ballVelocity[1]) > 13)
            this.key.ulti = true;
        return;
    }
}