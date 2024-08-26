"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getAuthStatus } from "./actions";
import { useRouter } from "next/navigation";

const Page = () => {
  const [configId, setConfigId] = useState<string | null>(null);
  const router = useRouter();
  const configurationId = localStorage.getItem("configurationId");
  if (configurationId) setConfigId(configurationId);
  const { data } = useQuery({
    queryKey: ["auth-callback"],
    queryFn: async () => await getAuthStatus(),
    retry: true,
    retryDelay: 500,
  });
  if (data?.success) {
    if (configId) {
      localStorage.removeItem("configurationId");
      router.push(`/configure/preview?id=${configId}`);
    } else {
      router.push("/");
    }
  }
};

export default Page;
