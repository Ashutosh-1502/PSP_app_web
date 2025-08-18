import { env } from "@/env.mjs";
import { io, type Socket } from "socket.io-client";

const SOCKET_URL = env.NEXT_PUBLIC_SOCKET_CONNECTION_URL;

export const initSocket = (): Socket => {
    console.log(SOCKET_URL)
	return io(SOCKET_URL, {
		transports: ["websocket"],
		withCredentials: true,
	});
};

export const getSocket = () => {
    const socket = initSocket();
	if (!socket) throw new Error("Socket not initialized. Call initSocket first.");
	return socket;
};
