/**
 * Chứa các hàm xử lý tương tác UI
 */

// Global var
// mảng NV và các chức năng của DanhSachNhanVien sẽ dùng cho toàn ứng dụng
//=> dsnv thể hiện của DanhSachNhanVien là biến toàn cục

var dsnv = new DanhSachNhanVien();
var validation = new Validation();

//Hàm rút gọn cú pháp getElement ("Tên ID")
function getELE(id) {
    return document.getElementById(id);
}

//Local Storage
function setLocalStorage() {
    //localStorage: đối tượng có sẵn của JS, giúp thao tác về local storage của trình duyệt
    //Dữ liệu lưu trữ ở localsto là kiểu JSON
    //chuyển từ array => JSON
    //JSON: đối tượng có sẵn của JS giúp chuỗi JSON
    //Khi mảng sv thay đổi => gọi hàm etLocalStorage() để cập nhật cho local
    localStorage.setItem("DSNV", JSON.stringify(dsnv.mangNV));
}

function getLocalStorage() {
    //getItem => trả về dữ liệu JSON
    //Do vậy, phải chuyển từ JSON về mảng
    //localstorage chỉ lưu ở trình duyệt đang chạy ứng dụng
    //=> nếu không kiểm tra (nếu không có local storage) => mangSV sẽ bị gán giá trị underfine => mangSV bị đổi kiểu dữ liệu sang underfind => không dùng được các chức của array
    if (localStorage.getItem("DSNV") != undefined) {
        dsnv.mangNV = JSON.parse(localStorage.getItem("DSNV")); //Parse để chuyển từ kiểu json về kiểu mảng
    }
    hienThiDS(dsnv.mangNV);
}
getLocalStorage(); //Hiển thị local storage khi load web

//Thêm nhân viên
function themNhanVien() {
    var taiKhoanNV = getELE("tknv").value;
    var tenNV = getELE("name").value;
    var email = getELE("email").value;
    var password = getELE("password").value;
    var ngayLam = getELE("datepicker").value;
    var luongCB = getELE("luongCB").value;
    var chucVu = getELE("chucvu").value;
    var gioLam = getELE("gioLam").value;
    getELE("btnThemNV").hidden = false;

    console.log(taiKhoanNV, tenNV, email, password, ngayLam, luongCB, chucVu, gioLam);

    //? Các bước kiểm tra dữ liệu

    /**
     * Issue: Tên sinh viên có điền - mã sinh viên để trống => vẫn cho thêm sinh viên
     * Expected: chỉ được thêm sinh viên khi tất cả các dữ liệu đều hợp lệ
     * => nếu có 1 dữ liệu không hợp lệ => thông báo + không được thêm sinh viên
     * 
     * Root cause: do dấu = (gán) => chỉ giữ lại kết quả kiểm tra cuối cùng, các kết quả trước đó bị ghi đè
     * 
     * Solution:
     * C1: &&
     * 
     * C2: Tách các bước kiểm tra => dễ đọc code
     * & tính toán binary (010101) true 1, false 0;
     * => checkMa & checkTen = 0 + 1 => 0
     * isValid(cuối cùng) = isValidMa & checkEmpty
     * => isValid(cuối cùng) &= checkEmpty 
     */
    var isValid = true;
    // Kiểm tra tài khoản Nhân viên
    isValid &= validation.checkEmpty(taiKhoanNV, "tbTKNV","Tài khoản nhân viên không được để trống") && validation.checkTKNV(taiKhoanNV,"tbTKNV","Tài khoản nhân viên không được trùng",dsnv.mangNV);

        if(isValid){
    //Tất cả dữ liệu hợp lệ
        // Tạo thể hiện của Nhân viên
        var nv = new NhanVien(taiKhoanNV, tenNV, email, password, ngayLam, luongCB, chucVu, gioLam);
        nv.tongLuong();
        nv.xepLoai();
        console.log(nv);

        //Thêm nhân viên vào mảng Nhân viên
        dsnv.themNV(nv);
        console.log(dsnv.mangNV)

        //Gọi HÀM HIỂN THỊ
        hienThiDS(dsnv.mangNV);

        //Set local storage
        setLocalStorage();

        resetForm();
        }
}


/**
 * Input: mangNV
 * 
 * B1: Duyệt mảng để lấy ra từng đối tượng sinh viên
 * B2: tạo hàng tr cho từng sinh viên
 * B3: tạo từng td, đưa các thuộc tính của sinh viên đặt vào td
 * B4: đem tất cả các thẻ tr hiển thị lên UI
 * 
 * 
 * Output: các thẻ tr để hiển thị lên html
 * + 1 thẻ tr là 1 sinh viên
 * + từng td là từng thuộc tính của sinh viên
 */

// Hiển thị danh sách sinh viên
function hienThiDS(mangNV) {
    console.log("Mảng cần hiển thị: ", mangNV);
    //map() => hàm giúp duyệt mảng => lấy ra từng phần tử của mảng
    //ham1(ham2()) => callback function
    //function(){} => hàm ẩn danh (không tên)
    //map(phần tử của mảng, vị trí của phần tử)
    //Sau khi duyệt mảng => content = <tr></tr> <tr></tr> <tr></tr>
    //${}: truyền biến vào cho chuỗi string
    var content = ""; //Giá trị ban đầu
    mangNV.map(function (nv, index) {
        console.log(nv);
        // String template (template literal), ``
        //var trELE
        content += `
        <tr>
        <td>${nv.taiKhoanNV}</td>
        <td>${nv.tenNV}</td>
        <td>${nv.email}</td>
        <td>${nv.ngayLam}</td>
        <td>${nv.chucVu}</td>
        <td>${nv.tongLuong}</td>
        <td>${nv.xepLoai}</td>
        <td>
        <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="xemChiTiet('${nv.taiKhoanNV}')">Xem</button>
        <button class="btn btn-danger" onclick="xoaNhanVien('${nv.taiKhoanNV}')">Xóa</button>
        </td>
        </tr>
        `;
        // console.log(trELE);
        //content(sv1+sv2) = content(sv1) + <tr>sv2</tr>
        // content += trELE; //viết vầy nếu có đặt Var trELE
    });
    console.log(content);
    getELE("tableDanhSach").innerHTML = content;
}

