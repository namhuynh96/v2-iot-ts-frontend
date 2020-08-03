import { useState, useEffect } from "react";

export default (httpClient: any) => {
  const [error, setError] = useState<string | null>(null);

  const reqInterceptor = httpClient.interceptors.request.use((req: any) => {
    setError(null);
    return req;
  });
  const resInterceptor = httpClient.interceptors.response.use(
    (res: any) => res,
    (err: any) => {
      setError(err.message);
    }
  );

  useEffect(() => {
    return () => {
      httpClient.interceptors.request.eject(reqInterceptor);
      httpClient.interceptors.response.eject(resInterceptor);
    };
  }, [
    reqInterceptor,
    resInterceptor,
    httpClient.interceptors.request,
    httpClient.interceptors.response
  ]);

  const errorConfirmedHandler = () => {
    setError(null);
  };

  return [error, errorConfirmedHandler];
};
