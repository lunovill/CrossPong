import Bot from "./Bot";
import { PADDLE_HEIGHT, PADDLE_POSITION } from "../../game.constants";

export default class NinjaBot extends Bot {
    constructor() {
        super();
    }

    public handlePowerEvent(): void {
        if (this.predict.type === 'paddle' && this.ballVelocity[0] > 0 && Math.abs(this.ballVelocity[1]) > 0.5)
            this.key.power = true;
        else
            this.key.power = false;
        return;  
    }

    public handleUltiEvent(): void {
        this.key.ulti = false;
        if (this.ballVelocity[0] > 0
            && this.ballPosition[0] > PADDLE_POSITION - 1
            && Math.abs(this.ballPosition[1] - this.botPosition[1]) > PADDLE_HEIGHT - 0.2)
            this.key.ulti = true; 
        return; 
    }
}