// ====== Mock data (пока) ======
/**
 * status: "reading" | "finished"
 * progress: 0..100
 */
const books = [
    { id: "b1", title: "The Pragmatic Programmer", author: "Andrew Hunt, David Thomas", status: "reading", progress: 35 },
    { id: "b2", title: "Clean Architecture", author: "Robert C. Martin", status: "reading", progress: 10 },
    { id: "b3", title: "Sapiens", author: "Yuval Noah Harari", status: "finished", progress: 100 },
  ];
  
  // ====== DOM ======
  const readingGrid = document.getElementById("readingGrid");
  const finishedGrid = document.getElementById("finishedGrid");
  const readingCount = document.getElementById("readingCount");
  const finishedCount = document.getElementById("finishedCount");
  
  const btnAddBook = document.getElementById("btnAddBook");
  const btnAddProgress = document.getElementById("btnAddProgress");
  
  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modalTitle");
  const modalBody = document.getElementById("modalBody");
  
  // ====== Render ======
  function render() {
    const reading = books.filter(b => b.status === "reading");
    const finished = books.filter(b => b.status === "finished");
  
    readingCount.textContent = pluralizeBooks(reading.length);
    finishedCount.textContent = pluralizeBooks(finished.length);
  
    readingGrid.innerHTML = reading.map(bookCard).join("");
    finishedGrid.innerHTML = finished.map(bookCard).join("");
  }
  
  function bookCard(b) {
    const badgeClass = b.status === "finished" ? "badge--finished" : "badge--reading";
    const badgeText = b.status === "finished" ? "Прочитал" : "Читаю";
    const progressText = b.status === "finished" ? "100%" : `${clamp(b.progress, 0, 100)}%`;
  
    return `
      <article class="card" data-book-id="${escapeHtml(b.id)}">
        <h3 class="card__title">${escapeHtml(b.title)}</h3>
        <p class="card__author">${escapeHtml(b.author || "—")}</p>
  
        <div class="progress" aria-label="Прогресс чтения">
          <div class="progress__bar" style="width:${clamp(b.progress, 0, 100)}%"></div>
        </div>
  
        <div class="card__row">
          <span class="badge ${badgeClass}">${badgeText}</span>
          <span class="badge">${progressText}</span>
        </div>
  
        <div class="card__hint">Пока это демо-данные. Дальше подключим добавление и прогресс.</div>
      </article>
    `;
  }
  
  function pluralizeBooks(n) {
    // русское склонение: 1 книга, 2-4 книги, 5+ книг
    const mod10 = n % 10;
    const mod100 = n % 100;
  
    let word = "книг";
    if (mod100 >= 11 && mod100 <= 14) word = "книг";
    else if (mod10 === 1) word = "книга";
    else if (mod10 >= 2 && mod10 <= 4) word = "книги";
  
    return `${n} ${word}`;
  }
  
  // ====== Modal helpers ======
  function openModal(title, html) {
    modalTitle.textContent = title;
    modalBody.innerHTML = html;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
  }
  
  function closeModal() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
  }
  
  modal.addEventListener("click", (e) => {
    const target = e.target;
    if (target && target.dataset && target.dataset.close === "true") closeModal();
  });
  
  // ====== Buttons (пока заглушки) ======
  btnAddBook.addEventListener("click", () => {
    openModal(
      "Добавить книгу",
      `<p>Здесь позже будет форма добавления книги (название, автор, статус, страницы и т.д.).</p>`
    );
  });
  
  btnAddProgress.addEventListener("click", () => {
    openModal(
      "Добавить прогресс",
      `<p>Здесь позже будет форма обновления прогресса (выбор книги + % или страницы).</p>`
    );
  });
  
  // ====== Utils ======
  function clamp(v, min, max) {
    return Math.max(min, Math.min(max, Number(v) || 0));
  }
  
  function escapeHtml(str) {
    return String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }
  
  // init
  render();