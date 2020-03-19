<script>
  import Header from "./Header.svelte";
  import Installer from "./Installer.svelte";
  import MCUpdater from "./MCUpdater.svelte";
  import Technic from "./Technic.svelte";

  let selectedTab = "installer";

  function showInstaller() {
    selectedTab = "installer";
  }

  function showMCUpdater() {
    selectedTab = "mcupdater";
  }

  function showTechnic() {
    selectedTab = "technic";
  }
</script>

<Header />
<main class="page-content">
  <div class="wrapper">
    <header class="post-header">
      <h1 class="post-title">use</h1>
    </header>
    <div class="post-content">
      <p>
        Make sure to follow the
        <a href="https://fabricmc.net/wiki/install">
          installation instructions
        </a>
        !
      </p>
    </div>

    {#if selectedTab == 'installer'}
      <Installer />
    {:else if selectedTab == 'mcupdater'}
      <MCUpdater />
      <br />
      <hr />
      <a href="/" on:click={showInstaller}>Back</a>
    {:else if selectedTab == 'technic'}
      <Technic />
      <br />
      <hr />
      <a href="/" on:click={showInstaller}>Back</a>
    {:else}
      <p>Invalid tab selected</p>
    {/if}

    <br />
    <p>
      Most mods will also require you to install
      <a href="https://www.curseforge.com/minecraft/mc-mods/fabric-api">
        Fabric (API)
      </a>
      into the mods folder
    </p>

    <div>
      <br />
      Other Supported platforms:
      <br />
      <ul>
        <li>
          <a href="https://fabricmc.net/wiki/tutorial:install_with_multimc">
            MultiMC
          </a>
        </li>
        <li>
          <a href="https://fabricmc.net/wiki/tutorial:atlauncher_modpacks">
            ATLauncher
          </a>
          (Modpack Dev)
        </li>
        <li>
          <a href="#" on:click={showMCUpdater}>MCUpdater</a>
          (Modpack Dev)
        </li>
        <li>
          <a href="#" on:click={showTechnic}>Technic</a>
          (Modpack Dev)
        </li>
        <li>
          <a href="https://www.curseforge.com/minecraft/mc-mods/jumploader">
            Twitch
          </a>
          (Unoffical)
        </li>
      </ul>
    </div>
  </div>

</main>
