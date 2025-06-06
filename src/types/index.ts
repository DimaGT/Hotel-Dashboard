export type RequestType = "CLEANING" | "TOWELS" | "LATE_CHECKOUT" | "ROOM_SERVICE" | "MAINTENANCE" | "OTHER";
export type RequestStatus = "PENDING" | "IN_PROGRESS" | "DONE";

export type Request = {
  id: string;
  guestName: string;
  requestType: RequestType;
  status: RequestStatus;
  createdAt: string;
  hotelId: string;
};

export type Hotel = {
  id: string;
  name: string;
};

export type ApiResponse<T> = {
  data: T[];
  error?: string;
}; 