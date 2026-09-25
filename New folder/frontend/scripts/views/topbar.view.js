export function topbar(user, lessonCount, completedCourseIds = []) {
  const coursePercent = Math.round(
    (completedCourseIds.length / lessonCount) * 100,
  );
  return `
    <header class="app-topbar navbar px-3 px-xl-4">
      <a class="brand app-brand text-decoration-none" href="./index.html" aria-label="VUDN - Trang chủ">
        <span class="app-brand-mark" aria-hidden="true"><span>V</span><i></i></span>
        <span class="brand-copy"><strong>VUDN</strong><small>JavaScript · học bằng thực hành</small></span>
      </a>
      <div class="d-flex align-items-center gap-3">
        <button class="btn btn-outline-light d-none d-lg-inline-flex" type="button" data-open-practice>Luyện tập nhanh</button>
        <button class="course-summary btn d-none d-md-flex align-items-center gap-3" type="button" data-open-catalog>
          <span class="percent-ring">${coursePercent}%</span><span class="text-start"><small>Tiến độ khóa học</small><strong>Xem 16 module</strong></span>
        </button>
        <div class="vr d-none d-md-block"></div>
        <div class="dropdown">
          <button class="account-button btn d-flex align-items-center gap-2" data-bs-toggle="dropdown" aria-expanded="false">
            <span class="avatar">${escape(user.name.slice(0, 1).toUpperCase())}</span><span class="text-start"><strong>${escape(user.email)}</strong><small><i class="status-dot"></i> Đang học</small></span><span class="account-chevron" aria-hidden="true"></span>
          </button>
          <ul class="dropdown-menu dropdown-menu-end"><li><span class="dropdown-item-text">${escape(user.name)}</span></li><li><button class="dropdown-item" type="button" data-sign-out>Đăng xuất</button></li></ul>
        </div>
      </div>
    </header>`;
}

function escape(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
