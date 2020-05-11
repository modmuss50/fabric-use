<script>
  let expertOptions = false;
  let selectedVersion = "";
  let jarUrl = "#";
  let exeUrl = "#";
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

  function showExpertOptions() {
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
        <p>
          {#if latest.stable}Version: {latest.version} (Latest){/if}
          {#if !expertOptions}
            <a href="javascript:" on:click={showExpertOptions}>
              Show other versions
            </a>
          {/if}
        </p>
      {/await}
    {/if}

    <p>
      The Minecraft version can be selected in the installer, this download
      works for every version we support.
    </p>

    <a class="button" href={selectedVersion}>
      Download installer (Universal/.JAR)
    </a>

    <a class="button" href={selectedVersion.replace('.jar', '.exe')}>
      Download installer (Windows/.EXE)
    </a>

    <br />
    <br />
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
