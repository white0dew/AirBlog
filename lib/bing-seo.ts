export const submitUrlsToIndexNow = async (urls: string[]) => {
  const url = "https://api.indexnow.org/indexnow";
  let payload = {
    host: "www.offernow.cn",
    key: "b7cdab194acd432abf7093149e78bf5a",
    keyLocation: "https://www.offernow.cn/b7cdab194acd432abf7093149e78bf5a.txt",
    urlList: [
      "https://www.example.org/url1",
      "https://www.example.org/folder/url2",
      "https://www.example.org/url3",
    ],
  };
  payload.urlList = urls;

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
