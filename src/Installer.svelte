<script>
  let expertOptions = false;
  let selectedVersion = "";
  let versions = getDownloads();

  async function getDownloads() {
    const response = await fetch(
      "https://meta.fabricmc.net/v2/versions/installer"
    );
    const data = await response.json();

    if (response.ok) {
      selectedVersion = data[0].url;
      return data;
    } else {
      throw new Error(data);
    }
  }

  function downloadJar() {
    downloadURL(selectedVersion);
  }

  function downloadExe() {
    downloadURL(selectedVersion.replace(".jar", ".exe"));
  }

  function downloadURL(url) {
    window.location.href = url;
  }

  function enableExpert() {
    expertOptions = true;
  }

  async function getVersion() {
    const versionList = await versions;
    for (var i = 0; i < versionList.length; i++) {
      if (versionList[i].url == selectedVersion) {
        return versionList[i];
      }
    }
  }
</script>

<main>
  {#await versions}
    <p>Loading versions..</p>
  {:then data}

    {#if expertOptions}
      Installer Version:
      <select bind:value={selectedVersion} style="min-width: 200px">
        {#each data as version}
          <option value={version.url}>{version.version}</option>
        {/each}
      </select>

      <br />
      <br />
    {:else}
      {#await getVersion() then latest}
        {#if latest.stable}
          <p>Version: {latest.version} (Latest)</p>
        {/if}
      {/await}
    {/if}

    <button disabled={!selectedVersion} on:click={downloadJar}>
      Download installer (Universal/.JAR)
    </button>

    <button disabled={!selectedVersion} on:click={downloadExe}>
      Download installer (Windows/.EXE)
    </button>
    {#if !expertOptions}
      <p>
        <a href="#" on:click={enableExpert}>Show other versions</a>
      </p>
    {/if}
    <p>
      (Please note that the Windows .EXE may show a SmartScreen warning message
      about an "Unknown publisher". Unfortunately, we cannot currently do
      anything about this. If it makes you feel uncomfortable, use the .JAR or
      MultiMC method to install.)
    </p>
  {:catch error}
    <p style="color: red">Error: {error.message}</p>
    <p>
      For support please vist one of our
      <a href="/discuss">community discussion</a>
      groups.
    </p>
  {/await}

</main>
