import useSWR from "swr";
import { client } from "../api/client.ts";

export const useMe = () => {
  const { data: me, isLoading: isLoadingMe } = useSWR("me", async () => {
    const me = await client.user.getMe();

    return me.data;
  });

  return {
    me,
    isLoadingMe,
  };
};
