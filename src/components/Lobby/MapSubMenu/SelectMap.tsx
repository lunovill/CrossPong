import { useGame } from '../../../store/hooks/useGame';
import { MapTheme } from '../../../types/machine';
import MapInfo from './MapInfo';
import PreviewMap from './PreviewMap';
import SelectMapButton from './SelectMapButton';

type ButtonProps = {
    $left: number;
    $map: MapTheme;
    $icon_url: string;
}

const buttonsProps: ButtonProps[] = [
    {
        $left: 40,
        $map: MapTheme.MEDIEVAL,
        $icon_url: '/UI/icons_map/medieval_icon.png'
    },
    {
        $icon_url: '/UI/icons_map/western_icon.png',
        $left: 163,
        $map: MapTheme.WESTERN
    },
    {
        $icon_url: '/UI/icons_map/ninja_icon.png',
        $left: 286,
        $map: MapTheme.NINJA
    },
    {
        $icon_url: '/UI/icons_map/retro_icon.png',
        $left: 409,
        $map: MapTheme.RETRO
    }
]

function SelectMap() {
    const { context } = useGame();

    return (
        <>
			<MapInfo map={context.current!.mapInfo.id}/>
            <PreviewMap map={context.current!.mapInfo.id} />
            {buttonsProps.map((buttonProps) => (
                <SelectMapButton key={buttonProps.$map} {...buttonProps} />
            ))}
        </>
    )
}

export default SelectMap