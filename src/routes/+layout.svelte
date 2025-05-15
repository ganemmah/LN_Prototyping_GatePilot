<script>
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
    <a class="navbar-brand" href="/">GatePilot</a>
    <!-- Mobile Toggler -->
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
          <a class="nav-link" aria-current="page" href="/flights">Flights</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/gates">Gates</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/airlines">Airlines</a>
        </li>
      </ul>
    </div>
  </div>
</nav>

<div class="container mt-3">
  {@render children()}
</div>
