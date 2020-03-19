<script>
  import LegacyVersion from "./LegacyVersion.svelte";

  let legacyVersion;

  function downloadFile() {
    legacyVersion.getSelectedVersions(doFileDownload);
  }

  function doFileDownload(yarnVersion, loaderVersion) {
    var url = `https://fabricmc.net/download/technic?yarn=${yarnVersion.replace(
      "+",
      "%2B"
    )}&loader=${loaderVersion.replace("+", "%2B")}`;
    window.location.href = url;
  }
</script>

<main>
  <LegacyVersion bind:this={legacyVersion} />
  <br />
  <button on:click={downloadFile}>Download bin/version.json file</button>
</main>
