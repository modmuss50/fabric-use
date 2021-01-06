<script lang="ts">
   import { Version } from "./main";

  let listSnapshots = false;

  let selectedGameVersion : Version | undefined;
  let selectedLoaderVersion : Version;

  let gameVersions = getJson<Version[]>(
    "https://meta.fabricmc.net/v2/versions/game"
  ).then((data) => {
    //Select the latest stable version by default
    selectedGameVersion =
      data.find((version) => version.stable || listSnapshots);
      return data;
  });

  let loaderVersions = getJson<Version[]>(
    "https://meta.fabricmc.net/v2/versions/loader"
  ).then((data) => {
    selectedLoaderVersion = data[0]
    return data;
  });

  function getJson<T>(url: string): Promise<T> {
    return fetch(url).then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error();
    });
  }

  //Get the latest yarn version for the provided game version, used for legacy support
  function getYarnVersion() : Promise<Version> {
    return getJson<Version[]>(
      `https://meta.fabricmc.net/v2/versions/yarn/${selectedGameVersion}?limit=1`
    ).then((versions) => versions[0]);
  }

  export function getSelectedVersions(): Promise<[yarn: Version, loader : Version]> {
    return getYarnVersion().then((yarn) => [yarn, selectedLoaderVersion])
  }
</script>

<main>
  <label>
    <input type="checkbox" bind:checked={listSnapshots} />
    Show snapshot versions
  </label>
  <br />
  <br />

  {#await gameVersions}
    <p>Loading versions..</p>
  {:then data}
    Game version:
    <select bind:value={selectedGameVersion} style="min-width: 200px">
      {#each data as version}
        {#if version.stable || listSnapshots}
          <option value={version.version}>{version.version}</option>
        {/if}
      {/each}
    </select>
  {:catch error}
    <p style="color: red">Error: {error.message}</p>
    <p>
      For support please vist one of our
      <a href="/discuss">community discussion</a>
      groups.
    </p>
  {/await}

  <br />
  <br />

  {#await loaderVersions}
    <p>Loading versions..</p>
  {:then data}
    Loader version:
    <select bind:value={selectedLoaderVersion} style="min-width: 200px">
      {#each data as version}
        <option value={version.version}>{version.version}</option>
      {/each}
    </select>
  {:catch error}
    <p style="color: red">Error: {error.message}</p>
    <p>
      For support please vist one of our
      <a href="/discuss">community discussion</a>
      groups.
    </p>
  {/await}
</main>
