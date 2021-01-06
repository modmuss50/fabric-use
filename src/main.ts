// @ts-ignore
import App from "./App.svelte";

const app = new App({
  target: document.getElementById("content"),
});

export default app;

export interface Version {
  url: string;
  version: string;
  stable: boolean;
}

export function getInstallerVersions(): Promise<Version[]> {
  return getVersions("https://meta.fabricmc.net/v2/versions/installer");
}

function getVersions(url: string): Promise<Version[]> {
  return fetch(url).then(async (response) => {
    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      throw new Error(data);
    }
  });
}
