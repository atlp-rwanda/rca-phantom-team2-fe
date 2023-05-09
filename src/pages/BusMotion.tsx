import Navbar from "@/components/Navbar";
import { GoogleReactMap } from "@/components/GoogleMap/Map"

export default function BusMotion() {
    return (
        <div className="font-poppins h-screen flex flex-col">
            <div className="lg:px-10 px-5 pt-5 relative pb-5">
                <Navbar />
            </div>
            <div className="flex-1 flex justify-center items-center bg-gray-100">
                <GoogleReactMap
                    center={{
                        lat: 0,
                        lng: 30
                    }}
                    // markerIcon='/store-location-marker.svg'
                    markers={[{ lat: 0, lng: 30 }]}
                    options={{
                        panControl: false,
                        mapTypeControl: false,
                        fullscreenControl: false,
                        zoomControl: false
                    }}
                    zoom={12.5}
                ></GoogleReactMap>
            </div>
        </div>
    );
}