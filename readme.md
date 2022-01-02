# Web socket을 이용한 Zoom Clone Coding with Nomad Coder

## Stack

- Backend : node.js

- Frontend: pug, Vanilla Javascript

## deploy URL

https://whispering-meadow-84241.herokuapp.com

## web video, audio method

```js
let myStream;
const getMedia = async () => {
  try {
    myStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    myFace.srcObject = myStream;
  } catch (e) {
    console.log(e);
  }
};
```

Navigator.mediaDevices

- 카메라, 마이크, 화면 공유와 같이 현재 연결된 미디어 입력 장치에 접근할 수 있는 MediaDevices 객체를 반환

getUserMedia

- 사용자에게 권한을 요청한 후, 시스템의 카메라와 오디오 각각 혹은 모두 활성화하여, 장치의 입력 데이터를 비디오/오디오 트랙으로 포함한 MediaStream (en-US)을 반환합니다. async await try catch문을 사용해야 한다

getAudioTracks

- 스트림의 오디오 트랙을 나타내는 객체 MediaStream 시퀀스, 배열 구조

getVideoTracks

- 스트림의 비디오 트랙을 나타내는 객체 MediaStream 시퀀스, 배열 구조

## webRTC

- peer-to-peer communication, 사용자 브라우저 간 통신이 가능
- My info(ip주소, port 넘버) <-----> Server <-----> yourInfo(ip주소, port 넘버) 위치 관련 정보만 전송
- 영상과 오디오처리는 나와 상대방 브라우저끼리만 직접 전달

<br />

### webRTC signaling map

![1_hQHzaT-JB1Wx3y0qtQX8Kw](https://user-images.githubusercontent.com/44824320/147873478-beac6d46-aff1-4382-8146-913bcaca8863.png)
