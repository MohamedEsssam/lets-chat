import http from "./httpService";
const apiEndpoint = "http://localhost:8000/api/room/";

export async function create(data) {
  const room = await http.post(apiEndpoint + "", data);
  return room;
}

export async function update(data) {
  const room = await http.put(apiEndpoint + "", data);
  return room;
}

export async function remove(data) {
  const room = await http.delete(apiEndpoint + "", { data });
  return room;
}

export async function getRooms() {
  const rooms = await http.get(apiEndpoint + "");
  console.log(rooms);
  return rooms;
}

export async function getRoom(roomId) {
  const room = await http.get(apiEndpoint + `${roomId}`);
  return room;
}
