<script>
  import LegacyVersion from "./LegacyVersion.svelte";

  let legacyVersion;

  function copyImportEntry() {
    legacyVersion.getSelectedVersions(getImportURL);
  }

  function getImportURL(yarnVersion, loaderVersion) {
    var url = `https://fabricmc.net/download/mcupdater?yarn=${yarnVersion.replace(
      "+",
      "%2B"
    )}&amp;loader=${loaderVersion.replace("+", "%2B")}`;
    url = '<Import url="' + url + '">fabric</Import>';
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
  <button on:click={copyImportEntry}>Copy MCUpdater Import entry</button>
</main>
