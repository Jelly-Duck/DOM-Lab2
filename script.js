const subMenuEl = document.getElementById("sub-menu");
const topMenuEl = document.getElementById("top-menu");
let showingSubMenu = false;

const menuLinks = [
  { text: "about", href: "/about" },
  {
    text: "catalog",
    href: "#",
    subLinks: [
      { text: "all", href: "/catalog/all" },
      { text: "top selling", href: "/catalog/top" },
      { text: "search", href: "/catalog/search" },
    ],
  },
  {
    text: "orders",
    href: "#",
    subLinks: [
      { text: "new", href: "/orders/new" },
      { text: "pending", href: "/orders/pending" },
      { text: "history", href: "/orders/history" },
    ],
  },
  {
    text: "account",
    href: "#",
    subLinks: [
      { text: "profile", href: "/account/profile" },
      { text: "sign out", href: "/account/signout" },
    ],
  },
];

const updateMenuLinks = menuLinks.map(function (item) {
  const anchorEl = document.createElement("a");
  anchorEl.href = item.href;
  anchorEl.textContent = item.text;
  topMenuEl.appendChild(anchorEl);
  return item;
});

console.log(updateMenuLinks);

mainEl = document.querySelector("main");

function updateMainEl() {
  (mainEl.style.backgroundColor = "var(--main-bg)"),
    (mainEl.innerHTML = "<h1>SEI Rocks!</h1>"),
    mainEl.classList.add("flex-ctr");
}

updateMainEl();

function updateTopMenuEl() {
  console.log(topMenuEl);
  topMenuEl.style.height = "100%";
  topMenuEl.style.backgroundColor = "var(--top-menu-bg)";
  topMenuEl.classList.add("flex-around");
}

updateTopMenuEl();

function updateSubMenuEl() {
  subMenuEl.style.height = "100%";
  subMenuEl.style.backgroundColor = "var(--sub-menu-bg)";
  subMenuEl.classList.add("flex-around");
  subMenuEl.style.position = "absolute";
  subMenuEl.style.top = "0";
}

updateSubMenuEl();

const topMenuLinks = document.querySelectorAll("#top-menu a");

topMenuEl.addEventListener("click", function (event) {
  event.preventDefault();
  if (event.target.tagName !== "A") {
    return;
  }

  if (event.target.classList.contains("active")) {
    event.target.classList.remove("active");
    showingSubMenu = "false";
    subMenuEl.style.top = "0";
    return;
  }

  topMenuLinks.forEach(function (link) {
    link.classList.remove("active");
  });

  event.target.classList.add("active");

  const clickedLinkObject = menuLinks.find(
    (item) => item.text === event.target.textContent
  );

  // console.log(clickedLinkObject);
  if (clickedLinkObject && clickedLinkObject.subLinks) {
    showingSubMenu = true;
  } else {
    showingSubMenu = false;
    subMenuEl.style.top = "0";
  }
  const buildSubMenu = function (subLinks) {
    subMenuEl.innerHTML = "";
    subLinks.map(function (link) {
      const subLink = document.createElement("a");
      subLink.href = link.href;
      subLink.textContent = link.text;
      subMenuEl.appendChild(subLink);
    });
  };
  if (showingSubMenu) {
    buildSubMenu(clickedLinkObject.subLinks);
    subMenuEl.style.top = "100%";
  } else {
    subMenuEl.style.top = "0";
    mainEl.innerHTML = "<h1>about</h1>";
  }
});

subMenuEl.addEventListener("click", function (evt) {
  evt.preventDefault();
  const link = evt.target;
  if (link.tagName !== "A") return;
  console.log(link.textContent);
  showingSubMenu = false;
  subMenuEl.style.top = "0";
  topMenuLinks.forEach(function (link) {
    link.classList.remove("active");
  });
  mainEl.innerHTML = `<h1>${link.textContent}</h1>`;
});
