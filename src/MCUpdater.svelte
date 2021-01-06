<script lang="ts">
  import LegacyVersion from "./LegacyVersion.svelte";
  import { Version } from "./main";

  let legacyVersion: LegacyVersion;

  function copyImportEntry() {
    legacyVersion.getSelectedVersions()
    .then(([yarn, loader]) => getImportURL(yarn.version, loader.version))
  }

  function getImportURL(yarnVersion : string, loaderVersion: string) {
    var url = `https://fabricmc.net/download/mcupdater?yarn=${yarnVersion.replace(
      "+",
      "%2B"
    )}&amp;loader=${loaderVersion.replace("+", "%2B")}`;
    url = '<Import url="' + url + '">fabric</Import>';
    copyToClipboard(url);
  }

  function copyToClipboard(text : string) {
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
