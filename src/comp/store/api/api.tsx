const API_DEFAULT =
  "https://l9817xtkq3.execute-api.ap-northeast-2.amazonaws.com/dev/";

export const request = async (url: RequestInfo | URL) => {
  const res = await fetch(url);

  if (res.ok) {
    const json = await res.json();
    return json;
  }
  throw new Error("api를 받지 않았습니다");
};

export const listApiFuntion = async (url: null | string | number) => {
  const list = url
    ? await request(
        `https://l9817xtkq3.execute-api.ap-northeast-2.amazonaws.com/dev/${url}`
      )
    : request(API_DEFAULT);
  return list;
};
