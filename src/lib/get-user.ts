export const getUser = (accessToken: string) => {
  try {
    const payload = accessToken.split(".")[1];

    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    let paddedBase64 = base64;
    while (paddedBase64.length % 4 !== 0) {
      paddedBase64 += "=";
    }

    const decodedPayload = new TextDecoder().decode(
      Uint8Array.from(atob(paddedBase64), (c) => c.charCodeAt(0)),
    );

    const { username, name } = JSON.parse(decodedPayload);

    return {
      username: username ?? null,
      name: name ?? null,
    };
  } catch {
    return null;
  }
};

/**
 * Base64는 이진 데이터를 64개의 ASCII 문자로 변환하는 인코딩 방식
 * URL,JSON 같은 텍스트 전용 환경에서 이진 데이터를 안전하게 표현하기 위해 사용
 * (A-Z, a-z, 0-9, +, / 문자만 사용)
 *
 * Base64URL은 URL, 쿠키, HTTP헤더에서 안전하게 사용하기 위해 등장한 Base64의 변형
 * Base64에서 사용되는 +, /, =를 -, _, 로 변환하여 URL에 사용할 수 있게 함
 *
 *
 * +는 Base64에서 63번째 문자열을 의미하지만, URL에서 공백으로 인식될 수 있음
 * /는 Base64에서 64번째 문자열을 의미하지만, URL 경로 구분자로 인식됨
 * =은 Base64에서 패딩 문자로 사용되지만, query string의 key=value 문법에서 사용됨
 *
 * JWT에서는 Base64를 사용,따라서 Base64를 Base64URL로 변환하는 작업이 필요
 *
 * 제일 간단한 방법: jwt-decode 라이브러리 사용 -> base64 변환 및 패딩처리 필요 없음
 **/
