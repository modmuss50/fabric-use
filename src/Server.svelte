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

    <a class="button" href={selectedVersion}>Download installer (.jar)</a>

    <br />
    <br />
    <strong>OR</strong>
    Download with wget:
    <p>
      <code>
        wget -o {selectedVersion.substring(selectedVersion.lastIndexOf('/') + 1)}
        {selectedVersion}
      </code>
    </p>
    <strong>OR</strong>
    Download with curl:
    <p>
      <code>
        curl {selectedVersion} -o {selectedVersion.substring(selectedVersion.lastIndexOf('/') + 1)}
      </code>
    </p>
    <br />
    Basic CLI usage
    <p>
      <code>
        java -jar {selectedVersion.substring(selectedVersion.lastIndexOf('/') + 1)}
        server -downloadMinecraft
      </code>
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
