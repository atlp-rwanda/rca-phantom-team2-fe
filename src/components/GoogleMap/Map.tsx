/* eslint-disable */

import React from "react";
import ReactDOMServer from "react-dom/server";
import { Wrapper } from "@googlemaps/react-wrapper";
import { createCustomEqual } from "fast-equals";
import {useNavigate} from "react-router-dom"
/**
 * 
 * @param {{
 *    zoom?: number, 
 *    center?: {lat: number, lng: number}, 
 *    markerIcon?: string, 
 *    markers?: {
 *      lat: number, 
 *      lng: number,
 *      tooltip?: string | JSX.Element
 *    }[],
 *    options?: object, 
 *    onClick?: Function<{lat, lng}>}, 
 *    onChange?: Function, 
 *    onGoogleApiLoaded?: Function
*      username?: string, 
*      sellerId?: string, 
*      
 * }} props Component props 
 * @returns 
 */
export const GoogleReactMap = ({
    zoom=3,
    center={lat: 0, lng: 0},
    markerIcon="",
    markers=[{lat: 1, lng: 1}],
    options={},
    onClick=({lat, lng})=> {},
    onChange=({ center, zoom, bounds })=> {},
    onGoogleApiLoaded=({ map, maps })=> {},
}) => {
    const _onClick = (latLng) => onClick(latLng.toJSON());

    const _onIdle = (map: any) => {};

    const render = (status: any) => {
        return <h1>{status}</h1>;
    };

    return (
        <Wrapper 
            apiKey={"AIzaSyAIXKaQCwh4ykDpciGnCtMecK7Ydtngirc"} 
            libraries={["geometry" , "places" , "marker"]} // , "drawing" , "localContext" , "visualization"
            render={render}
        >
            <Map
                center={center}
                onClick={_onClick}
                onIdle={_onIdle}
                zoom={zoom}
                style={{ width: "100%", height: "100%" }}
                markerIcon={markerIcon}
                options={options}
                onGoogleApiLoaded={onGoogleApiLoaded}
                onChange={onChange}
            >
                {markers.map((marker, index) => (
                    <Marker 
                        key={index} position={{lat: marker.lat, lng: marker.lng}} 
                        icon={markerIcon}
                        sellerId={marker.sellerId}
                        username={marker.username}
                        tooltip={marker.tooltip}
                    />
                ))}
            </Map>
        </Wrapper>
    );
};

let popup = null;

const Map = ({
    onClick,
    onIdle,
    children,
    style,
    onGoogleApiLoaded,
    onChange,
    ...options
}) => {
    const ref = React.useRef();
    const [map, setMap] = React.useState(null);

    React.useEffect(() => {
        if (ref.current && !map) {
            setMap(new window.google.maps.Map(ref.current, {}));
        }
    }, [ref, map]);

    // because React does not do deep comparisons, a custom hook is used
    // see discussion in https://github.com/googlemaps/js-samples/issues/946
    useDeepCompareEffectForMaps(() => {
        if (map) {
            map.setOptions(options);
        }
    }, [map, options]);

    React.useEffect(() => {
        if (map) {
            ["click", "idle"].forEach((eventName) =>
                google.maps.event.clearListeners(map, eventName)
            );

            if (onClick) {
                map.addListener("click", ({latLng})=> {
                    if (popup) popup.close();
                    onClick(latLng);
                });
            }

            if (onIdle) {
                map.addListener("idle", () => onIdle(map));
            }
            if(onChange){
                ["dblclick", "dragend"].forEach(eventName=> {
                    map.addListener(eventName, () => {
                        onChange({
                            center: map.center.toJSON(),
                            bounds: {
                                ...map.getBounds().toJSON(),
                                ne: map.getBounds().getNorthEast().toJSON(),
                                sw: map.getBounds().getSouthWest().toJSON()
                            },
                            zoom: map.getZoom()
                        });
                        
                    });
                });
            }
        }
    }, [map, onClick, onIdle]);

    React.useEffect(()=> {
        if(map && google.maps){
            onGoogleApiLoaded({
                map: map,
                maps: google.maps
            });
        }
    }, [map]);

    return (
        <>
            <div ref={ref} style={style} />
            {React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                    // set the map prop on the child component
                    return React.cloneElement(child, { map, onClick });
                }
            })}
        </>
    );
};

const Marker = (options) => {
    const [marker, setMarker] = React.useState(null);
    const navigate = useNavigate()
    
    React.useEffect(() => {
        if (!marker) {
            const mark = new google.maps.Marker({
                icon: options.icon || null,
                visible: true,
            });
            
            if(options.username || options.sellerId || options.tooltip){
                mark.addListener("click", (event) => {
                    if(options.tooltip){
                        popup = new google.maps.InfoWindow({
                            content: typeof options.tooltip === "string"? options.tooltip : ReactDOMServer.renderToString(<div>{options.tooltip}</div>)
                        });
                        popup.open(options.map, mark);
                    }else if(options.username || options.sellerId){
                        navigate(`/${options.username || options.sellerId}`);
                    }
                });
            }
            setMarker(mark);
        }
        return () => {
            if (marker) {
                marker.setMap(null);
            }
        };
    }, [marker]);

    React.useEffect(() => {
        if (marker) {
            marker.setOptions(options);
        }
    }, [marker, options]);

    return null;
};

const deepCompareEqualsForMaps = createCustomEqual(
    (deepEqual) => (a, b) => {
        if (a instanceof google.maps.LatLng || b instanceof google.maps.LatLng) {
            return new google.maps.LatLng(a).equals(new google.maps.LatLng(b));
        }

        // TODO extend to other types
        // use fast-equals for other objects
        return deepEqual(a, b);
    }
);

function useDeepCompareMemoize(value) {
    const ref = React.useRef();

    if (!deepCompareEqualsForMaps(value, ref.current)) {
        ref.current = value;
    }

    return ref.current;
}

function useDeepCompareEffectForMaps(callback, dependencies) {
    React.useEffect(callback, [callback]);
}
