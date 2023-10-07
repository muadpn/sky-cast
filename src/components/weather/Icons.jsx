// import {
//     // FaSun,
//     FaCloudSunRain,
//     FaCloudMoonRain,
//     FaCloudBolt,
//     FaSun,
// } from 'react-icons/fa'
import {
    BsFillCloudSunFill,
    BsFillCloudMoonFill,
    BsCloudsFill,
    BsFillCloudRainHeavyFill
} from 'react-icons/bs'
import {
    IoCloudSharp
} from 'react-icons/io'

import {
    TbSnowflake,

} from 'react-icons/tb'
import { RiMistFill } from 'react-icons/ri'
import { GiMoon } from 'react-icons/gi'

// export default IconData = {
//     "01d": (size) => <FaSun size={size} />,
//     "01n": (size) => <GiMoon size={size} />,
//     "02d": (size) => <BsFillCloudSunFill size={size} />,
//     "03d": (size) => <IoCloudSharp size={size} />,
//     "03n": (size) => <IoCloudSharp size={size} />,
//     "04d": (size) => <BsCloudsFill size={size} />,
//     "04n": (size) => <BsCloudsFill size={size} />,
//     "09d": (size) => <BsFillCloudRainHeavyFill size={size} />,
//     "09n": (size) => <BsFillCloudRainHeavyFill size={size} />,
//     "10d": (size) => <FaCloudSunRain size={size} />,
//     "10n": (size) => <FaCloudMoonRain size={size} />,
//     "11d": (size) => <FaCloudBolt size={size} />,
//     "11n": (size) => <FaCloudBolt size={size} />,
//     "13d": (size) => <TbSnowflake size={size} />,
//     "13n": (size) => <TbSnowflake size={size} />,
//     "50d": (size) => <RiMistFill size={size} />,
//     "50n": (size) => <RiMistFill size={size} />,
// }

export default function WeatherIcon({ code, size }) {
    let IconComponent = null;
    switch (code) {
        case "01d":
            IconComponent = FaSun;
            break;
        case "01n":
            IconComponent = GiMoon;
            break;
        case "02d":
            IconComponent = BsFillCloudSunFill;
            break;
        case "02n":
            IconComponent = BsFillCloudMoonFill;
            break;
        case "03d":
            IconComponent = IoCloudSharp;
            break;
        case "03n":
            IconComponent = IoCloudSharp;
            break;
        case "04d":
        case "04n":
            IconComponent = BsCloudsFill;
            break;
        case "09d":
        case "09n":
            IconComponent = BsFillCloudRainHeavyFill;
            break;
        case "10d":
            IconComponent = FaCloudSunRain;
            break;
        case "10n":
            IconComponent = FaCloudMoonRain;
            break;
        case "11d":
        case "11n":
            IconComponent = FaCloudBolt;
            break;
        case "13d":
        case "13n":
            IconComponent = TbSnowflake;
            break;
        case "50d":
        case "50n":
            IconComponent = RiMistFill;
            break;
        default:
            IconComponent = IoCloudSharp;
            break;
    }

    return (
        <div>
            {IconComponent && <IconComponent size={size} />}
        </div>
    );
};

