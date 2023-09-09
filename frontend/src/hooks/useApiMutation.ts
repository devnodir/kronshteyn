import { useMutation, UseMutationOptions } from "react-query";
import { AxiosResponse } from "axios";
import api, { abortController } from "@/utils/api";

const useApiMutation = <Variables = any, Response = any, Error = any>(
	url = "",
	options: UseMutationOptions<AxiosResponse<Response>, Error, Variables> = {},
	params: object = {},
) => {
	const mutation = useMutation<AxiosResponse<Response>, Error, Variables>(
		async (data) => await api.post(url, data, { params, signal: abortController.signal }), {
		...options,
	});
	return { ...mutation }
}

export default useApiMutation;