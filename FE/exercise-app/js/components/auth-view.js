export function authView() {
  return `
    <main class="auth-screen container-fluid d-grid min-vh-100 place-items-center py-4">
      <section class="auth-card card border-0 shadow-lg overflow-hidden" aria-labelledby="authTitle">
        <div class="row g-0">
          <div class="auth-intro col-lg-5 p-4 p-xl-5 d-flex flex-column justify-content-center">
            <span class="brand-mark mb-4">V</span>
            <p class="eyebrow">VUDN · JAVASCRIPT LEARNING</p>
            <h1 id="authTitle" class="display-6 fw-bold">Học từng bài, thấy rõ tiến độ</h1>
            <p class="text-secondary-emphasis">Đăng nhập để lưu code, bài đã hoàn thành và tiến độ khóa học.</p>
          </div>
          <div class="col-lg-7 p-4 p-xl-5">
            <div class="nav nav-pills auth-tabs mb-4" role="tablist">
              <button class="nav-link active" type="button" data-auth-tab="login">Đăng nhập</button>
              <button class="nav-link" type="button" data-auth-tab="register">Đăng ký</button>
            </div>
            <form data-auth-form="login" class="vstack gap-3">
              <label>Email<input class="form-control mt-2" type="email" name="email" autocomplete="email" required /></label>
              <label>Mật khẩu<input class="form-control mt-2" type="password" name="password" autocomplete="current-password" minlength="8" required /></label>
              <button class="btn btn-warning fw-bold" type="submit">Đăng nhập</button>
            </form>
            <form data-auth-form="register" class="vstack gap-3" hidden>
              <label>Tên của bạn<input class="form-control mt-2" type="text" name="name" autocomplete="name" minlength="2" required /></label>
              <label>Email<input class="form-control mt-2" type="email" name="email" autocomplete="email" required /></label>
              <label>Mật khẩu<input class="form-control mt-2" type="password" name="password" autocomplete="new-password" minlength="8" required /></label>
              <label>Nhập lại mật khẩu<input class="form-control mt-2" type="password" name="confirmPassword" autocomplete="new-password" minlength="8" required /></label>
              <button class="btn btn-warning fw-bold" type="submit">Tạo tài khoản</button>
            </form>
            <p data-auth-message class="small mt-3" aria-live="polite"></p>
            <p class="small text-secondary mb-0">Tài khoản, code và tiến độ được lưu trên máy chủ.</p>
          </div>
        </div>
      </section>
    </main>`;
}