/**
 * Xóa sv => xóa phần tử khỏi mảng
 * => tìm được vị trí của phần tử cần xóa
 * => dựa vào maSV để tìm kiếm sinh viên
 * 
 */

function xoaNhanVien(ma) {
    console.log(ma);
    dsnv.xoaNV(ma);
    hienThiDS(dsnv.mangNV);
    setLocalStorage(dsnv.mangNV);

}



/**
 * Cập nhật
 *? + Xem thông tin:
 * => click button xem
 * => lấy thông tin của sv cần xem
 * => hiển thị thông tin chi tiết của sinh viên lên form
 *? + Cập nhật:
 * => edit thông tin cần sửa
 * => click button cập nhật
 * => lấy các giá trị từ form => lưu vào đối tượng sinh viên với
 * => tìm vị trí sinh viên cần cập nhật trong mảng => gán giá trị sinh viên mới vào vị trí tìm thấy
 * 
 */

 function xemChiTiet(ma) {
    console.log("xem ", ma);
    var viTri = dsnv.timVitri(ma);
    if (viTri > -1) {
        //Tìm thấy
        var nvTim = dsnv.mangNV[viTri];
        console.log(nvTim);
        // document.querySelectorAll(".sp-thongbao").hidden = true;
        getELE("tknv").value = nvTim.taiKhoanNV;
        getELE("tknv").disabled = true;
        getELE("name").value = nvTim.tenNV;
        getELE("email").value = nvTim.email;
        getELE("password").value = nvTim.password;
        getELE("datepicker").value = nvTim.ngayLam;
        getELE("luongCB").value = nvTim.luongCB;
        getELE("chucvu").value = nvTim.chucVu;
        getELE("gioLam").value = nvTim.gioLam;
        getELE("btnThemNV").hidden = true;
        getELE("btnCapNhat").hidden = false;
        anThongBao();
    }
}

function capNhatNhanVien() {
    var taiKhoanNV = getELE("tknv").value;
    var tenNV = getELE("name").value;
    var email = getELE("email").value;
    var password = getELE("password").value;
    var ngayLam = getELE("datepicker").value;
    var luongCB = getELE("luongCB").value;
    var chucVu = getELE("chucvu").value;
    var gioLam = getELE("gioLam").value;
    console.log(taiKhoanNV, tenNV, email, password, ngayLam, luongCB, chucVu, gioLam);

    // Tạo thể hiện của Sinh viên
    var nv = new NhanVien(taiKhoanNV, tenNV, email, password, ngayLam, luongCB, chucVu, gioLam);
    nv.tongLuong();
    nv.xepLoai();
    console.log(nv);
    dsnv.capNhatNV(nv);
    hienThiDS(dsnv.mangNV);
    setLocalStorage();

    resetForm(); //Clear form sau khi cập nhật thành công thông tin sinh viên
    getELE("btnCapNhat").hidden = true;
    hienThemNV();
}


/**
 * Reset form
 */

function resetForm() {
    //Chỉ dùng với thẻ form: giúp clear các giá trị ở trên form, giúp user nhập nội dung mới
    getELE("formQLNV").reset();
    //Bỏ disabled ô Tài khoản NV
    getELE("tknv").disabled = false;
}


/**
 * Ẩn các thông báo sp-thongbao của Validation khi click button "xem"
 */

// function anThongBao(){
//     var arrThongBao = document.querySelectorAll(".sp-thongbao");
    
//     arrThongBao.forEach((sp-thongbao){
//         sp-thongbao.style.display = "none"
//     });
// }


function anThongBao(){
    const tbao = document.getElementsByClassName("sp-thongbao");
    for (let i = 0; i < tbao.length; i++) {
        tbao[i].style.display = "none";
    }
}

function anThemNV(){
    getELE("btnThemNV").hidden = true;
}
function hienThemNV(){
    getELE("btnThemNV").hidden = false;
}

//Tìm kiếm theo tên
// function timKiemTheoTen(){
//     var tuKhoa = getELE("searchName").value;
//     var mangTK = dsnv.timKiem(tuKhoa.trim());
//     hienThiDS(mangTK);
// }
// //Tìm kiếm khi click button search
// getELE("btnTimNV").onclick = timKiemTheoTen;

// //onkeypress (khi người dùng đè phím), onkeydown (khi người dùng mới nhấn phím), onkeyup (khi người dùng nhấc ngón tay khỏi phím)
// //=> chỉ nên dùng khi dữ liệu tìm kiếm ít
// getELE("searchName").onkeyup = timKiemTheoTen;




//Tìm kiếm theo loại nhân viên
function timKiemTheoXepLoai(){
    var tuKhoa = getELE("searchName").value;
    var mangTK = dsnv.timKiem(tuKhoa.trim());
    hienThiDS(mangTK);
}
//Tìm kiếm khi click button search
getELE("btnTimNV").onclick = timKiemTheoXepLoai;

//onkeypress (khi người dùng đè phím), onkeydown (khi người dùng mới nhấn phím), onkeyup (khi người dùng nhấc ngón tay khỏi phím)
//=> chỉ nên dùng khi dữ liệu tìm kiếm ít
getELE("searchName").onkeyup = timKiemTheoXepLoai;


