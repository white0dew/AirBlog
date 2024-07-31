import { mylog } from "./utils";

export const submitUrlsToIndexNow = async (urls: string[]) => {
  const url = "https://api.indexnow.org/indexnow";
  let payload = {
    host: "offernow.cn",
    key: "e5d66260a41d4cca9e9b369be3efaa81",
    keyLocation: "https://offernow.cn/e5d66260a41d4cca9e9b369be3efaa81.txt",
    urlList: url,
  };
  console.log("submitUrlsToIndexNow", urls);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Failed to submit URLs: ${response.statusText}`);
    }

    const result = await response.json();
    console.log("URLs submitted successfully:", result);
  } catch (error) {
    console.error("Error submitting URLs:", error);
  }
};
