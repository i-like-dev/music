function login() {
  Swal.fire({
    title: '輸入密碼',
    input: 'password',
    inputPlaceholder: '0910',
    confirmButtonText: '登入',
    preConfirm: (password) => {
      if (password === '0910') {
        document.getElementById('adminPanel').style.display = 'block';
        load();
      } else {
        Swal.showValidationMessage('❌ 密碼錯誤');
      }
    }
  });
}

function load() {
  fetch("music.json")
    .then(res => res.json())
    .then(data => {
      document.getElementById("jsonData").value = JSON.stringify(data, null, 2);
    });
}

function save() {
  Swal.fire("🔒 儲存功能尚未實作", "請自行下載 music.json 更新", "info");
}
