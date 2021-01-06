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

  function getSelectedVersion(): Promise<Version> {
    return versions.then((versionList) => {
      for (var i = 0; i < versionList.length; i++) {
        if (versionList[i] == selectedVersion) {
          return versionList[i];
        }
      }
      throw new Error("Failed to find version");
    });
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
      {#await getSelectedVersion() then latest}
        <p>
          {#if latest.stable}Version: {latest.version} (Latest){/if}
          {#if !expertOptions}
            <a href={'#'} on:click={showExpertOptions}> Show other versions </a>
          {/if}
        </p>
      {/await}
    {/if}

    <p>
      The Minecraft version can be selected in the installer, this download
      works for every version we support.
    </p>

    <a class="button" href={selectedVersion?.url || "#"}>
      Download installer (Universal/.JAR)
    </a>

    <a class="button" href={selectedVersion?.url?.replace('.jar', '.exe') || "#"}>
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
