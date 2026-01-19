export const getUser = (accessToken: string) => {
  const payload = accessToken.split(".")[1];

  const decodedPayload = new TextDecoder().decode(
    Uint8Array.from(atob(payload), (c) => c.charCodeAt(0))
  );

  const { username, name } = JSON.parse(decodedPayload);

  return { username, name };
};
