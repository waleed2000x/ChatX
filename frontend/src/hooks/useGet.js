import axios from "axios";

export default function useGet({ link }) {
  const response = axios.get(link);
  return response;
}
