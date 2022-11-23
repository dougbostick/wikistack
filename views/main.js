const html = require("html-template-tag");
const layout = require("./layout");

module.exports = (pages) => layout(html`
  <h3>Pages</h3>
  <hr>
  <form method="GET" action="/wiki/search">
    <input type="text" name="search" />
    <button type="submit">Search</button>
  </form>
  <hr>
  <ul class="list-unstyled">
    <ul>
      ${pages.map((page) => html`
        <li>
          <h1>${page.title}</h1>
          <h3>AUTHOR NAME</h3>
          <a href='/wiki/${page.slug}'>read more...</a>
        </li>
      `)}
    </ul>
  </ul>`);