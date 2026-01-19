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

export default parseServerError;
