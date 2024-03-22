class FaucetApiService {
  private faucetUrl: string = "";

  constructor() {
    this.faucetUrl = process.env.NEXT_PUBLIC_FAUCET_URL!;
  }

  public async request(address: string) {
    if (!this.faucetUrl) {
      return "Faucet URL is missing";
    }

    const response = await fetch(this.faucetUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ address }),
    });

    const responseTxt = await response.text();
    return responseTxt;
  }
}

export default FaucetApiService;
