import Bot from "./Bot";

export default class WesternBot extends Bot {
    constructor() {
        super();
    }

    public handlePowerEvent(): void {
        this.key.power = false;
        if (this.predict.type === 'limit' && this.ballPosition[0] > 4.95)
            this.key.power = true;
        return;
    }

    public handleUltiEvent(): void {
        this.key.ulti = false;
        if (Math.abs(this.ballVelocity[0] + this.ballVelocity[1]) > 13)
            this.key.ulti = true;
        return;
    }
}