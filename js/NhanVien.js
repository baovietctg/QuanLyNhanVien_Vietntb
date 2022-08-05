/**
 * Khai báo lớp đối tượng NhanVien
 * 
 */

 function NhanVien(taiKhoanNV,tenNV,email,password,ngayLam,luongCB,chucVu,gioLam){
    this.taiKhoanNV = taiKhoanNV;
    this.tenNV = tenNV;
    this.email = email;
    this.password = password;
    this.ngayLam = ngayLam;
    this.luongCB = luongCB;
    this.chucVu = chucVu;
    this.gioLam = gioLam;
    this.tongLuong = 0;
    this.xepLoai = "";
    // phương thức
    this.tongLuong = function(){
        var chucVuOption = document.getElementById("chucvu").selectedIndex;
        if (chucVuOption == 1){
            this.tongLuong = this.luongCB * 3;
        }else if (chucVuOption == 2){
            this.tongLuong = this.luongCB * 2;
        }else if(chucVuOption == 3){
            this.tongLuong = this.luongCB * 1;
        }
    }
    this.xepLoai = function(){
        if(this.gioLam >= 192){
            this.xepLoai = "Xuất sắc";
        }else if(176 <= this.gioLam && this.gioLam < 192){
            this.xepLoai = "Giỏi";
        }else if(160 <= this.gioLam && this.gioLam < 176){
            this.xepLoai = "Khá";
        }else if(this.gioLam < 160){
            this.xepLoai = "Trung bình";
        }
    }
}