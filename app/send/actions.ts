"use client";

export const getUsdRate = async (searchURL: string) => {
  let result;
  try {
    result = await fetch(`api/get-price?id=${searchURL}`, {
      cache: "force-cache",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return result.json();
  } catch (err) {
    console.log(err);
    throw err;
  }
};
