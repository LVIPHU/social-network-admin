import { useMutation } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import type { SignInDto } from '@/packages/models'
import { axios } from '@/packages/libs/axios.ts'
import { queryClient } from '@/packages/libs/query-client.ts'


export const login = async (data: SignInDto) => {
  const response = await axios.post<AuthResponseDto, AxiosResponse<AuthResponseDto>, SignInDto>(
    "/auth/login",
    data,
  );

  return response.data;
};

export const useLogin = () => {
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);

  const {
    error,
    isPending: loading,
    mutateAsync: loginFn,
  } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      if (data.status === "2fa_required") {
        void navigate("/auth/verify-otp");
        return;
      }

      setUser(data.user);
      queryClient.setQueryData(["user"], data.user);
    },
  });

  return { login: loginFn, loading, error };
};