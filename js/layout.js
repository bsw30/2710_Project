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
    <header class="bg-body border-bottom">
      <nav class="navbar navbar-expand-lg" aria-label="Main navigation">
        <div class="container flex-wrap gap-2">
          <a class="navbar-brand fw-semibold" href="index.html">Tiny Time</a>
          <div class="navbar-nav flex-row flex-wrap gap-2">
            ${navigation
              .map(({ href, label }) => `<a class="nav-link${currentPage === href ? " active" : ""}" href="${href}"${currentPage === href ? ' aria-current="page"' : ""}>${label}</a>`)
              .join("")}
          </div>
        </div>
      </nav>
    </header>`;
}

const footerRoot = document.querySelector("#footer");
if (footerRoot) {
  footerRoot.innerHTML = `
    <footer class="bg-body border-top">
      <div class="container py-3 d-flex flex-wrap justify-content-between gap-2">
        <a class="link-dark link-underline-opacity-0" href="index.html">Tiny Time</a>
        <small class="text-body-secondary">Little dinos. Big adventures. · © ${new Date().getFullYear()}</small>
      </div>
    </footer>`;
}

const products = [
  { name: "Tyrannosaurus rex", kind: "Predator", price: 6, tag: "The classic", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dino_icon-nNKAIVqvV9h7TRl0cyMj2JK0h7bQZn.jpg", imageAlt: "A red dinosaur toy on a dark surface." },
  { name: "Triceratops", kind: "Herbivore", price: 7, tag: "Gentle giant", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tric_01-uOGbHHvvqM5gV1QkBqFPOtf1Zs2A6t.jpg", imageAlt: "An orange toy dinosaur in a soft-focused scene." },
  { name: "Stegosaurus", kind: "Herbivore", price: 6, tag: "A little spiky", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/steg_01-7qCS0coxyWUcqNCxPUZSuwUVAZBaYQ.jpg", imageAlt: "A gray Stegosaurus toy with red plates on sand." },
  { name: "Velociraptor", kind: "Predator", price: 5, tag: "Quick thinker", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/background_01-rhV0OBlYVTATiBnxDCndmVPFMQa1Oy.jpg", imageAlt: "Colorful miniature dinosaurs arranged on a light background." },
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
      : "No dinos found. Try a different search.";

    results.innerHTML = visibleProducts.map((product) => `
      <article class="col">
        <div class="card h-100">
          <div class="ratio ratio-4x3">
            <img class="card-img-top w-100 h-100 object-fit-cover" src="${product.image}" alt="${product.imageAlt}" loading="lazy" decoding="async">
          </div>
          <div class="card-body d-flex flex-column">
            <span class="badge text-bg-warning align-self-start mb-3">${product.kind}</span>
            <h3 class="h5 card-title">${product.name}</h3>
            <p class="card-text text-body-secondary small">${product.tag}</p>
            <p class="fw-semibold mb-0 mt-auto">$${product.price.toFixed(2)}</p>
          </div>
        </div>
      </article>`).join("");
  };

  filterForm.addEventListener("submit", (event) => event.preventDefault());
  filterForm.addEventListener("input", renderProducts);
  filterForm.addEventListener("change", renderProducts);
  renderProducts();
}
