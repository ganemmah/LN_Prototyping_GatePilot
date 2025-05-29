<script>
  import { page } from '$app/stores';
  import { get } from 'svelte/store';
  import "./styles.css";
  let { children } = $props();
</script>


<nav
  class="navbar navbar-expand-lg bg-body-tertiary bg-dark"
  data-bs-theme="dark"
  role="navigation"
>
  <div class="container-fluid">
    <!-- Brand / Home -->
<a
  class="navbar-brand"
  class:active-home={$page.url.pathname === '/'}
  href="/"
>
  GatePilot
</a>    <!-- Mobile Toggler -->
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <!-- Nav Links -->
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav me-auto">
        <li class="nav-item">
<a class="nav-link" class:active={$page.url.pathname.startsWith('/flights')} href="/flights">Flights</a>
        </li>
        <li class="nav-item">
<a class="nav-link" class:active={$page.url.pathname.startsWith('/gates')} href="/gates">Gates</a>
        </li>
        <li class="nav-item">
<a class="nav-link" class:active={$page.url.pathname.startsWith('/airlines')} href="/airlines">Airlines</a>
        </li>
        <li class="nav-item">
<a class="nav-link" class:active={$page.url.pathname.startsWith('/passengers')} href="/passengers">Passengers</a>
      </ul>
    </div>
  </div>
</nav>

<div class="container mt-3">
  {@render children()}
</div>
