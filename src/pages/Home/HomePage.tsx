import React, { useEffect, useState } from "react";

function HomePage(): JSX.Element {
  const [data, setData]: any = useState();
  // Similar to componentDidMount and componentDidUpdate:
  useEffect((): void => {
    // Call our fetch function below once the component mounts
    callBackendAPI()
      .then((res: any): void => setData(res.express))
      // tslint:disable-next-line: no-console
      .catch((err: Error): void => console.log(err));
  });

  async function callBackendAPI(): Promise<any> {
    const response: Response = await fetch("/express_backend");
    const body: Promise<any> = await response.json();

    if (response.status !== 200) {
      throw Error((body as any).message);
    }
    return body;
  }

  return (
    <div className="Home">
      <h1>Home Page {data}</h1>
    </div>
  );
}

export default HomePage;
