<script lang="ts">
  import { Version, getInstallerVersions } from "./main";

  let expertOptions = false;
  let selectedVersion : Version | undefined;
  let versions = getInstallerVersions().then((versions) => {
    selectedVersion = versions[0];
    return versions;
  })

  function showExpertOptions() {
    expertOptions = true;
  }

  function getVersion() : Promise<Version> {
    return versions.then((versions) => {
      for(let version of versions) {
        if(version == selectedVersion) {
          return version;
        }
      }
      throw new Error("Failed to find version");
    })
  }

  function getSelectedVersionStr() : string {
    return selectedVersion?.url || '';
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
            <a href={'#'} on:click={showExpertOptions}>
              Show other versions
            </a>
          {/if}
        </p>
      {/await}
    {/if}

    <a class="button" href={getSelectedVersionStr()}>Download installer (.jar)</a>

    <br />
    <br />
    <strong>OR</strong>
    Download with wget:
    <p>
      <code>
        wget -O {getSelectedVersionStr().substring(getSelectedVersionStr().lastIndexOf('/') + 1)}
        {selectedVersion}
      </code>
    </p>
    <strong>OR</strong>
    Download with curl:
    <p>
      <code>
        curl {selectedVersion} -o {getSelectedVersionStr().substring(getSelectedVersionStr().lastIndexOf('/') + 1)}
      </code>
    </p>
    <br />
    Basic CLI usage
    <p>
      <code>
        java -jar {getSelectedVersionStr().substring(getSelectedVersionStr().lastIndexOf('/') + 1)}
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
