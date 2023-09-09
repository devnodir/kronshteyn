import { useQuery, UseQueryOptions } from "react-query";
import api from "@/utils/api";

const useApi = <Data = any, Error = any>(url = "", options: UseQueryOptions<Data, Error> = {}, params: object = {}) =>
	//@ts-ignore
	useQuery({
		queryKey: [url, { ...params }],
		queryFn: () => api.get<Data, Error>(url, { params }),
		...options,
	});
export default useApi;