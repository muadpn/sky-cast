
import {
    BsFillCloudSunFill,
    BsFillCloudMoonFill,
    BsCloudsFill,
    BsFillCloudRainHeavyFill
} from 'react-icons/bs'
import { FaCloudMoonRain, FaCloudSunRain, FaSun } from 'react-icons/fa'
import {
    IoCloudSharp
} from 'react-icons/io5'

import {
    TbSnowflake,
} from 'react-icons/tb'
import { RiMistFill } from 'react-icons/ri'
import { GiMoon } from 'react-icons/gi'
import { FaCloudBolt } from 'react-icons/fa6'

const iconMap = {
    A01d: (size) => { return (<FaSun size={size} />) },
    A01n: (size) => { return (<GiMoon size={size} />) },
    A02d: (size) => { return (<BsFillCloudSunFill size={size} />) },
    A02n: (size) => { return (<BsFillCloudMoonFill size={size} />) },
    A03d: (size) => { return (<IoCloudSharp size={size} />) },
    A03n: (size) => { return (<IoCloudSharp size={size} />) },
    A04d: (size) => { return (<BsCloudsFill size={size} />) },
    A04n: (size) => { return (<BsCloudsFill size={size} />) },
    A09d: (size) => { return (<BsFillCloudRainHeavyFill size={size} />) },
    A09n: (size) => { return (<BsFillCloudRainHeavyFill size={size} />) },
    A10d: (size) => { return (<FaCloudSunRain size={size} />) },
    A10n: (size) => { return (<FaCloudMoonRain size={size} />) },
    A11d: (size) => { return (<FaCloudBolt size={size} />) },
    A11n: (size) => { return (<FaCloudBolt size={size} />) },
    A13d: (size) => { return (<TbSnowflake size={size} />) },
    A13n: (size) => { return (<TbSnowflake size={size} />) },
    A50d: (size) => { return (<RiMistFill size={size} />) },
    A50n: (size) => { return (<RiMistFill size={size} />) },
};

// reloads the icons and render based on the code. Should Pass-in |A| before the Icon to Avoid Octal String Interceptions.
export default function WeatherIcon({ code, size }) {
    const IconComponent = iconMap[code]
    return (
        <div>
            {IconComponent(size)}
        </div>
    );
}