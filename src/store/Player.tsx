import { MapObject, mapsAssets } from '../data/models/MapObject';
import { MapProps, BallProps, PaddleProps } from '../types/Map';

export type Position = { x: number, y: number, z: number };

interface PlayerProps {
    id: string;
    name: string;
};

export class Player {
    public id: string;
    public name: string;
    public location?: -1 | 1;
    public score: number;
    public power: {
        start: number,
        time: number,
        cooldown: number,
    };
    public ulti: boolean;
    public canUseUlti: boolean;
    public mapInfo: MapObject;

    constructor(props: PlayerProps) {
        this.id = props.id;
        this.name = props.name;
        this.score = 0;
        this.ulti = false;
        this.canUseUlti = true;
        this.power = {
            start: 0,
            time: 0,
            cooldown: 0
        } 
        this.mapInfo = mapsAssets['medieval'];
    };

    public Map(): (props: MapProps) => JSX.Element {
        return this.mapInfo.JsxMap;
    };

    public Paddle(): (props: PaddleProps) => JSX.Element {
        return this.mapInfo.JsxPaddle;
    };

    public Ball(): (props: BallProps) => JSX.Element {
        return this.mapInfo.JsxBall;
    };
};