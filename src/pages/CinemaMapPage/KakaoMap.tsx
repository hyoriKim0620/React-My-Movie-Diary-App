import { useEffect, useState } from "react";
import { CustomOverlayMap, Map, MapMarker } from "react-kakao-maps-sdk";
import { useAppSelector } from "../../hooks/redux";
import { MapContainer } from "./cinema.styles";

const KakaoMap = () => {
  const { searchCinema } = useAppSelector((state) => state.cinema);
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      if (searchCinema[0]) {
        setLat(searchCinema[0].latlng.lat);
        setLng(searchCinema[0].latlng.lng);
      }
    }, 100);
  }, [searchCinema]);

  if (searchCinema.length > 0) {
    return (
      <Map
        center={{
          lat: lat,
          lng: lng,
        }}
        style={{ width: "100%", height: "100%", zIndex: 0 }}
        level={3} // 지도 확대 레벨
      >
        {/* 마커 여러개 표시 */}
        {searchCinema.map((loc, i) => (
          <div key={`${i}`}>
            <MapMarker
              position={loc.latlng}
              title={loc.cinema_name}
              image={{
                src: "/popcorn.png",
                size: { width: 45, height: 50 },
              }}
            />
            <CustomOverlayMap position={loc.latlng}>
              <div
                className="overlay"
                style={{
                  background: "#fff",
                  borderRadius: "5px",
                  padding: "2px 3px",
                  fontSize: "12px",
                  fontWeight: "bold",
                }}
              >
                {loc.cinema_name}
              </div>
            </CustomOverlayMap>
          </div>
        ))}
      </Map>
    );
  } else {
    return (
      <MapContainer>
        <div>
          <img src="/base_bee.png" alt="empty-cinema-image" width={"120px"} />
          <div>검색하신 위치에 영화관이 없습니다.</div>
          <div>다시 검색해주세요.</div>
        </div>
      </MapContainer>
    );
  }
};

export default KakaoMap;
