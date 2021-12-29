# Web socket을 이용한 Zoom Clone Coding with Nomad Coder

## socketIO

- socketIO는 websocket의 부가 기능이 아님
- socketIO는 프론트엔드와 백엔드 간 실시간 통신을 가능케 하는 프레임 워크
- websocket도 실시간 기능을 제공하지만, socketIO는 실시간 기능을 더 쉽게 만드는 코드를 제공
- socketIO가 websocket를 이용하여 연결에 실패 하더라도 다른 방법으로 재연결을 시도함, 신뢰성과 빠른 속도 제공
- 하지만 많은 기능들을 제공해 주기 떄문에 websocket보다 많이 무거움
- localhost:3000/socket.io/socket.io.js의 정보를 client에게 넘겨준다.

## Stack

- Backend : node.js

- Frontend: pug, Vanilla Javascript

## deploy URL

https://whispering-meadow-84241.herokuapp.com
