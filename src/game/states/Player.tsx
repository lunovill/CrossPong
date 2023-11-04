import { MapObject, mapsAssets } from '../../data/models/MapObject';
import { MapProps, BallProps, PaddleProps } from '../../types/Map';

export class Player {
    public score: number;
    public mapInfo: MapObject;

    constructor(public readonly id: string, public readonly name: string, public readonly location: -1 | 1) {
        this.score = 0;
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