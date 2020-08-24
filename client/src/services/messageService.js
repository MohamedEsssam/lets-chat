import http from "./httpService";
const apiEndpoint = "http://localhost:8000/api/room/";

export async function create(data) {
  const message = await http.post(
    apiEndpoint + `${data.roomId}/messages`,
    data
  );
  return message;
}

export async function remove(data) {
  const message = await http.delete(apiEndpoint + `${data.roomId}/messages`, {
    data,
  });
  return message;
}

export async function getMessages(data) {
  const messages = await http.get(apiEndpoint + `${data.roomId}/messages`);
  return messages;
}

export async function getMessage(messageId) {
  const message = await http.get(apiEndpoint + `${messageId}`);
  return message;
}
