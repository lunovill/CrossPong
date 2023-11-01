import { mapName, MapInfo, MapsAssets, MapProps, BallProps, PaddleProps } from '../../types/Map';
import { MapTheme } from '../../types/machine';
import MedievalBall from '../../components/GLBtoJSX/Balls/MedievalBall';
import WesternBall from '../../components/GLBtoJSX/Balls/WesternBall';
import NinjaBall from '../../components/GLBtoJSX/Balls/NinjaBall';
import RetroBall from '../../components/GLBtoJSX/Balls/RetroBall';
import MedievalMap from '../../components/GLBtoJSX/Maps/MedievalMap';
import NinjaMap from '../../components/GLBtoJSX/Maps/NinjaMap';
import RetroMap from '../../components/GLBtoJSX/Maps/RetroMap';
import MedievalPaddle from '../../components/GLBtoJSX/Paddles/MedievalPaddle';
import WesternPaddle from '../../components/GLBtoJSX/Paddles/WesternPaddle';
import NinjaPaddle from '../../components/GLBtoJSX/Paddles/NinjaPaddle';
import RetroPaddle from '../../components/GLBtoJSX/Paddles/RetroPaddle';
import WesternMap from '../../components/GLBtoJSX/Maps/WesternMap';


export class MapObject {
    id: MapTheme;
    mapName: mapName;

    previewImagePath: string;
    font: string;
    mainColor: string;
    secondaryColor: string;
    JsxMap: (props: MapProps) => JSX.Element;
    JsxBall: (props: BallProps) => JSX.Element;
    JsxPaddle: (props: PaddleProps) => JSX.Element;

    constructor(props: MapInfo) {
        this.id = props.id;
        this.previewImagePath = props.previewImagePath;
        this.mapName = props.mapName;
        this.font = props.font;
        this.mainColor = props.mainColor;
        this.secondaryColor = props.secondaryColor;
        this.JsxMap = props.mapJSX;
        this.JsxPaddle = props.paddleJSX;
        this.JsxBall = props.ballJSX;
    }
};

const medieval: MapInfo = {
    id: 'medieval',
    previewImagePath: 'images/previewMap/medievalPreviewWithStickers.png',
    mapName: 'Chivalry\'s Last Stand',
    font: 'Redfighter',
    mainColor: '#47BCFF',
    secondaryColor: '#882178',
    mapJSX: MedievalMap,
    ballJSX: MedievalBall,
    paddleJSX: MedievalPaddle
};

const western: MapInfo = {
    id: 'western',
    previewImagePath: 'images/previewMap/westernPreviewWithStickers.png',
    mapName: 'Cactus Canyon',
    font: 'Albertson',
    mainColor: '#FEB64A',
    secondaryColor: '#165C5D',
    mapJSX: WesternMap,
    ballJSX: WesternBall,
    paddleJSX: WesternPaddle
};

const ninja: MapInfo = {
    id: 'ninja',
    previewImagePath: 'images/previewMap/ninjaPreviewWithStickers.png',
    mapName: 'Temple of the Silent Kunoichi',
    font: 'Aasianninja',
    mainColor: '#FFAE61',
    secondaryColor: '#CD5050',
    mapJSX: NinjaMap,
    ballJSX: NinjaBall,
    paddleJSX: NinjaPaddle
};

const retro: MapInfo = {
    id: 'retro',
    previewImagePath: 'images/previewMap/retroPreviewWithStickers.png',
    mapName: 'Pixel Purgatory',
    font: 'Yoster',
    mainColor: '#C39253',
    secondaryColor: '#215B33',
    mapJSX: RetroMap,
    ballJSX: RetroBall,
    paddleJSX: RetroPaddle
};

export const mapsAssets: MapsAssets = {
    medieval: new MapObject(medieval),
    western: new MapObject(western),
    ninja: new MapObject(ninja),
    retro: new MapObject(retro)
};