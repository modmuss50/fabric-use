<script>
  import LegacyVersion from "./LegacyVersion.svelte";

  let legacyVersion;

  function copyImportEntry() {
    legacyVersion.getSelectedVersions(getImportURL);
  }

  function getImportURL(yarnVersion, loaderVersion) {
    var url = `<loader type="fabric" yarn="${yarnVersion}" loader="${loaderVersion}"/>`
    copyToClipboard(url);
  }

  function copyToClipboard(text) {
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
