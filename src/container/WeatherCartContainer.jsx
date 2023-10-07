import WeatherLoadingSkelton from "@/components/weather/WeatherLoadingSkelton"
import WeatherReport from "@/components/weather/WeatherReport"
import { Suspense } from "react"


const WeatherCartContainer = () => {

    return (
        <Suspense fallback={<WeatherLoadingSkelton isLoaded={false} />}>
            <WeatherReport />
        </Suspense>

    )
}

export default WeatherCartContainer