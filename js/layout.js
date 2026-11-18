const navigation = [
  { href: "index.html", label: "Shop dinos" },
  { href: "customers.html", label: "Customers" },
  { href: "cart.html", label: "Cart" },
  { href: "admin.html", label: "Inventory" },
  { href: "reports.html", label: "Reports" },
];

const currentPage = window.location.pathname.split("/").pop() || "index.html";
const navRoot = document.querySelector("#nav");

if (navRoot) {
  navRoot.innerHTML = `
    <header class="site-header">
      <nav class="container nav-inner" aria-label="Main navigation">
        <a class="brand" href="index.html" aria-label="Tiny Time home"><span class="brand-mark" aria-hidden="true">T.</span><span>Tiny Time</span></a>
        <div class="nav-links">
          ${navigation
            .map(({ href, label }) => `<a class="nav-link${currentPage === href ? " is-active" : ""}" href="${href}"${currentPage === href ? ' aria-current="page"' : ""}>${label}</a>`)
            .join("")}
        </div>
      </nav>
    </header>`;
}

const footerRoot = document.querySelector("#footer");
if (footerRoot) {
  footerRoot.innerHTML = `
    <footer class="site-footer">
      <div class="container footer-inner">
        <a class="brand footer-brand" href="index.html"><span class="brand-mark" aria-hidden="true">T.</span><span>Tiny Time</span></a>
        <p>Little dinos. Big adventures.</p>
        <span>© ${new Date().getFullYear()} Tiny Time</span>
      </div>
    </footer>`;
}

const products = [
  { name: "Tyrannosaurus rex", kind: "Predator", price: 6, tag: "The classic", tone: "rust", mark: "T." },
  { name: "Triceratops", kind: "Herbivore", price: 7, tag: "Gentle giant", tone: "sage", mark: "Tri" },
  { name: "Stegosaurus", kind: "Herbivore", price: 6, tag: "A little spiky", tone: "gold", mark: "Steg" },
  { name: "Velociraptor", kind: "Predator", price: 5, tag: "Quick thinker", tone: "blue", mark: "V." },
];

const results = document.querySelector("#results");
const filterForm = document.querySelector("#filters");

if (results && filterForm) {
  const searchInput = document.querySelector("#q");
  const categorySelect = document.querySelector("#category");
  const maxPriceInput = document.querySelector("#maxPrice");
  const sortSelect = document.querySelector("#sort");
  const countLabel = document.querySelector("#results-count");

  const renderProducts = () => {
    const query = searchInput.value.trim().toLocaleLowerCase();
    const category = categorySelect.value;
    const maxPrice = Number(maxPriceInput.value);
    const hasMaxPrice = maxPriceInput.value !== "";
    const sort = sortSelect.value;
    const visibleProducts = products
      .filter((product) => product.name.toLocaleLowerCase().includes(query))
      .filter((product) => !category || product.kind === category)
      .filter((product) => !hasMaxPrice || product.price <= maxPrice)
      .sort((first, second) => {
        if (sort === "price_asc") return first.price - second.price;
        if (sort === "price_desc") return second.price - first.price;
        return first.name.localeCompare(second.name);
      });

    countLabel.textContent = visibleProducts.length
      ? `${visibleProducts.length} little ${visibleProducts.length === 1 ? "legend" : "legends"}`
      : "No dinos found — try a different search.";

    results.innerHTML = visibleProducts.map((product, index) => `
      <article class="product-card">
        <div class="product-art tone-${product.tone}" aria-hidden="true">
          <span class="product-number">0${index + 1} / 04</span>
          <span class="product-mark">${product.mark}</span>
          <span class="product-tag">${product.tag}</span>
        </div>
        <div class="product-info">
          <div><p class="product-kind">${product.kind}</p><h3>${product.name}</h3></div>
          <span class="product-price">$${product.price.toFixed(2)}</span>
        </div>
      </article>`).join("");
  };

  filterForm.addEventListener("submit", (event) => event.preventDefault());
  filterForm.addEventListener("input", renderProducts);
  filterForm.addEventListener("change", renderProducts);
  renderProducts();
}
