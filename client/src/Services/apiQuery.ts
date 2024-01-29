import { FieldValues } from "react-hook-form";
import apiClient from "./apiClient";

export const getSession = async () => {
  return await apiClient.get("/auth/session");
};

export const login = async (body: FieldValues) => {
  return await apiClient.post("/auth/login", body);
};

export const loggingOut = async () => {
  return await apiClient.get("/auth/logout");
};

export const register = async (body: FieldValues) => {
  return await apiClient.post("/auth/register", body);
};

export const forgotPassword = async (body: FieldValues) => {
  return await apiClient.post("/auth/forgotpassword", body);
};

export const checkResetToken = async (emailToken: string) => {
  return await apiClient.get(`/auth/checkToken/${emailToken}`);
};

export const getShipments = async () => {
  return await apiClient.get("/shipment");
};
export const getShipmentsByOwnerID = async (ownerID: string) => {
  return await apiClient.get(`/shipment/${ownerID}`);
};

export const getShipmentByWaybill = async (waybill: string) => {
  return await apiClient.get(`/shipment/waybill/${waybill}`);
};

export const getUsers = async () => {
  return await apiClient.get("/user");
};

export const updateShipmentByID = async (id: number, body: Shipments) => {
  return await apiClient.put(`/shipment/${id}`, body);
};

export const filterShipments = async (body: Shipmentfitler) => {
  return await apiClient.post("/shipment/filter", body);
};

export const filterUsers = async (body: Userfilter) => {
  return await apiClient.post("/user/filter", body);
};

export const filterShipmentsByUserID = async (
  ownerID: string,
  body: Shipmentfitler
) => {
  return await apiClient.post(`/shipment/filter/${ownerID}`, body);
};

export const createShipment = async (
  data: FieldValues,
  secureUrl: string,
  authData: AuthData | null
) => {
  const response = await apiClient.post("/shipment", {
    ...data,
    shipment_image: secureUrl,
    owner_id: authData?.id,
  });

  return response;
};

export const sendWaybillRequest = async (body: Shipments) => {
  return await apiClient.post("/request/waybill", body);
};

export const sendResetEmail = async (body: FieldValues) => {
  return await apiClient.post("/request/reset", body);
};

export const verifySentData = async (body: FieldValues) => {
  return await apiClient.post("/request/verifySent", body);
};

export const changePassword = async (emailToken: string, body: FieldValues) => {
  return await apiClient.post(`/auth/changepassword/${emailToken}`, body);
};
