import asyncio
import websockets
import json
from sketch import SketchGame

connected_clients = set()


async def handler(websocket: websockets.WebSocketServerProtocol):
    connected_clients.add(websocket)

    game = SketchGame()
    game.pick_word()
    print(game.current_word)

    while True:
        try:
            message = await websocket.recv()
            print(message)
            if game.current_word == message:
                print("Guessed correctly")
                game.leaderboard.add_score("jimmy", 100)
                game.pick_word()
                print(game.current_word)

            await websocket.send(message)
            await broadcast(json.dumps(message))
        except:  # noqa: E722
            break


async def broadcast(message):
    # Send message to all connected clients
    for client in connected_clients:
        await client.send(message)


async def main():
    async with websockets.serve(handler, "", 8001):
        await asyncio.Future()  # run forever


if __name__ == "__main__":
    asyncio.run(main())
