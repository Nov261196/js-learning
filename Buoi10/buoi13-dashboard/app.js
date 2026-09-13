
const students = [
    { id: "SV01", name: "Nguyễn Minh An", className: "JS01", score: 8.5 },
    { id: "SV02", name: "Trần Gia Bình", className: "JS01", score: 4.2 },
    { id: "SV03", name: "Lê Hoàng Chi", className: "JS02", score: 7.6 },
    { id: "SV04", name: "Phạm Anh Dũng", className: "JS02", score: 9.1 },
    { id: "SV05", name: "Võ Thu Em", className: "JS01", score: 5.0 },
    { id: "SV06", name: "Đỗ Quang Huy", className: "JS03", score: 3.8 },
    { id: "SV07", name: "Bùi Khánh Linh", className: "JS03", score: 8.0 },
    { id: "SV08", name: "Hồ Bảo Nam", className: "JS02", score: 6.4 },
    { id: "SV09", name: "Dương Ngọc Oanh", className: "JS01", score: 9.5 },
    { id: "SV10", name: "Mai Quốc Phúc", className: "JS03", score: 2.9 },
    { id: "SV11", name: "Cao Mỹ Tâm", className: "JS02", score: 7.0 },
    { id: "SV12", name: "Lý Đức Vinh", className: "JS03", score: 6.8 }
];


const state = {
    students,
    keyword: "",
    status: "all",
    sortBy: "scoreDesc",
    page: 1,
    pageSize: 5
};
const elements = {
    body: document.querySelector("#studentBody"),
    empty: document.querySelector("#emptyState"),
    search: document.querySelector("#searchInput"),
    status: document.querySelector("#statusSelect"),
    sort: document.querySelector("#sortSelect"),
    prev: document.querySelector("#prevButton"),
    next: document.querySelector("#nextButton"),
    pageInfo: document.querySelector("#pageInfo"),
    chart: document.querySelector("#chart"),
    total: document.querySelector("#totalValue"),
    average: document.querySelector("#averageValue"),
    passed: document.querySelector("#passedValue"),
    failed: document.querySelector("#failedValue")
};


const comparators = {
    scoreDesc: (a, b) => b.score - a.score,
    scoreAsc: (a, b) => a.score - b.score,
    nameAsc: (a, b) => a.name.localeCompare(b.name, "vi")
};
function classify(score) {
    if (score >= 8) return "Giỏi";
    if (score >= 6.5) return "Khá";
    if (score >= 5) return "Trung bình";
    return "Yếu";
}
function getFilteredAndSorted() {
    const keyword = state.keyword.trim().toLocaleLowerCase("vi");
    return state.students
        .filter(student => {
            const searchableText = `${student.id} ${student.name}`.toLocaleLowerCase("vi");
            const matchesKeyword = searchableText.includes(keyword);
            const matchesStatus = state.status === "all"
                || (state.status === "passed" && student.score >= 5)
                || (state.status === "failed" && student.score < 5);
            return matchesKeyword && matchesStatus;
        })
        .sort(comparators[state.sortBy] ?? comparators.scoreDesc);
}
function paginate(items) {
    const totalPages = Math.max(1, Math.ceil(items.length / state.pageSize));
    state.page = Math.min(state.page, totalPages);
    const start = (state.page - 1) * state.pageSize;
    return { pageItems: items.slice(start, start + state.pageSize), totalPages };
}
function renderRows(items) {
    const startOrder = (state.page - 1) * state.pageSize;
    elements.body.innerHTML = items.map((student, index) => {
        const passed = student.score >= 5;
        return `
<tr>
<td>${startOrder + index + 1}</td>
<td>${student.id}</td>
<td>${student.name}</td>
<td>${student.className}</td>
<td>${student.score.toFixed(1)}</td>
<td><span class="badge ${passed ? "passed" : "failed"}">
${classify(student.score)}
</span></td>
</tr>`;
    }).join("");
    elements.empty.hidden = items.length !== 0;
}
function summarize(items) {
    const result = items.reduce((acc, student) => {
        acc.totalScore += student.score;
        student.score >= 5 ? acc.passed++ : acc.failed++;
        return acc;
    }, { totalScore: 0, passed: 0, failed: 0 });
    return {
        count: items.length,
        average: items.length ? result.totalScore / items.length : 0,
        passed: result.passed,
        failed: result.failed
    };
}
function renderStats(items) {
    const stats = summarize(items);
    elements.total.textContent = stats.count;
    elements.average.textContent = stats.average.toFixed(2);
    elements.passed.textContent = stats.passed;
    elements.failed.textContent = stats.failed;
}
function renderChart(items) {
    const order = ["Giỏi", "Khá", "Trung bình", "Yếu"];
    const counts = items.reduce((acc, student) => {
        const key = classify(student.score);
        acc[key] = (acc[key] ?? 0) + 1;
        return acc;
    }, {});
    const max = Math.max(1, ...Object.values(counts));
    elements.chart.innerHTML = order.map(label => {
        const count = counts[label] ?? 0;
        const width = count / max * 100;
        return `<div class="bar-row">
<span>${label}</span>
<div class="bar-track"><div class="bar-fill" style="width:${width}%"></div></div>
<strong>${count}</strong>
</div>`;
    }).join("");
}
function render() {
    const visible = getFilteredAndSorted();
    const { pageItems, totalPages } = paginate(visible);
    renderRows(pageItems);
    renderStats(visible);
    renderChart(visible);
    elements.pageInfo.textContent = `Trang ${state.page} / ${totalPages}`;
    elements.prev.disabled = state.page === 1;
    elements.next.disabled = state.page === totalPages;
}
function resetToFirstPageAndRender() {
    state.page = 1;
    render();
}
elements.search.addEventListener("input", event => {
    state.keyword = event.target.value;
    resetToFirstPageAndRender();
});
elements.status.addEventListener("change", event => {
    state.status = event.target.value;
    resetToFirstPageAndRender();
});
elements.sort.addEventListener("change", event => {
    state.sortBy = event.target.value;
    resetToFirstPageAndRender();
});
elements.prev.addEventListener("click", () => {
    state.page--;
    render();
});
elements.next.addEventListener("click", () => {
    state.page++;
    render();
});
render();