<script context="module">
  import queryString from "query-string";

  const urlQuery = queryString.parse(location.search);

  let initalPage = "installer";

  if (urlQuery.page) {
    initalPage = urlQuery.page;
  }
</script>

<script>
  import Installer from "./Installer.svelte";
  import Server from "./Server.svelte";
  import MCUpdater from "./MCUpdater.svelte";
  import Technic from "./Technic.svelte";

  let selectedTab = initalPage;
</script>

<main class="page-content">
  <div class="wrapper">
    <header class="post-header">
      <h1 class="post-title">use</h1>
    </header>

    {#if selectedTab == 'installer'}
      <h2>Installation for: Minecraft Launcher</h2>
      <Installer />
    {:else if selectedTab == 'server'}
      <h2>Installation for: Minecraft Server</h2>
      <Server />
    {:else if selectedTab == 'mcupdater'}
      <h2>Installation for: MCUpdater</h2>
      <MCUpdater />
    {:else if selectedTab == 'technic'}
      <h2>Installation for: Technic</h2>
      <Technic />
    {:else}
      <p>Invalid tab selected, please select a supported platform.</p>
    {/if}
    <p>
      Make sure to follow the
      <a href="https://fabricmc.net/wiki/install">installation instructions!</a>
    </p>
    <p>
      <strong>
        Most mods will also require you to install
        <a href="https://www.curseforge.com/minecraft/mc-mods/fabric-api">
          Fabric (API)
        </a>
        into the mods folder.
      </strong>
    </p>
    <div>
      <u>Other installation options:</u>
      <br />
      <ul>
        <li>
          <a href="?page=installer">
            Minecraft Launcher
          </a>
        </li>
        <li>
          <a href="?page=server">Minecraft Server</a>
        </li>
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
          <a href="?page=mcupdater">MCUpdater</a>
          (Modpack Dev)
        </li>
        <li>
          <a href="?page=technic">Technic</a>
          (Modpack Dev)
        </li>
        <li>
          <a href="https://github.com/FabricMC/fabric-meta#fabric-meta">
            Metadata API
          </a>
          (Launcher Dev)
        </li>
        <li>
          <a href="https://www.curseforge.com/minecraft/mc-mods/jumploader">
            Twitch
          </a>
          (Unofficial)
        </li>
      </ul>
    </div>
  </div>

</main>
