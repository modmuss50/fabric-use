<script>
  let listSnapshots = false;

  let selectedGameVersion = "";
  let selectedLoaderVersion = "";

  let gameVersions = getJson(
    "https://meta.fabricmc.net/v2/versions/game",
    data => {
      //Select the latest stable version by default
      selectedGameVersion = data.find(
        version => version.stable || listSnapshots
      ).version;
    }
  );
  let loaderVersions = getJson(
    "https://meta.fabricmc.net/v2/versions/loader",
    data => (selectedLoaderVersion = data[0].version)
  );

  async function getJson(url, complete = data => {}) {
    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      complete(data);
      return data;
    } else {
      throw new Error(data);
    }
  }

  //Get the latest yarn version for the provided game version, used for legacy support
  function getYarnVersion(callback) {
    getJson(
      `https://meta.fabricmc.net/v2/versions/yarn/${selectedGameVersion}?limit=1`
    )
      .then(versions => versions[0])
      .then(version => callback(version));
  }

  export function getSelectedVersions(callback) {
    getYarnVersion(yarnVersion => {
      callback(yarnVersion.version, selectedLoaderVersion);
    });
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
