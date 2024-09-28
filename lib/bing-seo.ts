import { mylog } from "./utils";

export const submitUrlsToIndexNow = async (urls: string[]) => {
  const url = "https://api.indexnow.org/indexnow";
  let payload = {
    host: "offernow.cn",
    key: "e5d66260a41d4cca9e9b369be3efaa81",
    keyLocation: "https://offernow.cn/e5d66260a41d4cca9e9b369be3efaa81.txt",
    urlList: urls,
  };
  // console.log("submitUrlsToIndexNow", payload);

  try {
    // 设置超时时间
    // Set up AbortController and timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 50000); // Set timeout to 5000ms (5 seconds)

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;",
      },
      body: JSON.stringify(payload),
      signal: controller.signal, // Attach the abort signal
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
