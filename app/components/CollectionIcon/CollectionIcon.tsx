import {
  LuSave,
  LuAppWindow,
  LuAlarmClock,
  LuAlbum,
  LuArchive,
  LuBackpack,
  LuBaggageClaim,
  LuBeef,
  LuCar,
  LuCat
} from "react-icons/lu";

const iconSizes = {
  xs: 16,
  sm: 32,
  md: 64,
  lg: 128,
  xl: 256,
} as const;

type SizeKeys = keyof typeof iconSizes;

const getIcon = (icon: string, sizeKey?: SizeKeys, color?: string) => {
  const pixelSize = sizeKey ? iconSizes[sizeKey] : undefined;

  switch (icon) {
    case 'LuSave': return <LuSave size={pixelSize} stroke={color} />;
    case 'LuAppWindow': return <LuAppWindow size={pixelSize} stroke={color} />;
    case 'LuAlarmClock': return <LuAlarmClock size={pixelSize} stroke={color} />;
    case 'LuAlbum': return <LuAlbum size={pixelSize} stroke={color} />;
    case 'LuArchive': return <LuArchive size={pixelSize} stroke={color} />;
    case 'LuBackpack': return <LuBackpack size={pixelSize} stroke={color} />;
    case 'LuBaggageClaim': return <LuBaggageClaim size={pixelSize} stroke={color} />;
    case 'LuBeef': return <LuBeef size={pixelSize} stroke={color} />;
    case 'LuCar': return <LuCar size={pixelSize} stroke={color} />;
    case 'LuCat': return <LuCat size={pixelSize} stroke={color} />;
    default: return <LuSave size={pixelSize} stroke={color} />;
  }
}

interface CollectionIconProps {
  icon: string;
  size?: SizeKeys;
  color?: string;
}

export function CollectionIcon({ icon, size, color }: CollectionIconProps) {
  return getIcon(icon, size, color ?? "currentColor");
}