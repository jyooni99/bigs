import { serverError } from "@/src/schemas/error";
import { AxiosError } from "axios";

const parseServerError = (error: unknown): Record<string, string> | null => {
  if (!(error instanceof AxiosError)) return null;

  const data = error.response?.data;
  const fieldErrorsResult = serverError.safeParse(data);

  if (fieldErrorsResult.success) {
    const field = Object.keys(fieldErrorsResult.data)[0];
    const messages = fieldErrorsResult.data[field];

    // 아이디 대신 이메일 라벨을 사용하고 있기 때문에 아이디 중복 -> 이메일 중복 오류으로 메세지를 변경하여 보여줌
    // 그 외는 그대로 출력
    if (field === "username" && messages[0] === "이미 사용중인 아이디입니다."){
      return {
        username: "이미 사용중인 이메일입니다.",
      };
    }else {
      return {
        [field]: messages[0],
      };
    }    
  }

  return null;
};

export { parseServerError };
