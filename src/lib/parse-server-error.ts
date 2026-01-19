import { serverError } from "@/src/schemas/error";
import { AxiosError } from "axios";

const parseServerError = (error: unknown): Record<string, string> | null => {
  if (!(error instanceof AxiosError)) return null;

  const data = error.response?.data;
  const fieldErrorsResult = serverError.safeParse(data);

  if (fieldErrorsResult.success) {
    const field = Object.keys(fieldErrorsResult.data)[0];
    const messages = fieldErrorsResult.data[field];

    return {
      [field]: messages[0],
    };
  }

  return null;
};

const parseServerMessage = (
  error: unknown,
  defaultMessage: string = "알 수 없는 오류가 발생했습니다."
): string => {
  if (!(error instanceof AxiosError)) return defaultMessage;

  const message = error.response?.data.message;
  return message || defaultMessage;
};

export { parseServerError, parseServerMessage };
