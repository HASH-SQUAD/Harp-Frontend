import React, { useCallback, useEffect, useState } from 'react';
import Marker from 'assets/image/Marker.svg';

// 파일
import * as _ from './style';

declare global {
  interface Window {
    kakao: any;
  }
}

interface MiniMapProps {
  keyword: string;
}

interface Place {
  x: string;
  y: string;
  place_name: string;
}

const MiniMap = ({ keyword }: MiniMapProps) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const searchPlace = useCallback(() => {
    if (!keyword) {
      setErrorMessage('검색 키워드를 입력해 주세요.');
      return;
    }

    const container = document.getElementById('map');
    if (!container) {
      setErrorMessage('지도를 표시할 컨테이너가 없습니다.');
      return;
    }

    const options = {
      center: new window.kakao.maps.LatLng(37.5665, 126.978),
      level: 2
    };

    const map = new window.kakao.maps.Map(container, options);

    const ps = new window.kakao.maps.services.Places();
    ps.keywordSearch(keyword, (data: Place[], status: string) => {
      if (status === window.kakao.maps.services.Status.OK && data.length > 0) {
        const place = data[0];
        const location = new window.kakao.maps.LatLng(place.y, place.x);

        map.setCenter(location);

        const imageSize = new window.kakao.maps.Size(30, 37);
        const markerImage = new window.kakao.maps.MarkerImage(
          Marker,
          imageSize
        );
        const marker = new window.kakao.maps.Marker({
          map: map,
          position: location,
          image: markerImage
        });

        const infoWindow = new window.kakao.maps.InfoWindow({
          content: `<div style="padding:5px; font-size:15px;">${place.place_name}</div>`
        });

        infoWindow.open(map, marker);

        setErrorMessage(null);
      } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
        console.error('해당 키워드에 대한 결과가 없습니다.');
        setErrorMessage('해당 키워드에 대한 결과가 없습니다.');
      } else {
        console.error('지도 데이터를 로드하는 중 오류가 발생했습니다.');
        setErrorMessage('지도 데이터를 로드하는 중 오류가 발생했습니다.');
      }
    });
  }, [keyword]);

  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      searchPlace();
    } else {
      setErrorMessage('카카오 맵 스크립트 로드에 실패했습니다.');
    }
  }, [searchPlace]);

  return (
    <>
      <_.MiniMap_Layout id="map" />
      {errorMessage && <_.MiniMap_Error>{errorMessage}</_.MiniMap_Error>}
    </>
  );
};

export default MiniMap;
