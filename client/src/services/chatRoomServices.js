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

export async function getRooms(qs) {
  const filter = qs && qs.room ? qs.room : "";
  const rooms = await http.get(apiEndpoint + `/?room=${filter}`);
  console.log(rooms);
  return rooms;
}

export async function getRoom(roomId) {
  const room = await http.get(apiEndpoint + `${roomId}`);
  return room;
}
