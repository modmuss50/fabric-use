<script lang="ts">
  import LegacyVersion from "./LegacyVersion.svelte";

  let legacyVersion : LegacyVersion;

  function copyImportEntry():void {
    legacyVersion.getSelectedVersions()
     .then(([yarn, loader]) => getImportURL(yarn.version, loader.version))
  }

  function getImportURL(yarnVersion: string, loaderVersion: string) {
    var url = `<loader type="fabric" yarn="${yarnVersion}" loader="${loaderVersion}"/>`
    copyToClipboard(url);
  }

  function copyToClipboard(text: string) {
    var tad = document.createElement("textarea");
    tad.value = text;
    document.body.appendChild(tad);
    tad.select();
    document.execCommand("copy");
    document.body.removeChild(tad);
  }
</script>

<main>
  <LegacyVersion bind:this={legacyVersion} />
  <br />
  <p>Please checkout the <a href="https://fabricmc.net/wiki/tutorial:atlauncher_modpacks">wiki page</a> for more help with the ATLauncher</p>
  <button on:click={copyImportEntry}>Copy ATLauncher loader entry</button>
  <br />
</main>
