<script lang="ts">
  import LegacyVersion from "./LegacyVersion.svelte";

  let legacyVersion: LegacyVersion;

  function downloadFile() {
    legacyVersion.getSelectedVersions()
    .then(([yarn, loader]) => doFileDownload(yarn.version, loader.version))
  }

  function doFileDownload(yarnVersion: string, loaderVersion: string) {
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
